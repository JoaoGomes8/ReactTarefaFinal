import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ element, allowedRole }) {
  const { user, isAuthReady } = useContext(AuthContext);

  if (!isAuthReady) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.type !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return element;
}
