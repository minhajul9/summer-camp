import { useLoaderData } from "react-router-dom";

const Classes = () => {
    const classes = useLoaderData();
    return (
        <div className="my-8 grid lg:grid-cols-3 md:grid-cols-2 justify-center">
            {
                classes.map(cls =>
                    <div key={cls._id} className="card w-96 bg-base-100 shadow-xl border">
                        <figure className="bg-black"><img className="h-56 rounded-lg" src={cls.classImage} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold">{cls.className}</h2>
                            <p>Instructor: {cls.instructorName}</p>
                            <p>Available Seats: {cls.availableSeats}</p>
                            <p>Price: ${cls.price}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Select</button>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Classes;