import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheck, FaComment, FaRegTimesCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const PendingApproval = () => {

    const classes = useLoaderData();
    // console.log(classes);

    const handleApprove = (id, className, status) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Update status of ' + className + " to " + status,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch('https://summer-camp-server-kohl.vercel.app/classes/update', {
                    method: 'PATCH',
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify({ id: id, status: status })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount === 1) {
                            Swal.fire(
                                status.toUpperCase(),
                                className + " " + status
                            )
                            Swal.fire({
                                title: status.toUpperCase(),
                                text: className + " " + status,
                                confirmButtonText: 'Ok'
                            })
                            window.location.reload(false);
                        }
                    })
            }
        })
    }

    // TODO: send feedback
    // const handleFeedback = (event) => {
    //     event.preventDefault();
    //     const feedback = event.feedback.value; 
    //     return
    // }


    return (
        <div>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" />
                <title>SSC | Manage Classes</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            classes.map((cls, index) => {

                                const [status, setStatus] = useState(cls.status)

                                return <tr key={cls._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-20 h-20">
                                                    <img src={cls.classImage} alt="Class Image" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{cls.className}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {cls.instructorName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{cls.instructorEmail}</span>
                                    </td>
                                    <td>{cls.availableSeats}</td>
                                    <td>${cls.price}</td>
                                    <td>{status}</td>
                                    <th>
                                        <button onClick={() => {
                                            setStatus('approved')
                                            handleApprove(cls._id, cls.className, 'approved')}} disabled={status !== 'pending'} className="btn btn-ghost text-xl text-green-600"><FaCheck /></button>

                                        <button onClick={() => {
                                            setStatus('denied')
                                            handleApprove(cls._id, cls.className, 'denied')}} disabled={status !== 'pending'} className="btn btn-ghost text-xl text-red-600"><FaRegTimesCircle /></button>
                                    </th>
                                    <th>
                                        <button onClick={() => window.my_modal_1.showModal()} className="btn btn-ghost text-xl text-yellow-600"><FaComment /></button>

                                    </th>
                                </tr>
                            })
                        }

                        <dialog id="my_modal_1" className="modal">
                            <form method="dialog" className="modal-box">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                <h3 className="font-bold text-lg">Give Feedback</h3>
                                <div className="flex justify-center flex-col">
                                    <input className="p-2 rounded" type="text" name="feedback" id="" />
                                    <div className="modal-action">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button>
                                            Feedback
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </dialog>
                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Available Seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Feedback</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default PendingApproval;