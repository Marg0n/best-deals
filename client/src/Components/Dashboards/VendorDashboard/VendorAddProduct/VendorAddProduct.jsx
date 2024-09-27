import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Select from 'react-select';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, Typography} from '@mui/material';


const VendorAddProduct = () => {
    const { register, handleSubmit, reset, control } = useForm();
    const [selectedSize, setSelectedSize] = useState(null); // For tracking selected size

    const categories = [
        { value: 'Men', label: 'Men' },
        { value: 'healthcare', label: 'healthcare' },
        { value: 'technology', label: 'technology' },
        { value: 'Woman', label: 'Woman' },

    ];

    const onSubmit = (data) => {
        console.log(data);
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size); // Update the selected size
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });


    return (
        <div className="p-8">
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* General Information Section */}
                    <div className="col-span-2">
                        <div className="bg-white shadow-md p-6 rounded-md">
                            <Typography variant="h6" className="mb-4 font-semibold">General Information</Typography>

                            {/* Name Product */}
                            <div className="my-8">
                                <TextField
                                    fullWidth
                                    label="Name Product"
                                    {...register('productName')}

                                />
                            </div>

                            {/* Description Product */}
                            <div className="mb-4">
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Description Product"
                                    {...register('productDescription')}
                                    className="mb-4"
                                />
                            </div>

                            {/* Size and Gender Section */}
                            {/* Size */}
                            <div className="w-1/2 mb-4">
                                <div className="mb-2"><Typography variant="body1" >Size</Typography></div>
                                <div className="flex gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                        <Button
                                            key={size}
                                            variant={selectedSize === size ? 'contained' : 'outlined'}
                                            className={`w-10 ${selectedSize === size ? 'bg-green-500 text-white' : ''}`}
                                            onClick={() => handleSizeClick(size)}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="w-1/2">
                                <Typography variant="body1" className="mb-2">Gender</Typography>
                                <RadioGroup row {...register('gender')}>
                                    <FormControlLabel value="Men" control={<Radio />} label="Men" />
                                    <FormControlLabel value="Women" control={<Radio />} label="Women" />
                                    <FormControlLabel value="Unisex" control={<Radio />} label="Unisex" />
                                </RadioGroup>
                            </div>

                        </div>

                        {/* Pricing and Stock */}
                        <div className="bg-white shadow-md p-6 rounded-md mt-6">
                            <div className='mb-3'><Typography variant="h6" className="mb-4 font-semibold">Pricing And Stock</Typography></div>
                            <div className="grid grid-cols-2 gap-4">
                                <TextField fullWidth label="Base Pricing" {...register('price')} />
                                <TextField fullWidth label="Stock" {...register('stock')} />
                                <TextField fullWidth label="Discount" {...register('discount')} />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}

                    {/* Category Section */}
                    <div className="space-y-6">
                        {/* Upload Image Section */}
                        <div className="bg-white shadow-md p-6 rounded-md">
                            <div className='mb-2'>
                                <Typography variant="h6" className="mb-4 font-semibold">Upload Image</Typography>
                            </div>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={(event) => console.log(event.target.files)}
                                    multiple
                                    {...register('photo')}
                                />
                            </Button>
                        </div>

                        {/* Category Section with Datalist */}
                        <div className='bg-white shadow-md p-6 rounded-md'>
                            <div className='mb-2'>
                                <Typography variant="h6" className="mb-4 font-semibold">Categories</Typography>
                            </div>
                            <div className='p-2 mb-2'>
                                <Controller
                                    control={control}
                                    defaultValue={categories.map(c => c.value[0])}
                                    name="category"
                                    render={({ field: { onChange, value, ref } }) => (
                                        <Select
                                            inputRef={ref}
                                            value={categories.filter(c => value.includes(c.value))}
                                            onChange={val => onChange(val.map(c => c.value))}
                                            options={categories}
                                            isMulti
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <Button type='submit' variant="contained" startIcon={<AddCircleOutlineIcon />} className="capitalize" color="primary">
                        Add Product
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default VendorAddProduct;