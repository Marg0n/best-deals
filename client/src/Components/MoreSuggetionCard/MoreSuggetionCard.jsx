import { Rating } from '@mui/material';

const MoreSuggetionCard = ({product}) => {
    return (
        <div>
            <div className='dark:bg-[#D6DFF2] flex items-center gap-2 bg-white p-3 rounded-[22px] mb-3'>
                <img className='w-24 h-20 rounded-[27px]' src={product.productImage} alt="" />
                <div className="flex-1">
                    <p className='text-[#020202] text-base font-normal pb-5'>{product.productName}</p>
                    <div className='flex items-center justify-between w-full'>
                        <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">
                            <Rating name="half-rating" size="small" defaultValue={product.ratings} precision={0.1} />
                        </span>
                        <h5 className='text-[#1d2236] text-xl font-bold'>${product.price}</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreSuggetionCard;