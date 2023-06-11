import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen text-center">
            <img src="https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png.webp" className="mx-auto my-16" alt="" />
            <Link className="bg-red-600 text-white px-8 py-4 rounded-lg text-xl my-8" to='/'>Back to Homepage</Link>
        </div>
    );
};

export default ErrorPage;