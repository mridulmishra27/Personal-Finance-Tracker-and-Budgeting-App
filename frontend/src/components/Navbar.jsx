import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { usertoken, setUserToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const logout = () => {
    setUserToken(false);
    localStorage.removeItem("usertoken");
  };

  // Handler to navigate and close menu on mobile
  const handleMobileNav = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400">
      {/* Logo */}
      {/* CHANGED: Adjusted width from w-14 to w-12 for a sleeker look */}
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Navigation */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <li className="py-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? " border-b-2 border-blue-600 pb-1" : ""
            }
          >
            HOME
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? " border-b-2 border-blue-600 pb-1" : ""
            }
          >
            DOCTORS
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? " border-b-2 border-blue-600 pb-1" : ""
            }
          >
            ABOUT
          </NavLink>
        </li>
        <li className="py-1">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? " border-b-2 border-blue-600 pb-1" : ""
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>

      {/* Register Button & Profile */}
      <div className="flex items-center gap-4">
        {usertoken && userData ? (
          <div className="relative group flex cursor-pointer items-center gap-2">
            <img className="w-8 rounded-full" src={userData.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 z-20 hidden pt-14 text-base font-medium text-gray-600 group-hover:block">
              <div className="flex min-w-48 flex-col gap-4 rounded bg-stone-100 p-4">
                <p
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="group relative z-10 flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-gray-50 bg-gray-50 px-4 py-2 text-md shadow-xl backdrop-blur-md isolation-auto before:absolute before:-left-full before:aspect-square before:w-full before:rounded-full before:bg-emerald-500 before:transition-all before:duration-700 before:hover:left-0 before:hover:w-full before:hover:scale-150 before:hover:duration-700 hover:text-gray-50 lg:font-semibold before:-z-10"
          >
            Register Now
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer md:hidden"
          src={assets.menu_icon}
          alt="menu icon"
        />
        {/* Mobile Menu */}
        <div
          className={`${
            showMenu
              ? "fixed top-0 right-0 bottom-0 z-20 flex w-full flex-col overflow-y-auto bg-white/70 p-6 backdrop-blur-lg"
              : "h-0 w-0 overflow-hidden"
          } md:hidden`}
        >
          <div className="mb-8 flex items-center justify-between">
            {/* FIXED: Added styling and navigation to the mobile menu logo */}
            <img
              onClick={() => handleMobileNav("/")}
              className="w-20 cursor-pointer"
              src={assets.logo}
              alt="logo"
            />
            <img
              onClick={() => setShowMenu(false)}
              className="h-6 w-6 cursor-pointer"
              src={assets.cross_icon}
              alt="close menu"
            />
          </div>
          <ul className="flex flex-col items-center gap-6 text-lg font-semibold text-gray-800">
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/"
              className={({ isActive }) =>
                isActive ? " border-b-2 border-blue-600 pb-1" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/doctors"
              className={({ isActive }) =>
                isActive ? " border-b-2 border-blue-600 pb-1" : ""
              }
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/about"
              className={({ isActive }) =>
                isActive ? " border-b-2 border-blue-600 pb-1" : ""
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => setShowMenu(false)}
              to="/contact"
              className={({ isActive }) =>
                isActive ? " border-b-2 border-blue-600 pb-1" : ""
              }
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;