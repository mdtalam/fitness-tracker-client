import {
  createBrowserRouter
} from "react-router-dom";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import DashboardLayout from "../Layout/DashBoardLayout";
import MainLayout from "../LayOut/MainLayout";
import AppliedTrainerDetails from "../OthersComponent/AppliedTrainerDetails";
import BeATrainer from "../OthersComponent/BeATrainer";
import ErrorPage from "../OthersComponent/ErrorPage";
import TrainerDetails from "../OthersComponent/TrainerDetails";
import AllClasses from "../Pages/AllClasses/AllClasses";
import AllTrainer from "../Pages/AllTrainer/AllTrainer";
import Community from "../Pages/Community/Community";
import ActivityLog from "../Pages/Dashboard/ActivityLog";
import AddClass from "../Pages/Dashboard/AddClass";
import AddForum from "../Pages/Dashboard/AddForum";
import AddNewSlot from "../Pages/Dashboard/AddNewSlot";
import AppliedTrainer from "../Pages/Dashboard/AppliedTrainer";
import Balance from "../Pages/Dashboard/Balance";
import BookedTrainer from "../Pages/Dashboard/BookedTrainer";
import ManageSlots from "../Pages/Dashboard/ManageSlots";
import Profile from "../Pages/Dashboard/Profile";
import Statistics from "../Pages/Dashboard/Statistics";
import Subscribers from "../Pages/Dashboard/Subscribers";
import Trainers from "../Pages/Dashboard/Trainers";
import Home from "../Pages/Home/Home";
import UserProfile from "../Pages/UserProfile/UserProfile";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import TrainerRoute from "./TrainerRoute";


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
          element: <PrivateRoutes><BeATrainer></BeATrainer></PrivateRoutes>
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
          index:true,
          element: <PrivateRoutes>
            <Statistics></Statistics>
          </PrivateRoutes>
        },
        {
          path: "allTrainer",
          element: <PrivateRoutes>
            <AdminRoute>
              <Trainers></Trainers>
              </AdminRoute>
          </PrivateRoutes>
        },
        {
          path: "appliedTrainer",
          element: <PrivateRoutes>
            <AdminRoute>
            <AppliedTrainer></AppliedTrainer>
            </AdminRoute>
          </PrivateRoutes>
        },
        {
          path: "trainer-details/:id",
          element: <PrivateRoutes>
            <AdminRoute>
            <AppliedTrainerDetails></AppliedTrainerDetails>
            </AdminRoute>
          </PrivateRoutes>
        },
        {
          path: "balance",
          element: <PrivateRoutes>
            <AdminRoute>
            <Balance></Balance>
            </AdminRoute>
          </PrivateRoutes>
        },
        {
          path: "addClass",
          element: <PrivateRoutes>
          <AdminRoute>
          <AddClass></AddClass>
          </AdminRoute>
        </PrivateRoutes>,
        },
        {
          path: "subscriber",
          element: <PrivateRoutes><AdminRoute>
            
            <Subscribers></Subscribers>
            </AdminRoute></PrivateRoutes>
          
          
        },
        // admin and trainer route
        {
          path: "addForum",
          element: <PrivateRoutes>
            <AddForum></AddForum>
            </PrivateRoutes>
        },
        // trainer routes
        {
          path: "manageSlots",
          element: <PrivateRoutes>
            <TrainerRoute>
            <ManageSlots></ManageSlots>
            </TrainerRoute>
          </PrivateRoutes>
        },
        {
          path: "addSlot",
          element: <PrivateRoutes>
          <TrainerRoute>
          <AddNewSlot></AddNewSlot>
          </TrainerRoute>
        </PrivateRoutes>
        },
        {
          path: "activityLog",
          element: <PrivateRoutes>
            <ActivityLog></ActivityLog>
          </PrivateRoutes>
        },
        {
          path: "profile",
          element: <PrivateRoutes>
            <Profile></Profile>
          </PrivateRoutes>
        },
        {
          path: "bookedTrainer",
          element: <PrivateRoutes>
            <BookedTrainer></BookedTrainer>
          </PrivateRoutes>
        },
      ]
    },
    {
      path: "*",
      element: <ErrorPage></ErrorPage>
    },
  ]);