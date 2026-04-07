import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming you store role on login

  // 1. Check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if user has the required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If they are a 'user' trying to access 'adminDashboard', send them home
    return <Navigate to="/" replace />;
  }

  // 3. If everything is fine, render the dashboard (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;