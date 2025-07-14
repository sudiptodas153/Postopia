import React from 'react';
import Logo from '../Logo/Logo';
import { Link, NavLink } from 'react-router';
import Notification from '../Notification/Notification';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, signOutUser, announcements } = useAuth()
    const axiosSecure = useAxiosSecure()

    const links = <>
        <li>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive
                        ? 'text-[#ad4df1] font-semibold border-b-2 border-[#ad4df1]'
                        : 'text-gray-600'
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/membership"
                className={({ isActive }) =>
                    isActive
                        ? 'text-[#ad4df1] font-semibold border-b-2 border-[#ad4df1]'
                        : 'text-gray-600'
                }
            >
                Membership
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/top"
                className={({ isActive }) =>
                    isActive
                        ? 'text-[#ad4df1] font-semibold border-b-2 border-[#ad4df1]'
                        : 'text-gray-600'
                }
            >
                Leaderboard
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    isActive
                        ? 'text-[#ad4df1] font-semibold border-b-2 border-[#ad4df1]'
                        : 'text-gray-600'
                }
            >
                About Us
            </NavLink>
        </li>
    </>




    // logout
    const logout = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });
            })
            .catch(() => { })
    }





    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    const admins = users.filter(user => user.role === 'admin');

    // console.log(user)
    // console.log(admins[0]?.email)


    const announcementCount = announcements.length;
    return (
        <div className="navbar bg-base-100 shadow-sm md:px-12">
            <div className="navbar-start">

                <div>
                    {/* ✅ Small device drawer button */}
                    <label htmlFor="nav-drawer" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>

                    {/* ✅ Drawer markup */}
                    <div className="drawer md:hidden z-50">
                        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-side">
                            <label htmlFor="nav-drawer" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content space-y-2">
                                {/* Same links used in desktop navbar */}
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'text-[#ad4df1] font-semibold border-b-2 border-[#ad4df1]'
                                                : 'text-gray-600'
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/membership"
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'text-[#ad4df1] font-semibold border-b-2 border-[#ad4df1]'
                                                : 'text-gray-600'
                                        }
                                    >
                                        Membership
                                    </NavLink>
                                </li>

                                {/* Optional: Add Dashboard + Logout/Login for mobile */}
                                {
                                    user &&
                                    <li>
                                        {
                                            admins[0]?.email === user?.email
                                                ? <Link to="/admin-dashboard">Admin Dashboard</Link>
                                                : <Link to="/user-dashboard">User Dashboard</Link>
                                        }
                                    </li>
                                }
                                {
                                    user
                                        ? <li><button onClick={logout}>Logout</button></li>
                                        : <li><Link to="/login">Join Us</Link></li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className=''> <Logo></Logo></div>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-10 px-1">
                    {links}
                </ul>
            </div>
            {
                user ?
                    <div className="navbar-end flex items-center gap-3 md:gap-10">
                        <Notification count={announcementCount} />
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="">
                                <img className='rounded-full w-10 h-10 md:w-12 md:h-12' src={user?.photoURL} alt="" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content border border-gray-400 mt-4 space-y-3 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <h2 className='text-lg font-bold'>{user?.displayName}</h2>
                                {
                                    admins[0]?.email === user?.email ?
                                        <Link to={'/admin-dashboard'}><li className='text-sm font-bold'>Dashboard</li></Link>
                                        :
                                        <Link to={'/user-dashboard'}><li className='text-sm font-bold '>Dashboard</li></Link>
                                }
                                <button onClick={logout} className='btn border hover:text-white hover:bg-gradient-to-r from-[#ad4df1] to-[#5191f7] text-[#ad4df1] border-[#ad4df1]'>Logout</button>
                            </ul>
                        </div>
                    </div>
                    :
                    <div className="navbar-end flex items-center gap-3">
                        <Notification count={announcementCount} />
                        <Link to={'/login'}>
                            <button className="btn rounded-2xl font-bold text-white bg-gradient-to-r from-[#ad4df1] to-[#5191f7]">Join Us</button>
                        </Link>
                    </div>
            }

        </div>
    );
};

export default Navbar;