import {
  createBrowserRouter
} from "react-router-dom";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import DashboardLayout from "../Layout/DashBoardLayout";
import MainLayout from "../LayOut/MainLayout";
import AppliedTrainerDetails from "../OthersComponent/AppliedTrainerDetails";
import BeATrainer from "../OthersComponent/BeATrainer";
import TrainerDetails from "../OthersComponent/TrainerDetails";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AllTrainer from "../Pages/AllTrainer/AllTrainer";
import Community from "../Pages/Community/Community";
import AddClass from "../Pages/Dashboard/AddClass";
import AppliedTrainer from "../Pages/Dashboard/AppliedTrainer";
import Balance from "../Pages/Dashboard/Balance";
import Subscribers from "../Pages/Dashboard/Subscribers";
import Trainers from "../Pages/Dashboard/Trainers";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/UserProfile/UserProfile";
import PrivateRoutes from "./PrivateRoutes";


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
          path: "details/:id",
          element: <TrainerDetails></TrainerDetails>
        },
        {
          path: "become-a-trainer",
          element: <BeATrainer></BeATrainer>
        },
        {
          path: "all-classes",
          element: <AllClasses></AllClasses>,
        },
        {
          path: "community",
          element: <PrivateRoutes>
            <Community></Community>
          </PrivateRoutes>,
        },
        {
          path: "profile",
          element: <PrivateRoutes>
            <UserProfile></UserProfile>
          </PrivateRoutes>,
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
    {
      path: "dashboard",
      element: <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>,
      children:[
        // admin DashBoard
        {
          path: "allTrainer",
          element: <Trainers></Trainers>
        },
        {
          path: "appliedTrainer",
          element: <AppliedTrainer></AppliedTrainer>
        },
        {
          path: "trainer-details/:id",
          element: <AppliedTrainerDetails></AppliedTrainerDetails>
        },
        {
          path: "balance",
          element: <Balance></Balance>
        },
        {
          path: "addClass",
          element: <AddClass></AddClass>,
        },
        {
          path: "subscriber",
          element: <Subscribers></Subscribers>
        }
      ]
    }
  ]);