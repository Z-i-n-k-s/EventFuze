import React, { useState } from "react";
import {
  FaCog,
  FaSignOutAlt,
  FaUserCog,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import ROLE from "../../common/role";
import ProfileDisplay from "./ProfileDisplay";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [profileDisplay, setProfileDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark class exists on document, but default to light theme
    return document.documentElement.classList.contains("dark");
  });

  const handelLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message || "Logged out successfully");
        dispatch(setUserDetails(null));
      } else if (data.error) {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Logout failed. Try again!");
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navigationLinks = [
    { path: "/", label: "Home" },
    { path: "/clubs", label: "Clubs" },
    { path: "/events", label: "Events" },
  ];

  return (
    <>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm sticky top-0 z-40">
        <div className="h-full container mx-auto flex items-center px-4 lg:px-6 justify-between max-w-7xl">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <Logo w={170} h={60} />
          </Link>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            {/* User Section */}
            {user?._id ? (
              <div className="relative">
                <button
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 group"
                  onClick={() => setMenuDisplay((prev) => !prev)}
                >
                  <div className="relative">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200 group-hover:ring-green-300 transition-all duration-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center ring-2 ring-slate-200 group-hover:ring-green-300 transition-all duration-200">
                        <FaUserLarge className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-200">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {menuDisplay && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setMenuDisplay(false)}
                    ></div>

                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                      {/* User Info */}
                      <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-200 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
                          onClick={() => {
                            setMenuDisplay(false);
                            setTimeout(() => setProfileDisplay(true), 100);
                          }}
                        >
                          <FaUserCog className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Profile Settings
                          </span>
                        </button>

                        <Link
                          to="/my-events"
                          className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
                          onClick={() => setMenuDisplay(false)}
                        >
                          📅 <span className="text-sm font-medium">My Events</span>
                        </Link>

                        <Link
                          to="/registered-events"
                          className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
                          onClick={() => setMenuDisplay(false)}
                        >
                          ✅{" "}
                          <span className="text-sm font-medium">
                            Registered Events
                          </span>
                        </Link>

                        {user?.role === ROLE.ADMIN && (
                          <Link
                            to="/admin-panel/all-users"
                            className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
                            onClick={() => setMenuDisplay(false)}
                          >
                            <FaCog className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              Admin Panel
                            </span>
                          </Link>
                        )}

                        <div className="border-t border-slate-100 dark:border-slate-700 my-2"></div>

                        {/* Sign Out */}
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-700/30 transition-colors duration-150"
                          onClick={() => {
                            handelLogout();
                            setMenuDisplay(false);
                          }}
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all font-medium text-sm shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl text-green-600 border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Dark/Light Mode Toggle - Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FaMoon className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <FaTimes className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <FaBars className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-30">
            <div className="container mx-auto px-4 py-4">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-3 mb-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive(link.path)
                        ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
                        : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* User Section */}
              {user?._id ? (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-200 dark:ring-slate-700"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <FaUserLarge className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150 rounded-lg"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setTimeout(() => setProfileDisplay(true), 100);
                      }}
                    >
                      <FaUserCog className="w-4 h-4" />
                      <span className="text-sm font-medium">Profile Settings</span>
                    </button>

                    <Link
                      to="/my-events"
                      className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      📅 <span className="text-sm font-medium">My Events</span>
                    </Link>

                    <Link
                      to="/registered-events"
                      className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150 rounded-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ✅ <span className="text-sm font-medium">Registered Events</span>
                    </Link>

                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-users"
                        className="flex items-center gap-3 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150 rounded-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <FaCog className="w-4 h-4" />
                        <span className="text-sm font-medium">Admin Panel</span>
                      </Link>
                    )}

                    <button
                      className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-700/30 transition-colors duration-150 rounded-lg mt-2"
                      onClick={() => {
                        handelLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      <span className="text-sm font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-3 rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all font-medium text-sm shadow-sm text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-3 rounded-xl text-green-600 border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all font-medium text-sm text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Profile Modal */}
      {profileDisplay && user && (
        <ProfileDisplay
          onClose={() => setProfileDisplay(false)}
          name={user?.name}
          email={user?.email}
          role={user?.role}
          userId={user?._id}
          profilePic={user?.profilePic}
          callFunc={handelLogout}
        />
      )}
    </>
  );
};

export default Header;