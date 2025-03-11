import {
  Button,
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import avatarImg from "../../src/assets/avatar.jpg";
import useAuth from "../Hooks/useAuth";
import { BorderBeam } from "../components/magicui/border-beam";

const NavMenu = () => {
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center px-2 py-1 rounded ${
              isActive
                ? "bg-secondary text-primary"
                : "text-secondary hover:underline hover:underline-offset-8"
            }`
          }
        >
          Home
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="all-trainer"
          className={({ isActive }) =>
            `flex items-center px-2 py-1 rounded ${
              isActive
                ? "bg-secondary text-primary"
                : "text-secondary hover:underline hover:underline-offset-8"
            }`
          }
        >
          All Trainer
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="all-classes"
          className={({ isActive }) =>
            `flex items-center px-2 py-1 rounded ${
              isActive
                ? "bg-secondary text-primary"
                : "text-secondary hover:underline hover:underline-offset-8"
            }`
          }
        >
          All Classes
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="community"
          className={({ isActive }) =>
            `flex items-center px-2 py-1 rounded ${
              isActive
                ? "bg-secondary text-primary"
                : "text-secondary hover:underline hover:underline-offset-8"
            }`
          }
        >
          Community
        </NavLink>
      </Typography>
      {user && (
        <Typography as="li" variant="small" className="p-1 font-normal">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `flex items-center px-2 py-1 rounded ${
                isActive
                  ? "bg-secondary text-primary"
                  : "text-secondary hover:underline hover:underline-offset-8"
              }`
            }
          >
            Dashboard
          </NavLink>
        </Typography>
      )}
      {user && (
        <Typography as="li" variant="small" className="p-1 font-normal">
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center px-2 py-1 rounded ${
                isActive
                  ? "bg-secondary text-primary"
                  : "text-secondary hover:underline hover:underline-offset-8"
              }`
            }
          >
            Profile
          </NavLink>
        </Typography>
      )}
    </ul>
  );

  return (
    <div>
      <Navbar
        className={`fixed top-0 z-10 h-max max-w-full border-none rounded-none py-2 lg:px-8 lg:py-4 bg-primary transition-opacity duration-300 ${
          isScrolled ? "opacity-95" : "opacity-100"
        }`}
      >
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto px-4">
          <Typography
            as="a"
            href="#"
            className="mr-4 text-xl cursor-pointer py-1.5 font-bold text-secondary"
          >
            FitFusion
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <Link to="/profile">
                  <img
                    src={user && user?.photoURL ? user.photoURL : avatarImg}
                    alt="Profile"
                    className="hidden lg:inline-block w-10 h-10 rounded-full border-2 border-secondary object-cover"
                  />
                </Link>
                {/* Sign Out Button */}
                <Button
                  onClick={handleLogOut}
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block bg-secondary text-primary hover:text-black"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <Link to="/login">
                  <Button
                    variant="text"
                    size="sm"
                    className="relative overflow-hidden hidden lg:inline-block text-primary bg-white hover:text-white"
                  >
                    Log In
                    <BorderBeam
                      duration={8} size={40}
                    />
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    variant="text"
                    size="sm"
                    className="relative overflow-hidden hidden lg:inline-block bg-secondary text-primary hover:text-white"
                  >
                    Sign Up
                    <BorderBeam
                      duration={8} size={40} reverse
                    />
                  </Button>
                </Link>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-secondary hover:text-primary lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {/* Profile Image */}
                <Link to="/profile">
                  <img
                    src={user && user?.photoURL ? user.photoURL : avatarImg}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-secondary object-cover"
                  />
                </Link>
                {/* Sign Out Button */}
                <Button
                  onClick={handleLogOut}
                  variant="text"
                  size="sm"
                  className="relative overflow-hidden bg-secondary text-white hover:text-black"
                >
                  
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-x-1">
                <Link to="/login">
                  <Button
                    fullWidth
                    variant="text"
                    size="sm"
                    className="relative overflow-hidden text-primary bg-white hover:text-white"
                  >
                    <span>Log In</span>
                    <BorderBeam
                      duration={8} size={40}
                    />
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    fullWidth
                    variant="gradient"
                    size="sm"
                    className="relative overflow-hidden bg-secondary text-primary hover:text-white"
                  >
                    <span>Sign Up</span>
                    <BorderBeam
                      duration={8} size={40} reverse
                    />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NavMenu;
