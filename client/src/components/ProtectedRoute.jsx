import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role mismatch
  if (role && user.role !== role) {
    return <Navigate to="/menu" replace />;
  }

  return children;
}
