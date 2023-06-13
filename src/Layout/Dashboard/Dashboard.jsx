import { useContext } from "react";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Dashboard = () => {

    const { user } = useContext(AuthContext)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet></Outlet>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        user.role === "Admin" ? <>
                            <li><Link to='/dashboard'>Admin Home</Link></li>
                            <li><NavLink to='/dashboard/allInstructors'>All Instructors</NavLink></li>
                            <li><NavLink to='/dashboard/allUsers'>All Users</NavLink></li>
                            <li><NavLink to='/dashboard/pendingApproval'>Pending Approval</NavLink></li>
                        </> : user.role === "Instructor" ?
                            <>
                                <li><NavLink to='/dashboard/addAClass'>Add a Class</NavLink></li>
                                <li><NavLink to='/dashboard/myClasses'>My Classes</NavLink></li>
                            </> :
                            <>
                                <li><NavLink>Selected Classes</NavLink></li>
                                <li><NavLink>Enrolled Classes</NavLink></li>
                                <li><NavLink>Make Payments</NavLink></li>
                                <li><NavLink>Payment History</NavLink></li>
                            </>
                    }




                    <div className="divider"></div>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/instructors'>Instructors</Link></li>
                    <li><Link to='/classes'>Classes</Link></li>

                    <li><Link to='/dashboard'>Dashboard</Link></li>
                </ul>



            </div>
        </div>
    );
};

export default Dashboard;