import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../page/Home/Home";
import AuthLayout from "../RootLayout/AuthLayout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import userDashboard from "../page/userDashboard/DashboardLayout";
import MyProfile from "../page/userDashboard/MyProfile";
import AddPost from "../page/userDashboard/AddPost";
import MyPosts from "../page/userDashboard/MyPosts";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
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
      }
    ]
  },
 {
  path: "/user-dashboard",
  Component: userDashboard,
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
}

]);