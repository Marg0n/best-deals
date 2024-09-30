import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../features/CartSlice/CartSlice.js";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";


const ProductsCounter = ({product}) => {
 
    const dispatch = useDispatch();    

    const{cartQuantity} = product
    

    // plus product quantity
    const handleIncrement = () => {
        if (cartQuantity >= 1) {
            dispatch(incrementQuantity(product._id)); 
        }
    }

    // minus product quantity
    const handleDecrement = () => {
        if (cartQuantity > 1) {
            dispatch(decrementQuantity(product._id)); 
        }
    }


    return (
        <div className="flex justify-between gap-5 bg-[#775050] rounded-[3rem] p-1">
            <div>
                <button onClick={handleIncrement} className="btn btn-xs btn-circle mt-1 ">
                    <FiPlusCircle className="w-full h-full text-[#775050]" />
                </button>
            </div>
            <div className="text-white font-semibold text-lg">
                {cartQuantity? cartQuantity : 1}
            </div>
            <div>
                <button onClick={handleDecrement} className="btn btn-xs btn-circle mt-1">
                    <FiMinusCircle className="w-full h-full text-[#775050]" />
                </button>
            </div>
        </div>
    );
};

export default ProductsCounter;