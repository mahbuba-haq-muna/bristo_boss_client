import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Provider/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";


const SignUp = () => {
    const {register,handleSubmit, reset, formState: { errors }} = useForm();
    const {createUser, updateUserProfile} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('user info added to the database')
                        reset();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                            }
                        })
                        

                    })
                    .catch(error => console.log(error))
            })
       
      }
    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>

             <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left md:w-1/2">
                    <h1 className="text-5xl font-bold">Sign Up!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card  w-full md:w-1/2  shadow-2xl bg-base-100">
                    <form  onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true } ) } name="name" placeholder="name" className="input input-bordered" />
                            {errors.name && <p className="text-red-500">Name is required</p>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true } ) }  placeholder="photoURL" className="input input-bordered" />
                            {errors.photoURL && <p className="text-red-500">Name is required</p>}
                        </div>
                        

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        {errors.email && <span className="text-red-500">Email is required</span>}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/ })} name="password" placeholder="password" className="input input-bordered"  />
                        </div>
                        {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
                        {errors.password?.type === "minLength" && <span className="text-red-500">Password must be 6 characters</span>}
                        {errors.password?.type === "maxLength" && <span className="text-red-500">Password must be less then 20 characters</span>}
                        {errors.password?.type === "pattern" && <span className="text-red-500">Password must have one upper case, one lower case, one number and a special character
                        </span>}
                        
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                        <p><small>Already registered? <Link to={"/login"}> Go to log in</Link> </small></p>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
        </div>
    );
};

export default SignUp;