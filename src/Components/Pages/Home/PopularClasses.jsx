import { useEffect } from "react";
import { useState } from "react";

const PopularClasses = () => {

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/classes/popular')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])
    // console.log(classes);

    return (
        <div className="my-24">
            <h1 className='text-center text-4xl font-bold my-8'>Popular Classes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    classes.map(cls => <div key={cls._id} className="card w-96 bg-base-100 shadow-xl border">
                        <figure className="bg-black p-2"><img className="h-56 rounded-lg" src={cls.classImage} alt="Image" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{cls.className}</h2>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;