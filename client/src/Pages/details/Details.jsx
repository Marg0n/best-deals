import { Rating } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link, ScrollRestoration, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import ProductsCounter from '../../Components/ProductCounter/ProductsCounter';
import { addToCart } from '../../features/CartSlice/CartSlice';
import useAuth from '../../hooks/useAuth';
import DetailsPageTabs from '../../Components/DetailsPageTabs/DetailsPageTabs';
import ProductsCard from '../../Components/ProductsCard/ProductsCard';
import toast from 'react-hot-toast';


const Details = () => {
    const products = useLoaderData();
    const { _id } = useParams();
    const { user } = useAuth()
    const product = products?.find(product => product._id === _id);

    const veriations = product?.veriation

    const [quantity, setQuantity] = useState(1);

    const [selectedVerient, setSelectedVerient] = useState('')

    const handleVerient = (e) => {
        setSelectedVerient(e.target.value);
    }

    console.log(selectedVerient);

    const navigate = useNavigate()




    // finding same category products but not the same product
    const productsInSameCategory = products?.filter(item => {
        // If the product category is an array, we check for intersection
        if (Array.isArray(item.category) && Array.isArray(product.category)) {
            return item.category.some(cat => product.category.includes(cat)) && item._id !== product._id;
        }

        // If the item's category is an array and the product's category is a string
        if (Array.isArray(item.category)) {
            return item.category.includes(product.category) && item._id !== product._id;
        }

        // If the item's category is a string and the product's category is an array
        if (Array.isArray(product.category)) {
            return product.category.includes(item.category) && item._id !== product._id;
        }

        // If both categories are strings, compare directly
        return item.category === product.category && item._id !== product._id;
    });


    const commnetDetails = { userName: user?.displayName, photo: user?.photoURL, productId: product?._id }

    const vendorInfo = { vendorEmail: product.vendorEmail, companyName: product.companyName }


    // dispatch products to redux
    const dispatch = useDispatch()

    // add product to redux store
    const handleAddToCart = (product) => {
        if (user) {
            if (veriations && !selectedVerient) {
                toast.error('Select verient')
            }
            else {
                const addingToCart = { ...product, cartQuantity: quantity, veriation: selectedVerient }
                dispatch(addToCart(addingToCart));

            }
        }
        else {
            navigate('/login')
        }

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
                        <p className='text-[#775050]  dark:text-white  text-lg font-normal'>
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
                            {/* Choose Veriation */}
                            <div className='mb-5'>
                                {veriations?.length > 0 && (
                                    <>
                                        <h1 className='mb-1 dark:text-white'>Please Select</h1>
                                        <select
                                            onChange={(e) => handleVerient(e)}
                                            className="select select-bordered w-full max-w-xs"
                                        >
                                            {/* Placeholder option */}
                                            <option value="" disabled selected>
                                                Select a variation
                                            </option>

                                            {/* Map through veriation options */}
                                            {veriations.map((veriation, index) => (
                                                <option key={index} value={`${veriation?.color}-${veriation?.size}`}>
                                                    {veriation?.color} {veriation?.size && `- ${veriation?.size}`}
                                                </option>
                                            ))}
                                        </select>
                                    </>
                                )}
                            </div>

                            <div className='flex justify-center gap-6'>

                                <ProductsCounter
                                    key={product._id}
                                    product={product}
                                    setQuality={setQuantity}
                                    quality={quantity}
                                ></ProductsCounter>

                                <button onClick={() => handleAddToCart(product)} className='bg-[#d9cfaf] rounded-[86px] text-black text-sm font-bold px-4 py-2'>Add To Cart </button>
                                {/* <button className='bg-black rounded-[86px] text-white text-sm font-bold px-4 py-2'>Add To Wish List </button> */}
                            </div>
                            <div className='text-center mt-4'>

                                <Link
                                    to={`/cartlist`}
                                    onClick={() => handleAddToCart(product)}
                                    className='bg-[#ff6b1c] rounded-[86px] text-white text-sm font-bold px-8 py-2'>
                                    Buy Now
                                </Link>
                            </div>
                        </div>



                    </div>

                    {/*description and products counter to add to cart quantity for large device */}

                    {/* display name and price */}
                    <div className='lg:mt-16 hidden lg:block'>
                        <div className='p-3'>
                            <h3 className='text-[#775050] font-bold dark:text-white  text-2xl '>{product.productName}</h3>
                            <h3 className="dark:text-white text-xl font-bold py-4">
                                Price :
                                <span className={`text-orange-500 ${product?.discount ? 'line-through text-orange-500 dark:text-orange-500' : ''} mr-4`}>
                                    ${product?.price}
                                </span>

                                {product?.discount && (
                                    <span className="text-orange-500 dark:text-white text-xl font-bold">
                                        ${(product?.price - (product?.price * product?.discount / 100)).toFixed(2)}
                                    </span>
                                )}
                            </h3>


                            {/* display brandname and details */}

                            <hr className='border-2 border-[#1d2236] w-full' />
                            <p className='text-[#775050] dark:text-white  text-lg font-normal pt-2'>Brand: {product.brandName}</p>
                            <p className='text-[#775050] dark:text-white  text-lg font-normal'>Details:<br /> {product?.productShortDescription ? product.productShortDescription : product?.description}</p>
                        </div>

                        {/* Choose Veriation */}
                        <div className='mb-5'>
                            {veriations?.length > 0 && (
                                <>
                                    <h1 className='mb-1 dark:text-white'>Please Select</h1>
                                    <select
                                        onChange={(e) => handleVerient(e)}
                                        className="select select-bordered w-full max-w-xs"
                                    >
                                        {/* Placeholder option */}
                                        <option value="" disabled selected>
                                            Select a variation
                                        </option>

                                        {/* Map through veriation options */}
                                        {veriations.map((veriation, index) => (
                                            <option key={index} value={`${veriation?.color}-${veriation?.size}`}>
                                                {veriation?.color} {veriation?.size && `- ${veriation?.size}`}
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </div>


                        <div className=' w-fit lg:mt-10 px-2'>
                            <div className='flex gap-6 '>

                                <ProductsCounter
                                    key={product._id}
                                    product={product}
                                    setQuality={setQuantity}
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
            </div>


            {/* description, vendor, review tabs */}
            <div>
                <DetailsPageTabs
                    vendorInfo={vendorInfo}
                    description={product?.description}
                    commnetDetails={commnetDetails}
                ></DetailsPageTabs>
            </div>
            {/* suggestion  */}
            <div>
                {
                    productsInSameCategory.length > 0 ?
                        <div className=' h-full mt-10  rounded-xl bg-[#d9d9d9] p-2 dark:bg-[#34394C]'>
                            <h3 className='dark:text-white text-2xl text-[#775050] font-bold mb-5'>More suggestions :</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-5'>
                                {
                                    productsInSameCategory.map(item =>
                                        <ProductsCard
                                            key={item._id}
                                            product={item}
                                        ></ProductsCard>)
                                }
                            </div>


                        </div>
                        : ''

                }
            </div>
        </div>


    );
};

export default Details;