import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";

const Instructors = () => {

    const instructors = useLoaderData()
    console.log(instructors);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16 mx-auto">
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" />
                <title>SSC | Instructors</title>
            </Helmet>
            {
                instructors.map(instructor =>
                    <div key={instructor._id} className="card card-compact w-96 bg-base-100 shadow-xl border">
                        <figure className="h-48"><img src={instructor.photo} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{instructor.name}</h2>
                            <p>Email: {instructor.email}</p>
                            <div className="card-actions justify-end">
                                {/* TODO: Show all classes when clicked */}
                                <button className="btn btn-primary">See Classes</button>
                            </div>
                        </div>
                    </div>)
            }
        </div>
    );
};

export default Instructors;