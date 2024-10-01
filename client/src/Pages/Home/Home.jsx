
import { useQuery } from "@tanstack/react-query";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";
import { ClimbingBoxLoader } from "react-spinners";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import LeftMenubar from "../../Components/LeftMenuBar/LeftMenuBar";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useState } from "react";
import NoData from "../../Components/NoData/NoData";
import SectionHeader from "../../Components/ReUsableComponent/SectionHeader";
import { Helmet } from "react-helmet-async";
import CardSkelaton from "../../Components/CardSkelaton/CardSkelaton";

const Home = () => {

  // search state data 
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  // console.log(priceRange);


  // This fetch is for collect all data from mongoDB
  const axiosCommon = useAxiosCommon();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", search, selectedCategory, priceRange],
    queryFn: async () => {
      const res = await axiosCommon.get(`/all-products`, {
        params: {
          search,
          selectedCategory,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
        }
      });
      // console.log(res.data);

      return res.data;
    },
  });


  return (
    <div className="flex p-5 gap-y-5 md:gap-5">
      <div>
        <Helmet>
          <title>Best Deals | Home</title>
        </Helmet>
      </div>
      {/* Left Side menubar / category bar */}
      <div className="flex-1">
        <LeftMenubar
          setSearch={setSearch}
          setSelectedCategory={setSelectedCategory}
          setPriceRange={setPriceRange} />
      </div>

      <div className="w-full lg:w-3/4 ">

        {/* all products title */}
        <SectionHeader
        title={'Best Deal All products'}
        description={''}
        ></SectionHeader>

        {/* all products display */}
        {isLoading ? (
          <div className="">
            <CardSkelaton/>
          </div>
        ) : (
          products?.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-5  mx-auto">
              {products?.map((product) => (
                <ProductsCard
                key={product._id}
                product={product} />
              ))}
            </div> :
            <NoData></NoData>
          )}
          <FeaturedProducts  />
      </div>
    </div>
  );
};

export default Home;
