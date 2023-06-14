import { useEffect } from "react";
import { useState } from "react";

const PopularInstructors = () => {

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/instructors/popular')
            .then(res => res.json())
            .then(data => setInstructors(data))
    }, [])
    console.log(instructors);

    return (
        <div className="my-24">
            <h1 className='text-center text-4xl font-bold my-8'>Popular Instructors</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    instructors.map(instructor => <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl border">
                        <figure className="bg-black p-2"><img className="h-56 rounded-lg" src={instructor.photo} alt="Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{instructor.name}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;