import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
