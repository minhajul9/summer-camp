import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user);


    if (loading) {
        return <h1>Loading</h1>
    }

    if (user) {
        // console.log("user from private:", user);
        return children;
    }

    if (!user) {
        return (
            <Navigate to='/login'></Navigate>
        );
    }
};

export default PrivateRoute;