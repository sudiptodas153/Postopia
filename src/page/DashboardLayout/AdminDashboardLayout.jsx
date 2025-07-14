import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import { IoHome } from "react-icons/io5";

const AdminDashboardLayout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div className="max-w-11/12 mx-auto mt-5 flex flex-col md:flex-row min-h-screen">
            {/* Mobile Navbar with Hamburger */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 border border-indigo-500 rounded-lg text-indigo-600 mb-3">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <button
                    onClick={() => setDrawerOpen(!drawerOpen)}
                    aria-label="Toggle Menu"
                    className="focus:outline-none"
                >
                    {/* Hamburger icon */}
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                    >
                        {drawerOpen ? (
                            <path d="M18 6 6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0  left-0 md:relative h-[450px] 
    bg-white border border-indigo-500 text-indigo-600 rounded-r-lg p-6 w-64
    transform transition-transform duration-300 ease-in-out
    z-40
    md:translate-x-0
    ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
  `}
            >
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <nav className="flex flex-col space-y-4">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "border border-indigo-500 rounded px-2 py-1 text-indigo-600 flex items-center gap-2"
                                : "px-2 py-1 text-indigo-600 flex items-center gap-2"
                        }
                        onClick={() => setDrawerOpen(false)}
                    >
                     <IoHome />   Home
                    </NavLink>
                    <NavLink
                        to="/admin-dashboard"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "border border-indigo-500 rounded px-2 py-1 text-indigo-600 flex items-center gap-2"
                                : "px-2 py-1 text-indigo-600 flex items-center gap-2"
                        }
                        onClick={() => setDrawerOpen(false)}
                    >
                        Admin Profile
                    </NavLink>
                    <NavLink
                        to="manageUsers"
                        className={({ isActive }) =>
                            isActive
                                ? "border border-indigo-500 rounded px-2 py-1 text-indigo-600 flex items-center gap-2"
                                : "px-2 py-1 text-indigo-600 flex items-center gap-2"
                        }
                        onClick={() => setDrawerOpen(false)}
                    >
                        Manage Users
                    </NavLink>
                    <NavLink
                        to="reports"
                        className={({ isActive }) =>
                            isActive
                                ? "border border-indigo-500 rounded px-2 py-1 text-indigo-600 flex items-center gap-2"
                                : "px-2 py-1 text-indigo-600 flex items-center gap-2"
                        }
                        onClick={() => setDrawerOpen(false)}
                    >
                        Reported Activities
                    </NavLink>
                    <NavLink
                        to="announcement"
                        className={({ isActive }) =>
                            isActive
                                ? "border border-indigo-500 rounded px-2 py-1 text-indigo-600 flex items-center gap-2"
                                : "px-2 py-1 text-indigo-600 flex items-center gap-2"
                        }
                        onClick={() => setDrawerOpen(false)}
                    >
                        Make Announcement
                    </NavLink>
                </nav>
            </aside>

            {/* Overlay for mobile drawer */}
            {drawerOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                    onClick={() => setDrawerOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main Content */}
            <main className="p-6 flex-1 bg-white md:h-[450px] overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboardLayout;
