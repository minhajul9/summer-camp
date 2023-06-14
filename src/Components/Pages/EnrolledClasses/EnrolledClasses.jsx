import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaTrashAlt, FaWallet } from "react-icons/fa";
import Swal from "sweetalert2";

const EnrolledClasses = () => {

    const [enrolledClasses, setEnrolledClasses] = useState([])
    const { user, setUser } = useContext(AuthContext)

    useEffect(() => {
        fetch(`https://summer-camp-server-kohl.vercel.app/classes/enrolled/${user._id}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setEnrolledClasses(data)
            })
    }, [user])
    // console.log(selectedClasses);


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

                        </tr>
                    </thead>
                    <tbody>
                        {
                            enrolledClasses.map((cls, index) =>
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
                                    
                                </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;