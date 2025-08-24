import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Shared/Login";
import ForgotPassword from "../pages/Shared/ForgotPassword";
import ResetPassword from "../pages/Shared/ResetPassword";
import SignUP from "../pages/Shared/SignUP";

import Home from "../pages/user/Home";
import RegisterEvent from "../pages/user/RegisterEvent";
import AllEvents from "../pages/user/AllEvents";
import ClubDetails from "../pages/user/ClubDetails";
import JoinForm from "../components/user/JoinForm";
import MyEvents from "../pages/user/MyEvents";

import Adminpanel from "../pages/Admin/Adminpanel";
import AllUsers from "../pages/Admin/AllUsers";
import Analytics from "../pages/Admin/Analytics";
import ClubManagement from "../pages/Admin/ClubManagement";
import EventManagement from "../pages/Admin/EventManagement";

import ClubAdminPanel from "../pages/Club-Admin/ClubAdminPanel";
import ClubDashboard from "../pages/Club-Admin/ClubDashboard";
import ClubMembers from "../pages/Club-Admin/ClubMembers";
import EventMangement from "../pages/Club-Admin/EventMangement";
import ClubMilstones from "../pages/Club-Admin/ClubMilstones";

// Guest route wrapper
const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.user);
  return user ? <Navigate to="/home" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public routes (accessible by anyone)
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "all-events", element: <AllEvents /> },
      { path: "/clubs/:clubId", element: <ClubDetails /> },
      { path: "joinform", element: <JoinForm /> },

      // Guest routes
      { path: "login", element: <GuestRoute><Login /></GuestRoute> },
      { path: "forgot-password", element: <GuestRoute><ForgotPassword /></GuestRoute> },
      { path: "reset-password/:token", element: <GuestRoute><ResetPassword /></GuestRoute> },
      { path: "sign-up", element: <GuestRoute><SignUP /></GuestRoute> },

      // Protected routes (require login)
      { path: "my-events", element: <ProtectedRoute><MyEvents /></ProtectedRoute> },
      { path: "register-event", element: <ProtectedRoute><RegisterEvent /></ProtectedRoute> },

      // Admin routes
      {
        path: "admin-panel",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Adminpanel />
          </ProtectedRoute>
        ),
        children: [
          { path: "all-users", element: <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><AllUsers /></ProtectedRoute> },
          { path: "event-management", element: <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><EventManagement /></ProtectedRoute> },
          { path: "club-management", element: <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><ClubManagement /></ProtectedRoute> },
          { path: "analytics", element: <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}><Analytics /></ProtectedRoute> },
        ],
      },

      // Club Admin routes
      {
        path: "club-admin-panel",
        element: (
          <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}>
            <ClubAdminPanel />
          </ProtectedRoute>
        ),
        children: [
          { path: "manage-events", element: <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}><EventMangement /></ProtectedRoute> },
          { path: "club-members", element: <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}><ClubMembers /></ProtectedRoute> },
          { path: "club-dashboard", element: <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}><ClubDashboard /></ProtectedRoute> },
          { path: "club-milestones", element: <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}><ClubMilstones /></ProtectedRoute> },
        ],
      },
    ],
  },
]);

export default router;
