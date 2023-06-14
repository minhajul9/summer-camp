import { useEffect } from "react";
import { useState } from "react";

const PopularInstructors = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/instructors/popular')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    console.log(classes);

    return (
        <div className="my-24">
            <h1 className='text-center text-4xl font-bold my-8'>Popular Instructors</h1>
            
        </div>
    );
};

export default PopularInstructors;