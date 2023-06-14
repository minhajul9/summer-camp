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
import AllUsers from "../Components/Pages/AllUsers/AllUsers";
import PendingApproval from "../Components/Pages/PendingApproval/PendingApproval";
import MyClasses from "../Components/Pages/MyClasses/MyClasses";
import AddAClass from "../Components/Pages/AddAClass/AddAClass";
import AdminHome from "../Components/Pages/AdminHome/AdminHome";
import SelectedClasses from "../Components/Pages/SelectedClasses/SelectedClasses";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";

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
                loader: () => fetch('https://summer-camp-server-minhajul9.vercel.app/users/instructor')
            },
            {
                path: '/classes',
                element: <Classes></Classes>,
                loader: () => fetch('https://summer-camp-server-minhajul9.vercel.app/classes/approved')
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
                path: '/dashboard/manageUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
                loader: () => fetch('https://summer-camp-server-minhajul9.vercel.app/users')
            },
            {
                path: '/dashboard/manageClasses',
                element: <AdminRoute><PendingApproval></PendingApproval></AdminRoute>,
                loader: () => fetch('https://summer-camp-server-minhajul9.vercel.app/classes')
            },
            {
                path: '/dashboard/myClasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: '/dashboard/addAClass',
                element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
            },
            {
                path: '/dashboard/selectedClasses',
                element: <PrivateRoute><SelectedClasses></SelectedClasses></PrivateRoute>
            }
        ]
    }
])

export default routes;