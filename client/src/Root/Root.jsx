import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <h1>Footer</h1>
    </div>
  );
};

export default Root;
