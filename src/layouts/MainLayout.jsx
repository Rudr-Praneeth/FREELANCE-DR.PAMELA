import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className='bg-[#090A10] text-[#F5F5F6] font-sans text-[14px]'>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
