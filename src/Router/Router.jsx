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
import PostDetails from "../page/PostDetails/PostDetails";
import CommentReportPage from "../page/CommentReportPage/CommentReportPage";
import Loading from "../page/Loading/Loading";
import ErrorPage from "../page/ErrorPage/ErrorPage";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Loading></Loading>,
        Component: Home
      },
      {
        path: 'membership',
        hydrateFallbackElement: <Loading></Loading>,
        Component: Membership
      },
      {
        path: "/post/:id",
        hydrateFallbackElement: <Loading></Loading>,
        Component: PostDetails
      },


    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: 'register',
        hydrateFallbackElement: <Loading></Loading>,
        Component: Register
      },
      {
        path: 'login',
        hydrateFallbackElement: <Loading></Loading>,
        Component: Login
      },
    ]
  },

  {
  path: "/user-dashboard",
  element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
  errorElement: <ErrorPage></ErrorPage>,
  hydrateFallbackElement: <Loading></Loading>,
  children: [
    { index: true, Component: MyProfile },
    { path: "addPost", Component: AddPost },
    { path: "myPosts", Component: MyPosts },
    { path: "comments/:postId", Component: CommentReportPage } 
  ]
},


  {
    path: "/admin-dashboard",
    hydrateFallbackElement: <Loading></Loading>,
    errorElement: <ErrorPage></ErrorPage>,
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