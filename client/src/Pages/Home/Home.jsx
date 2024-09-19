import axios from "axios";
import LeftMenubar from "../../Components/LeftMenubar/LeftMenubar";
import { useQuery } from "@tanstack/react-query";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";
import { ClimbingBoxLoader } from "react-spinners";
import FeaturedProducts from "../../Components/FeaturedProducts/FeaturedProducts";

const Home = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axios.get(`https://needscart-server.vercel.app/all`);

      return res.data;
    },
  });
  return (
    <div className="flex p-5 gap-5">
      {/*Left Side menubar / categorybar  */}
      <div className="flex-1">
        <LeftMenubar></LeftMenubar>
      </div>

      
      <div className="w-full lg:w-3/4 ">
      <FeaturedProducts></FeaturedProducts>
        {isLoading ?
          (
            <div className="flex justify-center items-center h-screen">
              <ClimbingBoxLoader color="#36d7b7" />
            </div>
          ) :
          (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
              {products.map(product =>
              <ProductsCard
              key={product._id}
              product={product}
              ></ProductsCard>)}
            </div>      
          )}
      </div>
    </div>
  );
};

export default Home;
