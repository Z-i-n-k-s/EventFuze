import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaUniversity,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { FaChartBar } from "react-icons/fa6";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {ROLE} from "../../common/role";

const Adminpanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [tooltip, setTooltip] = useState({
    text: "",
    top: 0,
    left: 0,
    visible: false,
  });

  useEffect(() => {
    if (user?.role !== ROLE.SUPER_ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  const navItems = [
    { name: "All Users", icon: <FaUsers size={20} />, path: "all-users" },
    {
      name: "Event Management",
      icon: <FaCalendarAlt size={20} />,
      path: "event-management",
    },
    {
      name: "Club Management",
      icon: <FaUniversity size={20} />,
      path: "club-management",
    },
    { name: "Analytics", icon: <FaChartBar size={20} />, path: "analytics" },
  ];

  const showTooltip = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text,
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
      visible: true,
    });
  };

  const hideTooltip = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white/80 backdrop-blur-xl shadow-2xl flex flex-col fixed h-full border-r border-white/20 z-40"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
        }}
      >
        {/* Profile Section with Collapse Icon */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/50 bg-gradient-to-r from-blue-600/5 to-indigo-600/5">
          <div className="flex items-center gap-3">
            {user?.profilePic ? (
              <div className="relative">
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200/50 shadow-lg"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
            ) : (
              <div className="relative">
                <FaUserCircle className="text-4xl text-slate-400" />
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
            )}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <h2 className="text-sm font-semibold capitalize text-slate-800">
                    {user?.name}
                  </h2>
                  <span className="text-xs mt-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium shadow-sm">
                    {user?.role}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Collapse/Expand Icon with Tooltip */}
          <div className="relative group">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2.5 rounded-xl hover:bg-slate-100/80 transition-all duration-200 text-slate-500 hover:text-slate-700 hover:shadow-md"
            >
              {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
            {!isOpen && (
              <span className="absolute left-12 top-1/2 -translate-y-1/2 z-50 hidden group-hover:flex whitespace-nowrap bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl">
                Expand Sidebar
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800 rotate-45"></div>
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3 overflow-y-auto relative">
          {navItems.map((item, index) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <div key={index} className="relative group">
                <Link
                  to={item.path}
                  onMouseEnter={(e) => !isOpen && showTooltip(e, item.name)}
                  onMouseLeave={hideTooltip}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25 transform scale-[1.02]"
                      : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900 hover:shadow-md hover:transform hover:scale-[1.01]"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-2xl"></div>
                  )}
                  <div
                    className={`relative z-10 ${
                      isOpen ? "" : "flex justify-center w-full"
                    } transition-transform duration-200 ${
                      isActive ? "transform scale-110" : "group-hover:scale-105"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium relative z-10"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Footer branding */}
        <div className="p-4 border-t border-slate-200/50">
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="text-xs text-slate-400 font-medium">
                  Admin Dashboard
                </p>
                <div className="mt-1 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto w-16"></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Tooltip */}
      {tooltip.visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed z-50 bg-slate-800/95 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg shadow-2xl pointer-events-none border border-slate-700/50"
          style={{
            top: tooltip.top,
            left: tooltip.left,
            transform: "translateY(-50%)",
          }}
        >
          {tooltip.text}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800/95 rotate-45 border-l border-b border-slate-700/50"></div>
        </motion.div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 p-8 overflow-auto ${
          isOpen ? "ml-72" : "ml-20"
        }`}
      >
        <div className="bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl p-8 min-h-full border border-white/20 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

          {/* Content container with relative positioning */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Adminpanel;
