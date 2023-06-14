import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";



const SignUp = () => {

    const { createUser, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from || '/';

    const [error, setError] = useState('')
    const [passerror, setpassError] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const cPassword = data.cPassword;
        const photo = data.photo;
        const phone = data.phone;

        if (password === cPassword) {
            createUser(email, password)
                .then(result => {
                    // console.log(result.user);
                    const setUser = {
                        name: name,
                        email: email,
                        photo: photo,
                        phone: phone,
                        numberOfStudents: 0,
                        uid: result.user.uid,
                        enrolledClasses: [],
                        selectedClasses : []
                    };

                    fetch('https://summer-camp-server-minhajul9.vercel.app/user', {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(setUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            navigate(from, { replace: true })
                        })
                })
                .catch(error => setError(error.message))
        }
        else {
            setpassError('Password does not match.')
        }
    }

    const handleGoogleLogin = () => {
        googleSignIn()
        .then(result => {
            const user = result.user;
            console.log(result);
            const setUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
                phone: "",
                uid: user.uid,
                numberOfStudents: 0,
                enrolledClasses: [],
                selectedClasses : []
            };
            console.log(setUser);
            fetch('https://summer-camp-server-minhajul9.vercel.app/user', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(setUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    navigate(from, { replace: true })
                })
        })
        .catch(error => setError(error.message))
    }
    return (
        <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
                </div>
                <div className="card flex-shrink-0 md:w-[500px] shadow-2xl bg-base-100 p-4 ">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register('name', { required: true })} placeholder="name" className="input input-bordered" />
                        </div>
                        {errors.name && <p className="text-red-600">Please, Enter your name.</p>}
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register('email', { required: true })} placeholder="email" className="input input-bordered" />
                        </div>
                        {errors.email && <p className="text-red-600">Please, Enter your email address.</p>}
                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$&*])/
                            })}
                                placeholder="password" className="input input-bordered" />
                        </div>
                        {errors.password?.type === 'required' && <p className="text-red-600">Please, Enter your password.</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Given password is too short.</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Given Password is too weak.</p>}
                        {/* confirm password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="password" {...register('cPassword', { required: true })} placeholder="Confirm password" className="input input-bordered" />
                        </div>
                        {errors.cPassword && <p className="text-red-600">Please, Re-enter your password.</p>}
                        <p className="text-red-600">{passerror}</p>

                        {/* Photo */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" {...register('photo', { required: true })} placeholder="Photo URL" className="input input-bordered" />
                        </div>
                        {errors.photo && <p className="text-red-600">Please, Enter your Photo Link.</p>}
                        {/* phone */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="text" {...register('phone', { required: true })} placeholder="Phone" className="input input-bordered" />
                        </div>
                        {errors.phone && <p className="text-red-600">Please, Enter your active phone number.</p>}
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>

                        <p className="text-red-600">{error}</p>

                    </form>
                    <p>Already have an account? <Link className="font-bold" to='/login'>Login</Link></p>
                    <div className="divider">OR</div>
                    <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
                        <button onClick={handleGoogleLogin} className="text-2xl"><FcGoogle /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;