import { CgProfile } from 'react-icons/cg';
import { FaHome, FaRegNewspaper } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';
import { Outlet, NavLink } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto mt-5 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border text-[#ad4df1] rounded-lg border-[#ad4df1] p-4">
        <h2 className="text-xl md:text-3xl  font-bold mb-4">Postopia</h2>
        <nav className="flex md:flex-col justify-around md:justify-start gap-4 md:gap-2">
          <NavLink to="/" ><span className='flex items-center gap-2 px-2'><FaHome />Home</span></NavLink>
          <NavLink
            to="/user-dashboard"
             end
            className={({ isActive }) =>
              isActive
                ? 'border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1]'
                : 'px-2 py-1 text-[#ad4df1]'
            }
          >
            <span className="flex items-center gap-2">
              <CgProfile /> My Profile
            </span>
          </NavLink>

          <NavLink
            to="/user-dashboard/addPost"
            className={({ isActive }) =>
              isActive
                ? 'border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1]'
                : 'px-2 py-1 text-[#ad4df1]'
            }
          >
            <span className="flex items-center gap-2">
              <MdPostAdd /> Add Post
            </span>
          </NavLink>

          <NavLink
            to="/user-dashboard/myPosts"
            className={({ isActive }) =>
              isActive
                ? 'border border-[#ad4df1] rounded px-2 py-1 text-[#ad4df1]'
                : 'px-2 py-1 text-[#ad4df1]'
            }
          >
            <span className="flex items-center gap-2">
              <FaRegNewspaper /> My Posts
            </span>
          </NavLink>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
