import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Link, NavLink, Outlet } from 'react-router';
import loginAnimation from '../assets/Animation - 1752003779265.json'
import Logo from '../Components/Logo/Logo';
import Lottie from 'lottie-react';

const AuthLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto my-10'>
            <div className="p-6  border border-gray-300 rounded-lg">
                <div className='flex items-center mb-5 justify-between'>
                    <Link to={'/'}><Logo></Logo></Link>
                    <div className='flex items-center gap-2'>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? 'btn rounded-2xl text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]'
                                    : 'btn rounded-2xl border text-[#ad4df1] border-[#ad4df1] '
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive
                                    ? 'btn rounded-2xl text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]'
                                    : 'btn rounded-2xl border text-[#ad4df1] border-[#ad4df1] '
                            }
                        >
                            Register
                        </NavLink>


                    </div>
                </div>
                <div className="hero-content flex-col md:gap-10 md:flex-row-reverse">
                    <div className=''>
                        <Lottie animationData={loginAnimation} loop={true} className="h-44 w-44  md:w-[300px] md:h-[300px]" />
                    </div>
                    <div className=''>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;