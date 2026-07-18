import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const createProfileRoutes = ["/create-profile", "/create-client-profile", "/create-freelancer-profile"];
const allowedIncompleteProfileRoutes = new Set([
  "/",
  "/about",
  "/login",
  "/register",
  "/register-with-otp",
  ...createProfileRoutes,
]);

const getProfileCompletionRedirect = (user) => {
  const role = user?.role?.toLowerCase() || "freelancer";
  return `/create-profile?role=${role}`;
};

const renderLoadingState = () => (
  <div className="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="text-center">
      <div className="mb-6">
        <div className="inline-block">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
      <h2 className="text-xl font-semibold text-slate-800">Loading...</h2>
      <p className="text-slate-600 mt-2">Verifying your authentication</p>
    </div>
  </div>
);

export const ProfileCompletionGuard = ({ children }) => {
  const { user, loading } = useAuth();

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
          <p className="text-slate-600 mt-2">Verifying your authentication</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ADMIN" && !user.profile_completed) {
    return <Navigate to={getProfileCompletionRedirect(user)} replace />;
  }

  if (user.role === "FREELANCER" && user.profile_completed && user.approval_status === "PENDING") {
    return <Navigate to="/approval-pending" replace />;
  }

  if (user.role === "FREELANCER" && user.profile_completed && user.approval_status === "REJECTED") {
    return <Navigate to="/approval-rejected" replace />;
  }

  return children;
};

export const ProtectedRouteWithProfileCheck = ({
  children,
  role = null,
}) => {
  const { user, loading } = useAuth();

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
          <p className="text-slate-600 mt-2">Verifying your authentication</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  if (user.role !== "ADMIN" && !user.profile_completed) {
    return <Navigate to={getProfileCompletionRedirect(user)} replace />;
  }

  if (user.role === "FREELANCER" && user.profile_completed && user.approval_status === "PENDING") {
    return <Navigate to="/approval-pending" replace />;
  }

  if (user.role === "FREELANCER" && user.profile_completed && user.approval_status === "REJECTED") {
    return <Navigate to="/approval-rejected" replace />;
  }

  return children;
};

export const ProfileCompletionRouteGate = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return renderLoadingState();
  }

  if (!user) {
    return children;
  }

  if (user.role !== "ADMIN" && !user.profile_completed && !allowedIncompleteProfileRoutes.has(location.pathname)) {
    return <Navigate to={getProfileCompletionRedirect(user)} replace />;
  }

  return children;
};

export default ProfileCompletionGuard;