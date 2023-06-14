import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';

const AddAClass = () => {

    const { user } = useContext(AuthContext);

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const className = data.className;
        const classImage = data.image;
        const instructorName = user.name;
        const instructorEmail = user.email;
        const availableSeats = parseInt(data.seats);
        const price = data.price
        const admittedStudents = 0;
        const status = 'pending';
        const newClass = { className, classImage, instructorName, instructorEmail, availableSeats, price, admittedStudents, status };

        Swal.fire({
            title: 'Are you sure?',
            text: "Create class: " + className,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('https://summer-camp-server-minhajul9.vercel.app/classes', {
                    method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newClass)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            Swal.fire(
                                'Added!',
                                'New class added.',
                                'success'
                            )
                            reset();
                            
                        }
                    })

            }
        })

    };

    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col md:w-[800px]">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Add A Class</h1>
                    </div>

                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

                            {/* Title */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Name</span>
                                </label>
                                <input {...register('className')} type="text" placeholder="Class Name" className="input input-bordered" />
                            </div>

                            {/* class photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Class Image URL</span>
                                </label>
                                <input {...register('image')} type="text" placeholder="Class Image URL" className="input input-bordered" />
                            </div>
                            {/* instructor name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Name</span>
                                </label>
                                <input type="text" defaultValue={user.name} disabled placeholder="Instructor Name" className="input input-bordered" />
                            </div>

                            {/* instructor email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Instructor Email</span>
                                </label>
                                <input type="text" defaultValue={user.email} disabled placeholder="Instructor Email" className="input input-bordered" />
                            </div>
                            {/* available seats  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Available seats</span>
                                </label>
                                <input {...register('seats')} type="number" placeholder="Available seats" className="input input-bordered" />
                            </div>
                            {/* available seats  */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input {...register('price')} type="number" placeholder="Price" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Add A Class" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAClass;