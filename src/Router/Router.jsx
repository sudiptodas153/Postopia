import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../page/Home/Home";
import AuthLayout from "../RootLayout/AuthLayout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import userDashboard from "../page/userDashboard/userDashboard";
import userProfile from "../page/userProfile/userProfile";


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
        path: 'user-profile',
        Component: userProfile
      },
      {
        path: 'login',
        Component: Login
      }
    ]
  },
]);