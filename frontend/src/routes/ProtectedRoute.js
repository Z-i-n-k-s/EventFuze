import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state?.user?.user);

  if (!user && allowedRoles) {
    // Only redirect if the route requires login
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect users who do not have the required role
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
