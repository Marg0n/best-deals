import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "./useAxiosCommon";
import useAuth from "./useAuth";


const useUserProfile = () => {

    const axiosCommon = useAxiosCommon();
    const { user } = useAuth();

    const { data: profile = [], refetch: profileRefetch, isLoading: profileLoading } = useQuery({
        queryKey: ['profile', user],
        queryFn: async () => {
            const { data } = await axiosCommon(`/users/${user?.email}`)
            return data
        }
    })

    return {profile, profileRefetch, profileLoading};
};

export default useUserProfile;