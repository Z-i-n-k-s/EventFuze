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
  const isPublicRoute = ["/login", "/sign-up", "/forgot-password"].some(
    (path) => location.pathname.startsWith(path)
  );

  // Header visibility: show on admin panel or normal pages
  const showHeader = !isPublicRoute;

  // Footer visibility: show only on normal pages for logged-in users
  const showFooter = !isPublicRoute && !isAdminPanel && user;

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <ToastContainer />

      <div className="flex flex-col min-h-screen">
        {showHeader && <Header />}

        <main className={`flex-1 ${showHeader ? "min-h-[calc(100vh-120px)]" : ""}`}>
          <Outlet />
        </main>


        {showFooter && <Footer />}
      </div>

    </Context.Provider>
  );
}

export default App;
