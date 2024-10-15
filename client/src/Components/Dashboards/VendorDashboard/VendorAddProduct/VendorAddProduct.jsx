import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from 'react-select';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';
import { imageUpload } from '../../../../utils/imageUpload';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';
import Swal from 'sweetalert2';
import { RxCross2 } from "react-icons/rx";



const VendorAddProduct = () => {
    const { register, handleSubmit, reset, control } = useForm();
    const [imageText, setImageText] = useState('');
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    // state for prodcuts gallary images
    const [selectedImages, setSelectedImages] = useState([]);


    // Initial category options
    const [categoryOptions, setCategoryOptions] = useState([
        { value: 'Men', label: 'Men' },
        { value: 'Healthcare', label: 'Healthcare' },
        { value: 'Technology', label: 'Technology' },
        { value: 'Woman', label: 'Woman' },
        { value: 'add_more', label: 'Add more' },
    ]);

    const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
    const [customCategory, setCustomCategory] = useState('');

    // Initial size options
    const [sizeOptions, setSizeOptions] = useState([
        { value: 'Small', label: 'Small' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Large', label: 'Large' },
        { value: 'add_more', label: 'Add more' },
    ]);

    const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);
    const [customSize, setCustomSize] = useState('');

    // Initial color options
    const [colorOptions, setColorOptions] = useState([
        { value: 'red', label: 'Red' },
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'blue', label: 'Blue' },
        { value: 'add_more_color', label: 'Add more Color' },
    ]);

    const [showCustomColorInput, setShowCustomColorInput] = useState(false);
    const [customColor, setCustomColor] = useState('');

    const handleAddCustomSize = () => {
        if (customSize) {
            const newSize = { value: customSize, label: customSize };
            setSizeOptions(prevOptions => [...prevOptions.filter(opt => opt.value !== 'add_more'), newSize, { value: 'add_more', label: 'Add more' }]);
            setShowCustomSizeInput(false); // Hide the input field after adding
            setCustomSize(''); // Clear the input field
        }
    };

    const handleAddCustomColor = () => {
        if (customColor) {
            const newColor = { value: customColor, label: customColor };
            setColorOptions(prevOptions => [...prevOptions.filter(opt => opt.value !== 'add_more'), newColor, { value: 'add_more_color', label: 'Add more Color' }]);
            setShowCustomColorInput(false); // Hide the input field after adding
            setCustomColor(''); // Clear the input field
        }
    };


    const handleAddCustomCategory = () => {
        if (customCategory) {
            const newCategory = { value: customCategory, label: customCategory };
            // Update the category list, ensuring "Add more" is the last option
            setCategoryOptions(prevOptions => [...prevOptions.filter(opt => opt.value !== 'add_more'), newCategory, { value: 'add_more', label: 'Add more' }]);
            setShowCustomCategoryInput(false); // Hide the input after adding
            setCustomCategory(''); // Clear the input field
        }
    };

    const handleImage = (e) => {
        e.preventDefault()
        const files = Array.from(e.target.files);
        setSelectedImages(prevImages => [...prevImages, ...files]);
    };

    // Handle removing an image
    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages(prevImages =>
            prevImages.filter((_, index) => index !== indexToRemove)
        );
    };




    const onSubmit = async (data, e) => {
        try {
            // Upload main product image
            const productImage = data.photo[0]; 
            const imageUrl = await imageUpload(productImage);
    
            // Upload gallery images one by one and store their URLs
            const productsGallarysUrl = await Promise.all(selectedImages.map(async (image) => {
                const galleryImageUrl = await imageUpload(image);
                return galleryImageUrl;
            }));
    
            // Add product details
            const addProduct = {
                vendorEmail: user?.email,
                companyName: data.companyName || '',
                productName: data.productName,
                productShortDescription: data.productShortDescription,
                description: data.productDescription,
                category: data.category,
                price: parseFloat(data.price),
                stockQuantity: parseInt(data.stock),
                rating: 0.0,
                discount: parseFloat(data.discount),
                isFeatured: false,
                productImage: imageUrl || '',
                veriation: {
                    color: data.color,
                    size: data.size,
                },
                galleryImages: productsGallarysUrl  || []
            };
    
            console.log(addProduct);
    
            // Send data to Database
            const res = await axiosCommon.post('/all-products', addProduct);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Your Product Has Been Added`,
                    showConfirmButton: true,
                });
                reset();
            }
    
        } catch (error) {
            console.error('Error uploading images:', error);
        }


    };

    // console.log(colorOptions);
    // console.log(sizeOptions);
    // console.log(categoryOptions);
    // console.log(selectedImages);
    



    return (
        <div className="p-8 text-black">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* General Information Section */}
                    <div className="col-span-2">
                        <div className="bg-white shadow-md p-6 rounded-md">
                            <Typography variant="h6" className="mb-4 font-semibold">General Information</Typography>

                            {/* Name Product */}
                            <div className="my-4">
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    required
                                    {...register('productName')}

                                />
                            </div>

                            {/* Product Short Description  */}
                            <div className="mb-4">
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Short Description"
                                    placeholder="Enter a brief summary of the product..."
                                    inputProps={{ maxLength: 250 }}
                                    {...register('productShortDescription')}
                                    className="mb-4"
                                    helperText="Maximum 250 characters."
                                />
                            </div>

                            {/* Description Product */}
                            <div className="mb-4">
                                <TextField
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Description Product"
                                    {...register('productDescription')}
                                    className="mb-4"
                                />
                            </div>

                            {/* Size options */}
                            <div className='bg-white shadow-md p-6 rounded-md'>
                                <div className='mb-2'>
                                    <Typography variant="h6" className="mb-4 font-semibold">Select Size</Typography>
                                </div>
                                <div className='p-2 mb-2'>
                                    <Controller
                                        control={control}
                                        defaultValue={[]}
                                        {...register('size')}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Select
                                                inputRef={ref}
                                                value={sizeOptions.filter(c => value && value.includes(c.value))}
                                                onChange={val => {
                                                    const selectedValues = val.map(c => c.value);
                                                    onChange(selectedValues);

                                                    // Check if "Add more" is selected
                                                    if (selectedValues.includes('add_more')) {
                                                        setShowCustomSizeInput(true);
                                                    }
                                                }}
                                                options={sizeOptions}
                                                isMulti
                                            />
                                        )}
                                    />
                                </div>

                                {/* Display input for custom size when "Add more" is selected */}
                                {showCustomSizeInput && (
                                    <div className='mt-4  '>
                                        <input
                                            type='text'
                                            value={customSize}
                                            onChange={(e) => setCustomSize(e.target.value)}
                                            placeholder="Enter custom size"
                                            className="p-2 border rounded-md w-full bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddCustomSize}
                                            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Add Size
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Color options */}
                            <div className='bg-white shadow-md p-6 rounded-md'>
                                <div className='mb-2'>
                                    <Typography variant="h6" className="mb-4 font-semibold">Select Color</Typography>
                                </div>
                                <div className='p-2 mb-2'>
                                    <Controller
                                        control={control}
                                        defaultValue={[]}
                                        {...register('color')}
                                        render={({ field: { onChange, value, ref } }) => (
                                            <Select
                                                inputRef={ref}
                                                value={colorOptions.filter(c => value && value.includes(c.value))}
                                                onChange={val => {
                                                    const selectedValues = val.map(c => c.value);
                                                    onChange(selectedValues);

                                                    // Check if "Add more" is selected
                                                    if (selectedValues.includes('add_more_color')) {
                                                        setShowCustomColorInput(true);
                                                    }
                                                }}
                                                options={colorOptions}
                                                isMulti
                                            />
                                        )}
                                    />
                                </div>

                                {/* Display input for custom color when "Add more" is selected */}
                                {showCustomColorInput && (
                                    <div className='mt-4'>
                                        <input
                                            type='text'
                                            value={customColor}
                                            onChange={(e) => setCustomColor(e.target.value)}
                                            placeholder="Enter custom Color"
                                            className="p-2 border rounded-md w-full bg-white"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddCustomColor}
                                            className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Add Color
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Gender */}
                            {/* <div className="w-1/2">
                                <Typography variant="body1" className="mb-2">Gender</Typography>
                                <RadioGroup row {...register('gender')}>
                                    <FormControlLabel value="Men" control={<Radio />} label="Men" />
                                    <FormControlLabel value="Women" control={<Radio />} label="Women" />
                                    <FormControlLabel value="Unisex" control={<Radio />} label="Unisex" />
                                </RadioGroup>
                            </div> */}

                        </div>

                        {/* Pricing and Stock */}
                        <div className="bg-white shadow-md p-6 rounded-md mt-6">
                            <div className='mb-3'>
                                <Typography variant="h6" className="mb-4 font-semibold">Pricing And Stock</Typography></div>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField type='number' required fullWidth label="Base Pricing" {...register('price')} inputProps={{ min: 0 }}  />
                                <TextField type='number' required fullWidth label="Stock" {...register('stock')} inputProps={{ min: 0 }}  />
                                <TextField type='number' fullWidth label="Discount on parcentage" {...register('discount')} inputProps={{ min: 0 }}  />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}


                    <div className="space-y-6">
                        {/* Upload Image Section */}
                        <div className="bg-white shadow-md p-6 rounded-md">
                            <div className='mb-2'>
                                <Typography variant="h6" className="mb-4 font-semibold">Product Image</Typography>
                            </div>
                            <input
                                type="file"
                                name='photo'
                                id='photo'
                                accept='image/*'
                                required
                                multiple
                               
                                className="bg-white file-input file-input-bordered w-full max-w-xs"
                                {...register('photo')}
                            />
                            <div>
                                {imageText}
                            </div>
                        </div>


                        {/* Upload products more photo to products Gallary */}
                        <div className="bg-white shadow-md p-6 rounded-md">
                            <div className='mb-2'>
                                <Typography variant="h6" className="mb-4 font-semibold">Product Gallery</Typography>
                            </div>
                            <input
                                type="file"
                                name='photo'
                                id='photo'
                                accept='image/*'
                                multiple // Allows multiple image selection
                                // required
                                onChange={(e) => handleImage(e)}
                                className="file-input file-input-bordered w-full max-w-xs bg-white"
                            />

                            {/* Display selected images with remove button */}
                            <div className='mt-4'>
                                {selectedImages.length > 0 && (
                                    <div>
                                        <Typography variant="body1">Images for Prodcut Gallery:</Typography>
                                        <ul>
                                            {selectedImages.map((image, index) => (
                                                <li key={index} className="flex items-center justify-between mt-2">
                                                    <span>{image.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveImage(index)}
                                                        className="ml-2 p-1 text-red-500 hover:text-red-700"
                                                    >
                                                        <RxCross2 />; {/* Cross icon */}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category Section with Datalist */}
                        <div className='bg-white shadow-md p-6 rounded-md'>
                            <div className='mb-2'>
                                <Typography variant="h6" className="mb-4 font-semibold">Categories</Typography>
                            </div>
                            <div className='p-2 mb-2'>
                                <Controller
                                    control={control}
                                    defaultValue={[]}
                                    {...register('category')}
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Select
                                            inputRef={ref}
                                            value={categoryOptions.filter(c => value && value.includes(c.value))}
                                            onChange={val => {
                                                const selectedValues = val.map(c => c.value);
                                                onChange(selectedValues);

                                                // Check if "Add more" is selected
                                                if (selectedValues.includes('add_more')) {
                                                    setShowCustomCategoryInput(true);
                                                }
                                            }}
                                            options={categoryOptions}
                                            isMulti
                                        />
                                    )}
                                />
                            </div>

                            {/* Display input for custom category when "Add more" is selected */}
                            {showCustomCategoryInput && (
                                <div className='mt-4'>
                                    <input
                                        type='text'
                                        value={customCategory}
                                        onChange={(e) => setCustomCategory(e.target.value)}
                                        placeholder="Enter custom category"
                                        className="p-2 border rounded-md w-full bg-white"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddCustomCategory}
                                        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                                    >
                                        Add Category
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <Button type='submit' variant="contained" startIcon={<AddCircleOutlineIcon />} className="capitalize" color="primary">
                        Upload Product
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VendorAddProduct;