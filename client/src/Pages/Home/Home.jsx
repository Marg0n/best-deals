
import { useQuery } from "@tanstack/react-query";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";
import { ClimbingBoxLoader } from "react-spinners";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";
import LeftMenubar from "../../Components/LeftMenuBar/LeftMenuBar";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useState } from "react";
import SectionHeader from "../../Components/ReUsableComponent/SectionHeader";
import { Helmet } from "react-helmet-async";
import CardSkelaton from "../../Components/CardSkelaton/CardSkelaton";
import NoData from "../../Components/Shared/NoData";
import Banner from "../../Components/Banner/Banner";

const Home = () => {

  // search state data 
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, ""]);
  // console.log(priceRange);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  // This fetch is for collect all data from mongoDB
  const axiosCommon = useAxiosCommon();
  const { data: products, isLoading } = useQuery({
    queryKey: ["products", search, selectedCategory, priceRange, currentPage],
    queryFn: async () => {
      const params = {
        search: search || '',
        selectedCategory: selectedCategory || '',
        minPrice: priceRange?.[0] || '',
        maxPrice: priceRange?.[1] || "",
        page: currentPage,
        limit: 10
      };


      const res = await axiosCommon.get(`/all-products`, {
        params: params ? params : {},
      });
      setTotalPages(res.data.totalPages);
      return res.data.results;
    },
  });

  // handle pagination
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="flex">

      <Helmet>
        <title>Best Deals | All Products</title>
      </Helmet>

      {/* Left Side menubar / category bar */}
      <div>
        <LeftMenubar
          setSearch={setSearch}
          setSelectedCategory={setSelectedCategory}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setPriceRange={setPriceRange} />
      </div>

      <div className="w-full lg:w-3/4 mx-auto">

        {/* all products title */}
        <div className="my-4 text-black">
          <SectionHeader
            title={'Best Deal All products'}
            description={''}
          ></SectionHeader>
        </div>

        {/* all products display */}
        {isLoading ? (
          <div className="">
            <CardSkelaton />
          </div>
        ) : (
          products?.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-5 md:gap-5 text-black mx-auto">
              {products?.map((product) => (
                <ProductsCard
                  key={product._id}
                  product={product} />
              ))}
            </div> :
            <NoData></NoData>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-primary"
          >
            Previous
          </button>
          <span className="mx-3">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Home;
