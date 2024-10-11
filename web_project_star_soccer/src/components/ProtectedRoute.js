import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function ProtectedRoute({ children, loggedIn, requireAdmin }) {
  const user = useContext(CurrentUserContext);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
