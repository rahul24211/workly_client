import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Loading...</h2>
          <p className="text-slate-600 mt-2">Checking your session</p>
        </div>
      </div>
    );
  }

  if (user && token) {
    const role = user.role?.toUpperCase();

    if (role === "ADMIN") {
      return <Navigate to="/adminDashboard" replace />;
    }

    if (role === "CLIENT") {
      return <Navigate to="/clientDashboard" replace />;
    }

    if (role === "FREELANCER") {
      return <Navigate to="/freelancerdashboard" replace />;
    }
  }

  return children;
}
