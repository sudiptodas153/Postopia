import { Outlet, NavLink } from 'react-router'; 

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav className="flex md:flex-col justify-around md:justify-start gap-4 md:gap-2">
          <NavLink to="/" >Home</NavLink>
          <NavLink to="/user-dashboard" >My Profile</NavLink>
          <NavLink to="/user-dashboard/addPost">Add Post</NavLink>
          <NavLink to="/user-dashboard/myPosts">My Posts</NavLink>
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
