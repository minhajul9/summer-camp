import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Pages/Home/Home";
import Instructors from "../Components/Pages/Instructors/Instructors";
import Classes from "../Components/Pages/Classes/Classes";
import SignUp from "../Components/Pages/SignUp/SignUp";
import ErrorPage from "../Components/Pages/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Login from "../Components/Pages/Login/Login";
import AllInstructors from "../Components/Pages/AllInstructors/AllInstructors";
import AllUsers from "../Components/Pages/AllUsers/AllUsers";
import PendingApproval from "../Components/Pages/PendingApproval/PendingApproval";
import MyClasses from "../Components/Pages/MyClasses/MyClasses";
import AddAClass from "../Components/Pages/AddAClass/AddAClass";
import AdminHome from "../Components/Pages/AdminHome/AdminHome";
import SelectedClasses from "../Components/Pages/SelectedClasses/SelectedClasses";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>,
                loader: () => fetch('http://localhost:5000/users/instructor')
            },
            {
                path: '/classes',
                element: <Classes></Classes>,
                loader: () => fetch('http://localhost:5000/classes/approved')
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }
        ],
        errorElement: <ErrorPage></ErrorPage>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <AdminHome></AdminHome>
            },
            {
                path: '/dashboard/allInstructors',
                element: <AllInstructors></AllInstructors>
            },
            {
                path: '/dashboard/manageUsers',
                element: <AllUsers></AllUsers>,
                loader: () => fetch('http://localhost:5000/users')
            },
            {
                path: '/dashboard/manageClasses',
                element: <PendingApproval></PendingApproval>,
                loader: () => fetch('http://localhost:5000/classes')
            },
            {
                path: '/dashboard/myClasses',
                element: <MyClasses></MyClasses>
            },
            {
                path: '/dashboard/addAClass',
                element: <AddAClass></AddAClass>
            },
            {
                path: '/dashboard/selectedClasses',
                element: <SelectedClasses></SelectedClasses>
            }
        ]
    }
])

export default routes;