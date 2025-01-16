import {
    Button,
    IconButton,
    MobileNav,
    Navbar,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavMenu = () => {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
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
                ? "bg-secondary text-white"
                : "text-secondary hover:text-white"
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
                ? "bg-secondary text-white"
                : "text-secondary hover:text-white"
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
                ? "bg-secondary text-white"
                : "text-secondary hover:text-white"
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
                ? "bg-secondary text-white"
                : "text-secondary hover:text-white"
            }`
          }
        >
          Community
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `flex items-center px-2 py-1 rounded ${
              isActive
                ? "bg-secondary text-white"
                : "text-secondary hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" className="p-1 font-normal">
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `flex items-center px-2 py-1 rounded ${
              isActive
                ? "bg-secondary text-white"
                : "text-secondary hover:text-white"
            }`
          }
        >
          Profile
        </NavLink>
      </Typography>
    </ul>
  );

  return (
    <div>
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-primary">
        <div className="flex items-center justify-between">
          <Typography
            as="a"
            href="#"
            className="mr-4 text-xl cursor-pointer py-1.5 font-bold text-secondary"
          >
            FitFusion
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Link to="/login">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block text-secondary bg-white hover:text-white"
                >
                  <span>Log In</span>
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button
                  variant="text"
                  size="sm"
                  className="hidden lg:inline-block bg-secondary text-white hover:text-black"
                >
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
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
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className="text-secondary hover:text-primary"
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className="bg-secondary text-primary hover:bg-primary hover:text-secondary"
            >
              <span>Sign Up</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default NavMenu;
