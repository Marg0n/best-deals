import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUserInDB = [], isLoading } = useQuery({
        queryKey: ["allUserInDB"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers`);
            return res.data; // Ensure you handle the data correctly here
        },
    });
    return [allUserInDB, isLoading];
};

export default useAllUsers;