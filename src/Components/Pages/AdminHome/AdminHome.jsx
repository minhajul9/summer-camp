import { Helmet } from "react-helmet";

const AdminHome = () => {
    return (
        <div>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" />
                <title>SSC | Dashboard</title>
            </Helmet>
            <h1 className="text-center text-5xl font-bold">Welcome to Dashboard</h1>
        </div>
    );
};

export default AdminHome;