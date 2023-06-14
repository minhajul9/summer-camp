import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import { AttentionSeeker } from "react-awesome-reveal";
import Swal from 'sweetalert2';

const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // console.log(user);


    if (loading) {
        return <div className='h-screen flex items-center justify-center'>
            <AttentionSeeker effect="wobble" >
                <p className='text-4xl font-bold'>Dashboard Loading</p>
            </AttentionSeeker>
        </div>
    }

    if (user.role === 'Instructor') {
        // console.log("user from private:", user);
        return children;
    }

    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Access denied!',
            footer: '<Link to="/">Back to Home?</Link>'
        })
        return <Navigate to='/'></Navigate>

    }
};

export default InstructorRoute;