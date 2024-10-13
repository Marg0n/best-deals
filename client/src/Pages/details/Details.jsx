import { Rating } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, ScrollRestoration, useLoaderData, useParams } from 'react-router-dom';
import ProductsCounter from '../../Components/ProductCounter/ProductsCounter';
import { addToCart } from '../../features/CartSlice/CartSlice';
import CommentModal from '../../Components/CommentModal/CommentModal';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import MoreSuggetionCard from '../../Components/MoreSuggetionCard/MoreSuggetionCard';
import useAuth from '../../hooks/useAuth';


const Details = () => {
    const products = useLoaderData();
    const { _id } = useParams();
    const product = products?.find(product => product._id === _id);


    // finding same category products but not the same product
    const productsInSameCategory = products?.filter(item => item.category === product.category && item._id !== product._id);


    const { user } = useAuth()


    // set quality from details
    const [quantity, setQuality] = useState(1)
    // console.log(quantity);


    const [open, setOpen] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

                        {/* View comments */}
                        <div className='flex items-center gap-3 justify-end'>
                            <Link onClick={handleOpen} className='text-[#775050] dark:text-white  text-lg font-normal underline' to="">
                                view comments
                            </Link>
                            <span className="block text-xs font-medium tracking-widest uppercase dark:text-white text-[#775050]">
                                Ratings :{product.rating}<Rating name="read-only" size="small" value={product.rating} precision={0.1} readOnly />

                            </span>
                            {/* Use the modal component */}
                            <CommentModal open={open} handleClose={handleClose} userName={user?.displayName} photo={user?.photoURL} productId={_id} />
                        </div>

                        {/* products image display */}
                        <div className=''>
                            <Carousel showArrows={true} showThumbs={true}>
                                <div>
                                    <img src={product.productImage} />

                                </div>
                                <div>
                                    <img src={product.productImage} />

                                </div>
                                <div>
                                    <img src={product.productImage} />

                                </div>
                                <div>
                                    <img src={product.productImage} />

                                </div>
                            </Carousel>
                        </div>

                        {/* products counter to add to cart quantity */}

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
                    <div className='p-3 lg:w-1/2'>
                        <h3 className='text-[#775050] dark:text-white  text-2xl font-normal'>{product.productName}</h3>
                        <h3 className='text-[#ff6b1c] dark:text-white  text-3xl font-bold py-4'>${product.price}</h3>
                        <hr className='border-2 border-[#1d2236] w-full' />
                        <p className='text-[#775050] dark:text-white  text-lg font-normal pt-2'>Brand: {product.brandName}</p>
                        <p className='text-[#775050] dark:text-white  text-lg font-normal'>Description: {product.description}</p>
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
                <h1>Vendor details</h1>
            </div>
        </div>


    );
};

export default Details;