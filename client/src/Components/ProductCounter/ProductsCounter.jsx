import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../features/CartSlice/CartSlice.js";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";


const ProductsCounter = ({ product , quality , setQuality }) => {

    const dispatch = useDispatch();

    const { cartQuantity } = product;

    // const [quality, setQuality] = useState(1)


    // plus product quantity
    const handleIncrement = () => {
        if (quality >= 1) {
            setQuality(quality + 1)
        }
        if (cartQuantity >= 1) {
            dispatch(incrementQuantity(product._id));
        }
    }

    // minus product quantity
    const handleDecrement = () => {
        if (quality >= 2) {
            setQuality(quality - 1)
        }
        if (cartQuantity > 1) {
            dispatch(decrementQuantity(product._id));
        }
    }

  


    return (
        <div className="flex justify-between gap-5 bg-[#775050] rounded-[3rem] p-1 ">
            <div>
                <button onClick={handleIncrement} className="btn btn-xs btn-circle mt-1  bg-white ">
                    <FiPlusCircle className="w-full h-full text-[#775050] " />
                </button>
            </div>
            <div className="text-white font-semibold text-lg">
                {/* {cartQuantity? cartQuantity : 1} */}
                {cartQuantity ? cartQuantity : quality}
            </div>
            <div>
                <button onClick={handleDecrement} className="btn btn-xs btn-circle mt-1 bg-white">
                    <FiMinusCircle className="w-full h-full text-[#775050] " />
                </button>
            </div>
        </div>
    );
};

export default ProductsCounter;