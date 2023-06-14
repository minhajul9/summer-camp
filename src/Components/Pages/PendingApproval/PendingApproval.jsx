import { FaCheck, FaComment, FaRegTimesCircle } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const PendingApproval = () => {

    const classes = useLoaderData();
    // console.log(classes);

    const handleApprove = (id, className, status) => {
        Swal.fire({
            title: 'Are you sure?',
            text:  'Update status of '+ className + " to "+ status,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch('https://summer-camp-server-kohl.vercel.app/classes/update',{
                    method: 'PATCH', 
                    headers: {
                        'content-type' : "application/json"
                    },
                    body: JSON.stringify({id: id, status: status})
                })
                .then(res => res.json())
                .then(data => {
                    if(data.modifiedCount === 1){
                        Swal.fire(
                            status.toUpperCase(),
                            className + " "+ status
                        )
                        Swal.fire({
                            title: status.toUpperCase(),
                            text: className + " "+ status,
                            confirmButtonText: 'Ok'
                          })
                        window.location.reload(false);
                    }
                })
            }
        })
    }

    return (
        <div>
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
                            classes.map((cls, index) => <tr key={cls._id}>
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
                                <td>{cls.status}</td>
                                <th>
                                    <button onClick={() => handleApprove(cls._id, cls.className, 'approved')} disabled={cls.status !== 'pending'} className="btn btn-ghost text-xl text-green-600"><FaCheck /></button>

                                    <button onClick={() => handleApprove(cls._id, cls.className, 'denied')} disabled={cls.status !== 'pending'} className="btn btn-ghost text-xl text-red-600"><FaRegTimesCircle /></button>
                                </th>
                                <th>
                                    <button onClick={() => handleApprove(cls._id, cls.className)} className="btn btn-ghost text-xl text-yellow-600"><FaComment /></button>
                                    
                                </th>
                            </tr>)
                        }

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