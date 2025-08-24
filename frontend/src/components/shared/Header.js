import React, { useState, useContext, useEffect } from "react";
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
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../../store/userSlice";
import { ThemeContext } from "../../context/ThemeContext";
import ProfileDisplay from "./ProfileDisplay";
import { ROLE } from "../../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [profileDisplay, setProfileDisplay] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubsDropdown, setClubsDropdown] = useState(false);
  const [clubs, setClubs] = useState([]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(SummaryApi.getAllClubs.url, {
          method: SummaryApi.getAllClubs.method,
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setClubs(data.data || []);
        } else {
          toast.error(data.message || "Failed to fetch clubs");
        }
      } catch (err) {
        toast.error("Error fetching clubs");
      }
    };

    fetchClubs();
  }, []);

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
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Logout failed. Try again!");
    }
  };

  // Function to handle club navigation with data
  const handleClubNavigation = (club) => {
    navigate(`/clubs/${club._id}`, {
      state: {
        clubData: club,
      },
    });
    setClubsDropdown(false);
    setMobileMenuOpen(false);
  };

  // For styling "Clubs ▼" as active when on any /clubs/* route (basename-safe)
  const clubsTopActive =
    location.pathname.includes("/clubs/") || location.pathname.endsWith("/clubs");

  return (
    <>
      <header className="h-16 shadow-xl bg-gray-200 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 backdrop-blur-sm sticky top-0 z-40 font-inter text-[15px]">
        <div className="h-full container mx-auto flex items-center px-4 lg:px-6 justify-between max-w-7xl">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <Logo w={170} h={60} />
          </Link>

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6 relative">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/all-events"
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400"
                  }`
                }
              >
                Events
              </NavLink>

              {/* Clubs Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setClubsDropdown((prev) => !prev)}
                  className={`font-medium transition-colors duration-200 flex items-center gap-1 ${
                    clubsTopActive
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400"
                  }`}
                >
                  Clubs ▼
                </button>

                {clubsDropdown && (
                  <>
                    {/* Close dropdown on outside click */}
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setClubsDropdown(false)}
                    ></div>

                    {/* Desktop Clubs Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-40">
                      {clubs.map((club) => (
                        <NavLink
                          key={club._id}
                          to={`/clubs/${club._id}`}
                          state={{ clubData: club }}
                          onClick={() => setClubsDropdown(false)}
                          className={({ isActive }) =>
                            `w-full text-left block px-5 py-3 text-[15px] border-b last:border-b-0 border-slate-200 dark:border-slate-700 transition-colors duration-200 ${
                              isActive
                                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-900/20"
                            }`
                          }
                        >
                          {club.name}
                        </NavLink>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </nav>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {theme === "dark" ? (
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
                  <span className="font-medium text-slate-900 dark:text-slate-200">
                    {user?.name}
                  </span>
                </button>
                {menuDisplay && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setMenuDisplay(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
                      <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700">
                        <p className="font-semibold text-slate-900 dark:text-slate-200 truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-150"
                          onClick={() => {
                            setMenuDisplay(false);
                            setTimeout(() => setProfileDisplay(true), 100);
                          }}
                        >
                          <FaUserCog className="w-4 h-4" />
                          <span className="font-medium">Profile Settings</span>
                        </button>
                        <NavLink
                          to="/my-events"
                          className={({ isActive }) =>
                            `w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${
                              isActive
                                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                : "text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400"
                            }`
                          }
                          onClick={() => setMenuDisplay(false)}
                        >
                          📅 <span className="font-medium">My Events</span>
                        </NavLink>
                        <NavLink
                          to="/register-event"
                          className={({ isActive }) =>
                            `w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${
                              isActive
                                ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                : "text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400"
                            }`
                          }
                          onClick={() => setMenuDisplay(false)}
                        >
                          ✅ <span className="font-medium">Registered Events</span>
                        </NavLink>
                        {user?.role === ROLE.SUPER_ADMIN && (
                          <NavLink
                            to="/admin-panel/all-users"
                            className={({ isActive }) =>
                              `w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${
                                isActive
                                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                  : "text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400"
                              }`
                            }
                            onClick={() => setMenuDisplay(false)}
                          >
                            <FaCog className="w-4 h-4" />
                            <span className="font-medium">Admin Panel</span>
                          </NavLink>
                        )}
                        {user?.role === ROLE.CLUB_ADMIN && (
                          <NavLink
                            to="/club-admin-panel/club-dashboard"
                            className={({ isActive }) =>
                              `w-full flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${
                                isActive
                                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                                  : "text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400"
                              }`
                            }
                            onClick={() => setMenuDisplay(false)}
                          >
                            <FaCog className="w-4 h-4" />
                            <span className="font-medium">Club Panel</span>
                          </NavLink>
                        )}
                        <div className="border-t border-slate-100 dark:border-slate-700 my-2"></div>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-700/30 transition-colors duration-150"
                          onClick={() => {
                            handelLogout();
                            setMenuDisplay(false);
                          }}
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          <span className="font-medium">Sign Out</span>
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
                  className="px-5 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all font-medium shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/sign-up"
                  className="px-5 py-2 rounded-xl text-green-600 border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
            >
              {theme === "dark" ? (
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-lg z-30 font-inter text-[15px]">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {/* User Section in Mobile */}
              {user?._id ? (
                <div className="flex flex-col gap-2 border-b border-slate-200 dark:border-slate-700 pb-4">
                  <div className="flex items-center gap-3">
                    {user?.profilePic ? (
                      <img
                        src={user?.profilePic}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                        <FaUserLarge className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-200">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    className="text-left font-medium py-2 px-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setTimeout(() => setProfileDisplay(true), 100);
                    }}
                  >
                    <FaUserCog className="inline-block mr-2" /> Profile Settings
                  </button>

                  <NavLink
                    to="/my-events"
                    className={({ isActive }) =>
                      `text-left font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    📅 My Events
                  </NavLink>

                  <NavLink
                    to="/register-event"
                    className={({ isActive }) =>
                      `text-left font-medium py-2 px-3 rounded-lg transition-colors ${
                        isActive
                          ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✅ Registered Events
                  </NavLink>

                  {user?.role === ROLE.SUPER_ADMIN && (
                    <NavLink
                      to="/admin-panel/all-users"
                      className={({ isActive }) =>
                        `text-left font-medium py-2 px-3 rounded-lg transition-colors ${
                          isActive
                            ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCog className="inline-block mr-2" /> Admin Panel
                    </NavLink>
                  )}

                  {user?.role === ROLE.CLUB_ADMIN && (
                    <NavLink
                      to="/club-admin-panel/club-dashboard"
                      className={({ isActive }) =>
                        `text-left font-medium py-2 px-3 rounded-lg transition-colors ${
                          isActive
                            ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <FaCog className="inline-block mr-2" /> Club Panel
                    </NavLink>
                  )}

                  <button
                    className="text-left font-medium py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-700/30"
                    onClick={() => {
                      handelLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <FaSignOutAlt className="inline-block mr-2" /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                  <Link
                    to="/login"
                    className="px-5 py-2 rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all font-medium shadow-sm w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-xl text-green-600 border border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all font-medium w-full text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="flex flex-col gap-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
                        : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </NavLink>

                {/* Mobile Clubs Menu */}
                <div className="flex flex-col gap-1">
                  <span className="font-medium px-3 py-2 text-slate-700 dark:text-slate-200">
                    Clubs
                  </span>
                  {clubs.map((club) => (
                    <NavLink
                      key={club._id}
                      to={`/clubs/${club._id}`}
                      state={{ clubData: club }}
                      className={({ isActive }) =>
                        `w-full text-left font-medium py-2 px-6 rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
                            : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`
                      }
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {club.name}
                    </NavLink>
                  ))}
                </div>

                <NavLink
                  to="/all-events"
                  className={({ isActive }) =>
                    `font-medium py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20"
                        : "text-slate-700 dark:text-slate-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Events
                </NavLink>
              </nav>
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
