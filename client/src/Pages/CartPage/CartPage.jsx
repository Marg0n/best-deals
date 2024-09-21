import CartCard from "../../Components/CartCard/CartCard";
import LeftMenubar from "../../Components/LeftMenuBar/LeftMenuBar";

const CartPage = () => {
    return (
        <div className=" flex p-5 gap-5">
            {/*Left Side menubar / categorybar  */}
            <div className="flex-1">
                <LeftMenubar></LeftMenubar>
            </div>

            {/* cart list */}
            <div className="w-full lg:w-3/4 flex flex-col lg:flex-row gap-5 justify-around">
                <div className="w-full lg:w-3/4">
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                    <CartCard></CartCard>
                </div>

                <div className=" bg-[#d9d9d9]  h-fit">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-black">Quantity</th>
                                    <th className="text-black">Total Ammount</th>
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
                                    <td>Pay Now</td>
                                    <td>47000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;