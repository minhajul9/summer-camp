import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Login = () => {

    const { signIn, googleSignIn } = useContext(AuthContext);

    const [error, setError] = useState('')
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState(false)

    const from = location.state?.from || '/';

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data.email;
        const password = data.password;
        signIn(email, password)
            .then(result => {
                // console.log(result.user)
                navigate(from, { replace: true })
            })
            .catch(error => setError(error.message))
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                const setUser = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    phone: "",
                    uid: user.uid,
                    enrolledClasses: [],
                    selectedClasses : [],
                    numberOfStudents: 0
                };
                console.log(setUser);
                fetch('https://summer-camp-server-kohl.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(setUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        navigate(from, { replace: true })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => setError(error.message))
    }

    return (
        <div className="hero min-h-screen bg-base-200 ">
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="https://i.ibb.co/ygxHsMb/Screenshot-2023-06-10-160018.png" />
                <title>SSC | User Login</title>
            </Helmet>
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card flex-shrink-0 md:w-[500px] shadow-2xl bg-base-100 p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email')} placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative form-control">
                                <input type={show ? 'text' : 'password'} {...register('password')} placeholder="password" className="input input-bordered" />
                                <FaEye onClick={() => setShow(!show)} className="absolute md:left-[370px] top-4"></FaEye>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        {
                            <p className="text-red-600">{error}</p>
                        }
                    </form>
                    <p>New Here? <Link to='/signUp'>Create new account</Link></p>
                    <div className="divider">OR</div>
                    <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
                        <button onClick={handleGoogleLogin} className="text-2xl"><FcGoogle /></button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;