// ProtectedRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { auth, roles: userRoles } = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
