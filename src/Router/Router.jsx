import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../page/Home/Home";
import AuthLayout from "../RootLayout/AuthLayout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
// import userDashboard from "../page/userDashboard/DashboardLayout";
import MyProfile from "../page/userDashboard/MyProfile";
import AddPost from "../page/userDashboard/AddPost";
import MyPosts from "../page/userDashboard/MyPosts";
import PrivateRoute from "../Routes/PrivateRoute";
import DashboardLayout from "../page/userDashboard/DashboardLayout";
import Membership from "../page/Membership/Membership";
import AdminProfile from "../page/DashboardLayout/AdminProfile";
import ManageUsers from "../page/DashboardLayout/ManageUsers";
import ReportedActivities from "../page/DashboardLayout/ReportedActivities";
import MakeAnnouncement from "../page/DashboardLayout/MakeAnnouncement";
import AdminDashboardLayout from "../page/DashboardLayout/AdminDashboardLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'membership',
        Component: Membership
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
    ]
  },
  {
    path: "/user-dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        Component: MyProfile,
      },
      {
        path: "addPost",
        Component: AddPost,
      },
      {
        path: "myPosts",
        Component: MyPosts,
      }
    ]
  },

  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminDashboardLayout></AdminDashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: AdminProfile,
      },
      {
        path: "manageUsers",
        Component: ManageUsers,
      },
      {
        path: "reports",
        Component: ReportedActivities,
      },
      {
        path: "announcement",
        Component: MakeAnnouncement,
      }
    ]
  }



]);