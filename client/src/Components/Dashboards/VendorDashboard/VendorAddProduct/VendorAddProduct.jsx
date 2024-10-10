import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Select from 'react-select';
import { Button, TextField, Radio, RadioGroup, FormControlLabel, Typography } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';
import { imageUpload } from '../../../../utils/imageUpload';
import useAxiosCommon from '../../../../hooks/useAxiosCommon';
import Swal from 'sweetalert2';


const VendorAddProduct = () => {
    const { register, handleSubmit, reset, control } = useForm();
    const [imageText, setImageText] = useState('');
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();
   
    const categories = [
        { value: 'Men', label: 'Men' },
        { value: 'healthcare', label: 'healthcare' },
        { value: 'technology', label: 'technology' },
        { value: 'Woman', label: 'Woman' },

    ];

    const onSubmit = async (data, e) => {

        const productImage = e.target.photo.files[0];
        const imageUrl = await imageUpload(productImage);

        const addProduct = {
            email: user?.email,
            companyName: data.companyName || '',
            productName: data.productName,
            description: data.productDescription,
            category: data.category,
            price: parseFloat(data.price),
            stockQuantity: parseInt(data.stock),
            rating: 0.0,
            discount: parseFloat(data.discount),
            isFeatured: false,
            productImage: imageUrl || '',
            attributes: [
                {
                    color: '',
                    size: data.size,
                    gender: data.gender || '',
                }
            ]
        }
    
        const res = await axiosCommon.post('/all-products', addProduct);

        if(res.data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Your Product Has Been Added`,
                showConfirmButton: true,
                
            });
            reset();
        }
        // console.log(addProduct);

        
    };



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
                            <div className="my-4">
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    required
                                    {...register('productName')}
 
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

                            {/* Size and Gender Section */}
                            {/* Size */}
                            <div className="w-1/2 mb-4">
                                <div className="flex gap-2">
                                    <TextField fullWidth label="Product Size" {...register('size')} />
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
                                <TextField type='number' required fullWidth label="Base Pricing" {...register('price')} />
                                <TextField type='number' required fullWidth label="Stock" {...register('stock')} />
                                <TextField type='number' fullWidth label="Discount" {...register('discount')} />
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}

                
                    <div className="space-y-6">
                        {/* Upload Image Section */}
                        <div className="bg-white shadow-md p-6 rounded-md">
                            <div className='mb-2'>
                                <Typography variant="h6" className="mb-4 font-semibold">Upload Image</Typography>
                            </div>
                            <input
                             type="file" 
                             name='photo'
                             id='photo'
                             accept='image/*'
                             required
                             multiple
                             onChange={(e)=>{
                                handleImage(e);
                             }}
                             className="file-input file-input-bordered w-full max-w-xs" 
                             {...register('photo')}
                             />
                             <div>
                                {imageText}
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
                                    defaultValue={categories.map(c => c.value[0])}
                                    {...register('category')}
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