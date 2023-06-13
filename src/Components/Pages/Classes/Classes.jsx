import { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";

const Classes = () => {
    const classes = useLoaderData();
    const {user} = useContext(AuthContext);
    const navigate= useNavigate()
    const location = useLocation();

    const handleSelect = id =>{
        if(user){
            fetch(`http://localhost:5000/class/${user._id}/${id}`, {
                method: 'put'
            })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Class added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
            })
        }
        else{
            Swal.fire({
                title: 'Access Denied!',
                text: 'Please, Login first',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              navigate('/login', {state: {from: location}})
        }
    }
    return (
        <div className="my-8 grid lg:grid-cols-3 md:grid-cols-2 justify-center">
            {
                classes.map(cls =>
                    <div key={cls._id} className="card w-96 bg-base-100 shadow-xl border">
                        <figure className="bg-black"><img className="h-56 rounded-lg" src={cls.classImage} alt="Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{cls.className}</h2>
                            <p>Instructor: {cls.instructorName}</p>
                            <p>Available Seats: {cls.availableSeats}</p>
                            <p>Price: ${cls.price}</p>
                            <div className="card-actions justify-end">
                                <button onClick={() => handleSelect(cls._id)} disabled={user?.role === 'Admin' || user?.role === 'Instructor' || cls.availableSeats === 0 && true} className="btn btn-primary">Select</button>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Classes;