import { Rating } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, ScrollRestoration, useLoaderData, useParams } from 'react-router-dom';
import ProductsCounter from '../../Components/ProductCounter/ProductsCounter';
import { addToCart } from '../../features/CartSlice/CartSlice';
import MoreSuggetionCard from '../../Components/MoreSuggetionCard/MoreSuggetionCard';
import useAuth from '../../hooks/useAuth';
import DetailsPageTabs from '../../Components/DetailsPageTabs/DetailsPageTabs';


const Details = () => {
    const products = useLoaderData();
    const { _id } = useParams();
    const product = products?.find(product => product._id === _id);

    const colors = product?.veriation?.color
    const sizes = product?.veriation?.size




    // finding same category products but not the same product
    const productsInSameCategory = products?.filter(item => item.category === product.category && item._id !== product._id);


    const { user } = useAuth()

    const commnetDetails = { userName: user?.displayName, photo: user?.photoURL, productId: product?._id }

    const vendorInfo = { vendorEmail: product.vendorEmail, companyName: product.companyName }

    // set quality from details
    const [quantity, setQuality] = useState(1)
    // console.log(quantity);


    // const [open, setOpen] = useState(false);


    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // dispatch products to redux
    const dispatch = useDispatch()

    // add product to redux store
    const handleAddToCart = (product) => {
        const addingToCart = { ...product, cartQuantity: quantity }
        dispatch(addToCart(addingToCart));
    };



    return (

        <div>
            <div className='flex-1 lg:flex items-start '>
                <Helmet>
                    <title>Best Deal | {product?.productName}</title>
                </Helmet>
                <ScrollRestoration></ScrollRestoration>
                <div className='lg:w-8/12 flex-1 lg:flex '>
                    <div className='lg:w-1/2 p-3'>
                        {/* path indication */}
                        <p className='text-[#775050] dark:text-white  text-lg font-normal'>
                            <Link to='/'>Home</Link> {'>'} <Link>{product.category}</Link> {'>'} <Link>{product.productName}</Link>
                        </p>

                        {/* products image display */}

                        {
                            // if prodcuts have gallary image it will create Carousel or render only products main image
                            product?.galleryImages?.length > 0 ?
                                <div className=''>
                                    <Carousel showArrows={true} showThumbs={true}>
                                        {/* Main product image */}
                                        <div>
                                            <img src={product?.productImage} alt="Product Image" />
                                        </div>

                                        {/* Gallery images */}
                                        {
                                            product?.galleryImages.map((img, index) => (
                                                <div key={index}>
                                                    <img src={img} alt={`Gallery Image ${index + 1}`} />
                                                </div>
                                            ))

                                        }
                                    </Carousel>
                                </div> :
                                <div>
                                    <img src={product?.productImage} alt="Product Image" />
                                </div>
                        }

                        {/* products counter to add to cart quantity for tab and mobile*/}

                        <div className='lg:hidden'>
                            <div className='flex justify-center gap-6'>

                                <ProductsCounter
                                    key={product._id}
                                    product={product}
                                    setQuality={setQuality}
                                    quality={quantity}
                                ></ProductsCounter>

                                <button onClick={() => handleAddToCart(product)} className='bg-[#d9cfaf] rounded-[86px] text-black text-sm font-bold px-4 py-2'>Add To Cart </button>
                                {/* <button className='bg-black rounded-[86px] text-white text-sm font-bold px-4 py-2'>Add To Wish List </button> */}
                            </div>
                            <div className='text-center mt-4'>

                                <Link
                                    to={`/cartlist`}
                                    // to={`/single-checkout/${_id}`} 
                                    // onClick={() => handleBuyNow(product)}
                                    onClick={() => handleAddToCart(product)}
                                    className='bg-[#ff6b1c] rounded-[86px] text-white text-sm font-bold px-8 py-2'>
                                    Buy Now
                                </Link>
                            </div>
                        </div>



                    </div>

                    {/*description and products counter to add to cart quantity for large device */}
                    <div className='lg:mt-16'>
                        <div className='p-3'>
                            <h3 className='text-[#775050] font-bold dark:text-white  text-2xl '>{product.productName}</h3>
                            <h3 className={`text-[#ff6b1c] dark:text-white ${product?.discount ? 'line-through text-red-500 dark:text-red-500' : ''}  text-xl font-bold py-4`}>Price : ${product?.price}</h3>
                            {
                                product?.discount &&
                                <h3 className='text-[#ff6b1c] dark:text-white  text-xl font-bold py-4'>On sale : ${(product?.price) - (product?.price * product?.discount / 100)}</h3>
                            }
                            <hr className='border-2 border-[#1d2236] w-full' />
                            <p className='text-[#775050] dark:text-white  text-lg font-normal pt-2'>Brand: {product.brandName}</p>
                            <p className='text-[#775050] dark:text-white  text-lg font-normal'>Details:<br /> {product?.productShortDescription ? product.productShortDescription : product?.description}</p>
                        </div>

                        {/* size and color choose option */}
                        {/* color choose options */}
                        <div>
                            {
                                colors?.length > 0 ? (
                                    colors.map((color, index) => {
                                        return (
                                            <button
                                                className='btn btn-outline mr-2 '
                                                key={index}
                                            >
                                                {color}
                                            </button>
                                        );
                                    })
                                ) : ''
                            }
                        </div>

                        {/* size choose options */}
                        <div>
                            {
                                sizes?.length > 0 ? (
                                    sizes.map((size, index) => (
                                        <button
                                            className='btn btn-outline mr-2'
                                            key={index}
                                        >
                                            {size}
                                        </button>
                                    ))
                                ) : ''
                            }
                        </div>




                        <div className=' w-fit lg:mt-10 px-2'>
                            <div className='flex gap-6 '>

                                <ProductsCounter
                                    key={product._id}
                                    product={product}
                                    setQuality={setQuality}
                                    quality={quantity}
                                ></ProductsCounter>

                                <button onClick={() => handleAddToCart(product)} className='bg-[#d9cfaf] rounded-[86px] text-black text-sm font-bold px-4 py-2'>Add To Cart </button>
                                {/* <button className='bg-black rounded-[86px] text-white text-sm font-bold px-4 py-2'>Add To Wish List </button> */}
                            </div>
                            <div className='lg:text-center mt-4'>

                                <Link
                                    to={`/cartlist`}
                                    // to={`/single-checkout/${_id}`} 
                                    // onClick={() => handleBuyNow(product)}
                                    onClick={() => handleAddToCart(product)}
                                    className='bg-[#ff6b1c] rounded-[86px] text-white text-sm font-bold px-8 py-2'>
                                    Buy Now
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>

                {/* suggestion  */}
                <div>
                    {
                        productsInSameCategory.length > 0 ?
                            <div className=' h-full mt-10  rounded-xl bg-[#d9d9d9] p-2 dark:bg-[#34394C]'>
                                <h3 className='dark:text-white text-2xl text-[#775050] font-bold mb-5'>More suggestions :</h3>

                                {
                                    productsInSameCategory.map(item =>
                                        <MoreSuggetionCard
                                            key={item._id}
                                            product={item}
                                        ></MoreSuggetionCard>)
                                }


                            </div>
                            : ''

                    }
                </div>
            </div>


            {/* vendor Info */}
            <div>
                <DetailsPageTabs
                    vendorInfo={vendorInfo}
                    description={product?.description}
                    commnetDetails={commnetDetails}
                ></DetailsPageTabs>
            </div>
        </div>


    );
};

export default Details;