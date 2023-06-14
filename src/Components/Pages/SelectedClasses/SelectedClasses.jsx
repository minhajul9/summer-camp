import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaTrashAlt, FaWallet } from "react-icons/fa";
import Swal from "sweetalert2";

const SelectedClasses = () => {

    const [selectedClasses, setSelectedClasses] = useState([])
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/classes/${user._id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setSelectedClasses(data)
            })
    }, [user])
    // console.log(selectedClasses);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const remainingClasses = selectedClasses.filter(cls => cls._id !== id);
                const remainingIds = remainingClasses.map(cls => cls._id)
                fetch(`http://localhost:5000/classes/${user._id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ remainingIds: remainingIds })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount) {
                            setSelectedClasses(remainingClasses);
                            user.selectedClasses = remainingClasses
                            setUser(user)
                            console.log(user, 'user after removing class');
                            Swal.fire(
                                'Deleted!',
                                'Class has been deleted.',
                                'success'
                            )
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
                            <th>
                                #
                            </th>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses.map((cls, index) =>
                                <tr key={cls._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={cls.classImage} alt="classImage" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-xl">{cls.className}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {cls.instructorName}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">{cls.instructorEmail}</span>
                                    </td>
                                    <th >
                                        <button className="btn text-xl text-green-600 mx-2"><FaWallet /></button>
                                        <button onClick={() => handleDelete(cls._id)} className="btn text-xl text-red-600 mx-2"><FaTrashAlt /></button>
                                    </th>
                                </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default SelectedClasses;