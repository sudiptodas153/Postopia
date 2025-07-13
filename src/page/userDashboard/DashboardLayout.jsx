import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaHome, FaRegNewspaper } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { Outlet, NavLink } from "react-router";

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="max-w-11/12 mx-auto mt-5 flex flex-col md:flex-row min-h-screen">
      {/* Mobile Navbar with Hamburger */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border border-[#ad4df1] rounded-lg text-[#ad4df1] mb-3">
        <h2 className="text-xl font-bold">Postopia</h2>
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
              // X icon when open
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              // Hamburger icon when closed
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full md:h-[450px] bg-white border border-[#ad4df1] text-[#ad4df1] rounded-r-lg p-6 w-64
          transform transition-transform duration-300 ease-in-out
          z-40
          md:relative md:translate-x-0
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col space-y-4 mt-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1] flex items-center gap-2"
                : "px-2 py-1 text-[#ad4df1] flex items-center gap-2"
            }
            onClick={() => setDrawerOpen(false)}
          >
            <FaHome /> Home
          </NavLink>
          <NavLink
            to="/user-dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? "border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1] flex items-center gap-2"
                : "px-2 py-1 text-[#ad4df1] flex items-center gap-2"
            }
            onClick={() => setDrawerOpen(false)}
          >
            <CgProfile /> My Profile
          </NavLink>
          <NavLink
            to="/user-dashboard/addPost"
            className={({ isActive }) =>
              isActive
                ? "border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1] flex items-center gap-2"
                : "px-2 py-1 text-[#ad4df1] flex items-center gap-2"
            }
            onClick={() => setDrawerOpen(false)}
          >
            <MdPostAdd /> Add Post
          </NavLink>
          <NavLink
            to="/user-dashboard/myPosts"
            className={({ isActive }) =>
              isActive
                ? "border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1] flex items-center gap-2"
                : "px-2 py-1 text-[#ad4df1] flex items-center gap-2"
            }
            onClick={() => setDrawerOpen(false)}
          >
            <FaRegNewspaper /> My Posts
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
      <main
        className=" p-6 flex-1 bg-white min-h-screen"
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
