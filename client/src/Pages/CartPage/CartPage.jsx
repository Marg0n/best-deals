import { Helmet } from "react-helmet-async";
import CartCard from "../../Components/CartCard/CartCard";
import Invoice from "../../Components/Invoice/Invoice";
import LeftMenubar from "../../Components/LeftMenuBar/LeftMenuBar";


const CartPage = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart')) || [];

    return (
        <div className=" flex p-5 gap-5">
            <Helmet>
                <title>Best Deal | Cart list</title>
            </Helmet>
            {/*Left Side menubar / categorybar  */}
            <div className="flex-1">
                <LeftMenubar></LeftMenubar>
            </div>

            {/* cart list */}
            <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-5 justify-around ">
                <div className="w-full lg:w-[65%] border border-red-50">
                    {
                        cartProducts?.map(product =>
                            <CartCard
                                key={product?._id}
                                product={product}
                            ></CartCard>)
                    }
                </div>

                {/* Total bill Table */}
                <div className="flex-grow" >
                    <div className=" bg-[#d9d9d9]  h-fit">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-white bg-[#775050]">Quantity</th>
                                        <th className="text-white bg-[#775050]">Total Ammount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    <tr>
                                        <td>10</td>
                                        <td>50000</td>
                                    </tr>
                                    {/* row 2 */}
                                    <tr>
                                        <td>Discount</td>
                                        <td>5%</td>
                                    </tr>
                                    {/* row 3 */}
                                    <tr>
                                        <td>Grand Total</td>
                                        <td>47000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <Invoice></Invoice>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;