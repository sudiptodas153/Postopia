import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';

const Register = () => {
    const axiosSecure = useAxiosSecure()
    const { createUser, googleLogin, profileUpdate, setUser, user } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const [image, setImage] = useState('');

    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(() => {
                profileUpdate({ displayName: data.name, photoURL: image })
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    photoURL: image,
                    role: 'user',
                    isMember: false,
                    badge: 'bronze'
                };
                axiosSecure.post('users', userInfo)
                    .then(() => {
                        setUser({ ...user, displayName: data.name, photoURL: image })
                        setTimeout(() => {
                            navigate(from, { replace: true });
                        }, 500);
                    })
                    .catch(() => { })

            })
            .catch(e => {
                console.log(e)
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
                        setTimeout(() => {
                            navigate(from, { replace: true });
                        }, 500);
                    })
                    .catch(() => { })


            })
            .catch(() => {

            })
    }


    // handleImage
    const handleImage = async e => {
        const image = e.target.files[0]
        // console.log(image)
        const formData = new FormData();
        formData.append('image', image)
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`
        const res = await axios.post(imageUrl, formData)
        setImage(res.data.data.url)
    }

    return (
        <div>
            <div className='border md:w-80 border-gray-300 rounded-lg p-4'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-3xl font-bold text-center text-purple-700">Register</h2>
                    <div>
                        {/* Name */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Name</legend>
                            <input type="text" {...register("name", { required: true })} className="input focus:outline-none" placeholder="enter your name" />
                            {errors.name?.type === 'required' && <p className='text-red-700'>Fill up the name field.</p>}
                        </fieldset>

                        {/* Email */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email</legend>
                            <input type="email" {...register("email", { required: true })} className="input focus:outline-none" placeholder="enter your email" />
                            {errors.email?.type === 'required' && <p className='text-red-700'>Fill up the email field.</p>}
                        </fieldset>

                        {/* Image */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo URL</legend>
                            <input type="file" required
                                onChange={handleImage}
                                className="border border-gray-300 p-2 rounded-sm focus:outline-none" placeholder="enter your image" />
                        </fieldset>

                        {/* Password */}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>

                            <input
                                type="text"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /.*[!@#$%^&*].*/,
                                })}
                                className="input focus:outline-none"
                                placeholder="enter your password"
                            />

                            {errors.password?.type === 'required' && (
                                <p className='text-red-700'>Fill up the password field.</p>
                            )}
                            {errors.password?.type === 'minLength' &&
                                <p className='text-red-700'>Password must be 6 characters.</p>}
                            {errors.password?.type === 'pattern' && (
                                <p className='text-red-700'>Password must contain at least one special character.</p>
                            )}
                        </fieldset>


                        <button className='btn mt-3 w-full rounded-2xl font-bold text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]'>Register</button>
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
        </div>
    );
};

export default Register;