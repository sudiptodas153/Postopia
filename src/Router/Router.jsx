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
import About from "../page/About/About";
import Leaderboard from "../page/Leaderboard/Leaderboard";
import AdminRoutes from "../Routes/AdminRoutes";
import ForbiddenPage from "../page/ForbiddenPage/ForbiddenPage";


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
        element: <PrivateRoute><Membership></Membership></PrivateRoute>,
      },
      {
        path: "/post/:id",
        hydrateFallbackElement: <Loading></Loading>,
        Component: PostDetails
      },
      {
        path: "top",
        hydrateFallbackElement: <Loading></Loading>,
        Component: Leaderboard
      },
      {
        path: "about",
        hydrateFallbackElement: <Loading></Loading>,
        Component: About
      },
      {
        path: "forbidden",
        hydrateFallbackElement: <Loading></Loading>,
        Component: ForbiddenPage
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
      {
        index: true,
        Component: MyProfile
        
      },
      {
        path: "addPost",
          element: <PrivateRoute><AddPost></AddPost></PrivateRoute>,
       
      },
      {
        path: "myPosts",
          element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>,
       
      },
      {
        path: "comments/:postId",
          element: <PrivateRoute><CommentReportPage></CommentReportPage></PrivateRoute>,
       
      }
    ]
  },

  // Admin

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
        element: <AdminRoutes><ManageUsers></ManageUsers></AdminRoutes>,
      },
      {
        path: "reports",
        element: <AdminRoutes><ReportedActivities></ReportedActivities></AdminRoutes>,

      },
      {
        path: "announcement",
        element: <AdminRoutes><MakeAnnouncement></MakeAnnouncement></AdminRoutes>,

      }
    ]
  }



]);