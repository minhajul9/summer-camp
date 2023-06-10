import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {

    const { user } = useContext(AuthContext);

    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/instructors'>Instructors</NavLink></li>
        <li><NavLink to='/classes'>Classes</NavLink></li>
        {
            user &&
            <li><NavLink to='/dashboard'>Dashboard</NavLink></li>

        }
    </>

    return (
        <div className="flex justify-center fixed w-full bg-slate-800 bg-opacity-30">
            <div className="navbar fixed mx-auto md:w-4/5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navItems}
                        </ul>
                    </div>
                    <Link className="md:flex items-center">
                        <img src="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" className="w-16 " alt="" />
                        <p className="text-3xl ml-4 font-bold">Summer Sports Camp</p>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className='flex flex-col md:flex-row items-center'>
                            {
                                user.photoURL ? <img className='avatar w-12 mx-4 rounded-full' title={user.displayName} src={user.photoURL} /> :
                                    <FaRegUserCircle className='w-14 text-2xl mx-2' />
                            }
                            <button className='btn btn-outline border-indigo-600'>Log out</button>
                        </div> :
                            <Link to='/login'>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;