import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosCommon from "./useAxiosCommon";

const useCartList = () => {

    const axiosCommon = useAxiosCommon()
    const {user} = useAuth()

    const { data: userCartListFromDB, isLoading } = useQuery({
        queryKey: ["cartproducts"],
        queryFn: async () => {
            const res = await axiosCommon.get(`/cartList/${user.email}`);
            return res.data;
        },
    });

    return userCartListFromDB;


};

export default useCartList;