import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useStore();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}
