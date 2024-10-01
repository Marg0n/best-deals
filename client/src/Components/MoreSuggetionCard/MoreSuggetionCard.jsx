import { Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const MoreSuggetionCard = ({ product }) => {
    console.log(product.rating);
    
    return (
        <div>
            <Link to={`/details/${product._id}`}>
                <div className='dark:bg-[#D6DFF2] flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                    <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                    <div className="flex-1">
                        <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                        <div className='flex items-center justify-between w-full'>
                            <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">
                                <Rating name="read-only" size="small" value={product.rating} precision={0.1} readOnly />

                            </span>
                            <h5 className='text-[#1d2236] text-xl font-bold'>${product.price}</h5>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MoreSuggetionCard;