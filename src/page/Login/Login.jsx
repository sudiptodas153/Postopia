import React from 'react';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Login = () => {
    const { googleLogin, signIn } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()

    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    confirmButtonColor: '#6366F1', // Indigo tone
                    timer: 2000,
                });

                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 500);
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: 'Invalid email or password!',
                    confirmButtonColor: '#EF4444'
                });

            })
    };


    // Google 
    const googleSignIn = () => {
        googleLogin()
            .then(result => {

                const userInfo = {
                    email: result?.user?.email,
                    name: result?.user?.displayName,
                    photoURL: result?.user?.photoURL,
                    role: 'user'
                }


                axiosSecure.post('users', userInfo)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Login Successful',
                            text: 'Welcome back!',
                            confirmButtonColor: '#6366F1', // Indigo tone
                            timer: 2000,
                        });

                        setTimeout(() => {
                            navigate(from, { replace: true });
                        }, 500);
                    })
                    .catch(() => { })


            })
            .catch(() => {

            })
    }


    return (
        <div className='border md:w-80 border-gray-300 rounded-lg p-4'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-3xl font-bold text-center text-purple-700">Login</h2>
                <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Email</legend>
                        <input type="email" {...register("email", { required: true })} className="input focus:outline-none" placeholder="enter your email" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Password</legend>
                        <input type="text" {...register("password", { required: true })} className="input focus:outline-none" placeholder="enter your password" />
                    </fieldset>
                    <div>
                        <p className='text-xs mb-3'>Forget Password?</p>
                    </div>
                    <button className='btn w-full rounded-2xl font-bold text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]'>Login</button>
                </div>
            </form>
            <div className='flex justify-center my-3'>
                <h2>Or,</h2>
            </div>
            <div>
                <button onClick={googleSignIn} className="btn w-full rounded-2xl bg-white text-black border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
        </div>
    );
};

export default Login;