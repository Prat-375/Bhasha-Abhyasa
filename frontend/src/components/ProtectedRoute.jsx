// ProtectedRoute.jsx
// frontend/src/components/ProtectedRoute.jsx
// Wraps protected routes. If no token → redirect to /login.

import { Navigate, useLocation } from "react-router";
import { getToken } from "../utils/auth";

function ProtectedRoute({ children }) {
  const token    = getToken();
  const location = useLocation();

  if (!token) {
    // Save where they were trying to go so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;