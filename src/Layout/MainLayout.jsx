import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import NavMenu from "../Shared/Navbar";


const MainLayout = () => {
    return (
        <div>
            <NavMenu></NavMenu>
            <div className="min-h-[calc(100vh-447px)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;