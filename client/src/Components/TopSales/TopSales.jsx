import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import CardSkelaton from "../CardSkelaton/CardSkelaton";
import SectionHeader from "../ReUsableComponent/SectionHeader";
import ProductsCard from "../ProductsCard/ProductsCard";
import { useState } from "react";

const TopSales = () => {


    const axiosCommon = useAxiosCommon();

    // Use React Query to fetch the featured products
    const { data: topSalesProducts, isLoading, isError } = useQuery({
        queryKey: ['topSalesProducts'],
        queryFn: async () => {
            const res = await axiosCommon.get(`/top-sales`);
            return res.data;
        },
    });

    


    // Loading state
    if (isLoading) return <div className='mt-10'><CardSkelaton /></div>;
    return (
        <div className="my-10 text-black">
            <SectionHeader
                title={'Top Sales'}
                description={'All Top Selling Products Last Week'}
            ></SectionHeader>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-black'>
                {
                    topSalesProducts?.slice(0, 3)?.map(topSaleProduct =>
                        <div
                            key={topSaleProduct._id}
                            className="">
                            <ProductsCard
                                product={topSaleProduct}
                                showTotalSold={true}
                            ></ProductsCard>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default TopSales;