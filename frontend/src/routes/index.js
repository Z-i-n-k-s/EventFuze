import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Adminpanel from "../pages/Admin/Adminpanel";

import ForgotPassword from "../pages/Shared/ForgotPassword";

import AllUsers from "../pages/Admin/AllUsers";
import Analytics from "../pages/Admin/Analytics";
import ClubManagement from "../pages/Admin/ClubManagement";
import EventManagement from "../pages/Admin/EventManagement";
import Login from "../pages/Shared/Login";
import ResetPassword from "../pages/Shared/ResetPassword"; // import
import SignUP from "../pages/Shared/SignUP";
import Home from "../pages/user/Home";
import ProtectedRoute from "./ProtectedRoute";

import JoinForm from "../components/user/JoinForm";
import ClubAdminPanel from "../pages/Club-Admin/ClubAdminPanel";
import ClubDashboard from "../pages/Club-Admin/ClubDashboard";
import ClubMembers from "../pages/Club-Admin/ClubMembers";
import EventMangement from "../pages/Club-Admin/EventMangement";
import AllEvents from "../pages/user/AllEvents";
import ClubDetails from "../pages/user/ClubDetails";

import ClubMilstones from "../pages/Club-Admin/ClubMilstones";

import MyEvents from "../pages/user/MyEvents";
import RegisterEvent from "../pages/user/RegisterEvent";


// Redirect component for root path
const RootRedirect = () => {
  const user = useSelector((state) => state?.user?.user);
  return <Navigate to={user ? "/home" : "/login"} replace />;
};

// Guest route wrapper
const GuestRoute = ({ children }) => {
  const user = useSelector((state) => state?.user?.user);
  if (user) {
    // Redirect logged-in users to home
    return <Navigate to="/home" replace />;
  }
  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <RootRedirect /> },

      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        ),
      },
      {
        path: "reset-password/:token",
        element: (
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        ),
      },
      {
        path: "sign-up",
        element: (
          <GuestRoute>
            <SignUP />
          </GuestRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "register-event",
        element: (
          <ProtectedRoute>
            <RegisterEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: "all-events",
        element: (
          <ProtectedRoute>
            <AllEvents />
          </ProtectedRoute>
        ),
      },

       { path: "my-events", element:<ProtectedRoute><MyEvents/></ProtectedRoute> },
      
       
      {path: "/clubs/:clubId", element: <ProtectedRoute><ClubDetails/></ProtectedRoute> },     
  { path: "joinform", element: <ProtectedRoute><JoinForm/></ProtectedRoute> },


      {
        path: "admin-panel",
        element: (
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Adminpanel />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "all-users",
            element: (
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <AllUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "event-management",
            element: (
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <EventManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "club-management",
            element: (
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <ClubManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "analytics",
            element: (
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <Analytics />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: "club-admin-panel",
        element: (
          <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}>
            <ClubAdminPanel />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "manage-events",
            element: (
              <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}>
                <EventMangement />
              </ProtectedRoute>
            ),
          },
          {
            path: "club-members",
            element: (
              <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}>
                <ClubMembers />
              </ProtectedRoute>
            ),
          },
          {
            path: "club-dashboard",
            element: (
              <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}>
                <ClubDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "club-milestones",
            element: (
              <ProtectedRoute allowedRoles={["CLUB_ADMIN"]}>
                <ClubMilstones />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
