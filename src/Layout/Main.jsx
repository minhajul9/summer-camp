import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="w-4/5 mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;