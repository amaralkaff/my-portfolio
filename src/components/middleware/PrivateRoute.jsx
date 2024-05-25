// src/components/middleware/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import LoadingSpinner from "../common/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while checking authentication
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
