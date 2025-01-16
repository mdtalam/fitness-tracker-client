import {
  createBrowserRouter
} from "react-router-dom";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import MainLayout from "../LayOut/MainLayout";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AllTrainer from "../Pages/AllTrainer/AllTrainer";
import Community from "../Pages/Community/Community";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/UserProfile/UserProfile";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "all-trainer",
          element: <AllTrainer></AllTrainer>,
        },
        {
          path: "all-classes",
          element: <AllClasses></AllClasses>,
        },
        {
          path: "community",
          element: <Community></Community>,
        },
        {
          path: "dashboard",
          element: <Dashboard></Dashboard>,
        },
        {
          path: "profile",
          element: <UserProfile></UserProfile>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: '/sign-up',
          element: <SignUp></SignUp>
        }
      ]
    },
  ]);