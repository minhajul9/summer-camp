import { useEffect } from "react";
import { useState } from "react";
import { AttentionSeeker } from "react-awesome-reveal";

const PopularInstructors = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('https://summer-camp-server-kohl.vercel.app/instructors/popular')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    // console.log(instructors);


    return (
        <div className="my-24">
            <h1 className='text-center text-4xl font-bold my-8'>Popular Instructors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    instructors.map(instructor =>
                        <AttentionSeeker key={instructor._id} effect="headShake" >
                            <div  className="card w-96 bg-base-100 shadow-xl border">
                                <figure className="bg-black p-2"><img className="h-56 rounded-lg" src={instructor.photo} alt="Image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{instructor.name}</h2>
                                </div>
                            </div>
                        </AttentionSeeker>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructors;