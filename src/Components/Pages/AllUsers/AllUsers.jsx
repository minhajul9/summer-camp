import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaChalkboardTeacher, FaTrashAlt, FaUserShield } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2'

const AllUsers = () => {

    const [users, setUsers] = useState(useLoaderData());

    const handleChangeRole = (id, role, name) => {
        fetch('http://localhost:5000/user', {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ id, role })
        }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${name}'s role change to ${role}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDelete = id => {
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
                fetch(`http://localhost:5000/user/${id}`,{
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount === 1) {
                            const remaining = users.filter(user => user._id !== id);
                            setUsers(remaining)
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })

            }
        })
    }

    return (
        <div className=''>
            <Helmet>
                <title>SSC | All Users</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center my-16'>All Users</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> #</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td className='text-xl'>

                                        <button onClick={() => handleChangeRole(user._id, 'Instructor', user.name)} disabled={user.role === 'Instructor'} title='Make Instructor' className='bg-orange-400 text-black p-2 rounded m-2'><FaChalkboardTeacher /></button>

                                        <button onClick={() => handleChangeRole(user._id, 'Admin', user.name)} disabled={user.role === 'Admin'} title='Make Admin' className='bg-orange-400 text-black p-2 rounded m-2'><FaUserShield /></button>
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(user._id)} className='text-xl bg-red-600 p-2 rounded m-2 text-white'><FaTrashAlt /></button>
                                    </th>
                                </tr>)
                        }

                    </tbody>
                    {/* foot */}
                    <tfoot>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>

                </table>
            </div>
        </div>
    );
};

export default AllUsers;