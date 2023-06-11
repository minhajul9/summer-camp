import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Components/Pages/Home/Home";
import Instructors from "../Components/Pages/Instructors/Instructors";
import Classes from "../Components/Pages/Classes/Classes";
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import Login from "../Components/Pages/Instructors/Login/Login";
import SignUp from "../Components/Pages/SignUp/SignUp";

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
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>
    }
])

export default routes;