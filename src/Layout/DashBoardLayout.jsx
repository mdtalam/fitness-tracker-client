import { Bars3Icon, PowerIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography
} from "@material-tailwind/react";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBookmark, FaHome } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { LuSquareActivity } from "react-icons/lu";
import {
  MdAccountBalance,
  MdAddBusiness,
  MdForum,
  MdGroupAdd,
  MdManageAccounts,
  MdUnsubscribe,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const [role, isLoading] = useRole();
  const [open, setOpen] = useState(false);
  const { logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .then((error) => console.log(error));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-64" : "w-16"
        } bg-primary min-h-full duration-300 flex flex-col`}
      >
        {/* Toggle Button */}
        <div className="flex justify-end p-2">
          <IconButton
            variant="text"
            color="secondary"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </IconButton>
        </div>

        {/* Logo */}
        <div
          className={`flex items-center p-4 ${
            open ? "justify-start" : "justify-center"
          }`}
        >
          <Typography
            variant="h5"
            className={`text-secondary font-bold ${open ? "block" : "hidden"}`}
          >
            FitFusion
          </Typography>
        </div>
        {/* admin menu */}
        {/* Sidebar Items */}
        <List className="flex-1">
          {role === "admin" && (
            <>
              <ListItem>
                <ListItemPrefix>
                  <MdUnsubscribe className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="subscriber"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Subscribers
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <HiUserGroup className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="allTrainer"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  All Trainer
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <MdGroupAdd className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="appliedTrainer"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Applied Trainer
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <MdAccountBalance className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="balance"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Balance
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <SiGoogleclassroom className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="addClass"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Add New Class
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <MdForum className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="addForum"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Add new Forum
                </Link>
              </ListItem>
            </>
          )}

          {/* trainer Dashboard */}

          {role === "trainer" && (
            <>
              <ListItem>
                <ListItemPrefix>
                  <MdManageAccounts className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="manageSlots"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Manage Slots
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <MdAddBusiness className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="addSlot"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Add New Slot
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <MdForum className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="addForum"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Add new Forum
                </Link>
              </ListItem>
            </>
          )}

          {/* Member Dashboard */}

          {role === "member" && (
            <>
              <ListItem>
                <ListItemPrefix>
                  <LuSquareActivity className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="activityLog"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Activity Log
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <CgProfile className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="profile"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Profile
                </Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <FaBookmark className="h-5 w-5 text-secondary" />
                </ListItemPrefix>
                <Link
                  to="bookedTrainer"
                  className={`text-secondary duration-300 ${
                    open ? "block" : "hidden"
                  }`}
                >
                  Booked Trainer
                </Link>
              </ListItem>
            </>
          )}

          <div className="my-4 border-t border-gray-300"></div>
          <ListItem>
            <ListItemPrefix>
              <FaHome className="h-5 w-5 text-secondary" />
            </ListItemPrefix>
            <Link
              to="/"
              className={`text-secondary duration-300 ${
                open ? "block" : "hidden"
              }`}
            >
              Home
            </Link>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-secondary" />
            </ListItemPrefix>
            <button
              onClick={handleLogOut}
              className={`text-secondary duration-300 ${
                open ? "block" : "hidden"
              }`}
            >
              Log Out
            </button>
          </ListItem>
        </List>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <Typography variant="h4" color="blue-gray">
          Dashboard Content
        </Typography>
        <p className="pb-4">
          <Outlet></Outlet>
        </p>
      </div>
    </div>
  );
};

export default DashboardLayout;
