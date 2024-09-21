import { Rating } from "@mui/material";

const CartCard = () => {
    return (
        <div>
            <div className='flex items-center gap-2 bg-[#D9D9D9] p-3 rounded-[22px] mb-3'>
                <img className='w-24 h-20 rounded-[27px]' src={''} alt="image" />
                <div className="flex-1">
                    <p className='text-[#020202] text-base font-normal pb-5'>{'Test product'}</p>
                    <div className='flex items-center justify-between w-full'>
                        <span className="text-xs font-medium tracking-widest uppercase text-[#1d2236] flex items-center gap-2">

                            <Rating name="half-rating" size="small" defaultValue={'ratings'} precision={0.1} />
                        </span>
                        <h5 className='text-[#1d2236] text-xl font-bold'>${'price'}</h5>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CartCard;