import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const adminAuth = JSON.parse(
    localStorage.getItem("adminAuth") || "{}",
  );

  if (!adminAuth.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;