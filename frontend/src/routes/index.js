import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Adminpanel from "../pages/Admin/Adminpanel";

import ForgotPassword from "../pages/Shared/ForgotPassword";

import Login from "../pages/Shared/Login";
import ResetPassword from "../pages/Shared/ResetPassword"; // import
import SignUP from "../pages/Shared/SignUP";
import ProtectedRoute from "./ProtectedRoute";
import AllUsers from "../pages/Admin/AllUsers";
import CreateEvent from "../pages/Admin/EventManagement";
import EventManagement from "../pages/Admin/EventManagement";
import ClubManagement from "../pages/Admin/ClubManagement";
import Analytics from "../pages/Admin/Analytics";
import Home from "../pages/user/home/Home";
import RegisterEvent from "../pages/user/registerEvent/RegisterEvent";
import AllEvents from "../pages/user/allEvents/AllEvents";

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

      {
        path: "admin-panel",
        element: (
          <ProtectedRoute>
            <Adminpanel />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "all-users",
            element: (
              <ProtectedRoute>
                <AllUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "event-management",
            element: (
              <ProtectedRoute>
                <EventManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "club-management",
            element: (
              <ProtectedRoute>
                <ClubManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: "analytics",
            element: (
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
