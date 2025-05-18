import { Navigate } from "react-router-dom";
import { useAuth } from "@Shared/Context/AuthContext";

/**
 * ProtectedRoute – Beskytter ruter, som kræver at brugeren er logget ind.
 * Viser "Indlæser..." mens brugerdata hentes, og sender til login hvis ikke logget ind.
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Indlæser...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
