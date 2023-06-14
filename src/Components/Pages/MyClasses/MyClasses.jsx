import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

const MyClasses = () => {

    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([])

    useEffect(() => {
        fetch(`https://summer-camp-server-kohl.vercel.app/classes/instructor`, {
            method: 'post',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [user])

    // console.log(classes);
    return (
        <div>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" />
                <title>SSC | My Classes</title>
            </Helmet>
            <h1 className='text-3xl font-bold text-center my-12'>My Classes</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Class Name</th>
                            <th>Enrolled Students</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((cls, index) =>
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
                                        {cls.admittedStudents}
                                    </td>
                                    <td>
                                        {cls.status}
                                    </td>
                                    <td>
                                        {cls.status === "denied" && cls.feedback}
                                    </td>
                                    <th >
                                        <button className='bg-purple-500 p-2 text-white rounded-md'>Update</button>
                                    </th>
                                </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyClasses;