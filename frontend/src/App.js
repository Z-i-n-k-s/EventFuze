import logo from "./logo.svg";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Sidebar from "./components/shared/Sidebar";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const location = useLocation(); // Get current path

  const fetchUserDetails = async () => {
    try {
      const dataResponse = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
      });
      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Determine if we are in admin routes
  const isAdminPanel = location.pathname.startsWith("/admin-panel");

  // Determine if this is a public route (login, signup, forgot password, reset password)
  const isPublicRoute = ["/login", "/sign-up", "/forgot-password"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <ToastContainer />
      <div className="flex">
        {/* Sidebar only for admin routes */}
        {user && !isAdminPanel && <Sidebar />}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="min-h-[calc(100vh-120px)] p-4">
            <Outlet />
          </main>

          {/* Footer only for student/user pages and public pages */}
          {user && !isAdminPanel && !isPublicRoute && <Footer />}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
