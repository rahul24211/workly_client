import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, token, loading } = useAuth();


console.log("ProtectedRoute User:", user);
console.log("ProtectedRoute Loading:", loading);

  // LocalStorage check hone tak wait karo
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  // Login nahi hai
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Role check
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Login hai
  return children;
}
