import { Navigate } from "react-router-dom"; 

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" />; // Redirect to login
  }

  // Prevents error if allowedRoles is undefined
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />; 
  }

  return children;
};

export default ProtectedRoute;
