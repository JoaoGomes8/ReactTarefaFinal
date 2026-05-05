import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ element, allowedRole }) {
  const { user } = useContext(AuthContext);

  if (!user || user.type !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return element;
}
