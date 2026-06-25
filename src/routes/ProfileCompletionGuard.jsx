import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProfileCompletionGuard = ({
  children,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.profile_completed) {
    const role =
      user.role?.toLowerCase() || "freelancer";

    return (
      <Navigate
        to={`/create-profile?role=${role}`}
        replace
      />
    );
  }

  return children;
};

export const ProtectedRouteWithProfileCheck = ({
  children,
  role = null,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // FIXED
  if (!user.profile_completed) {
    const userRole =
      user.role?.toLowerCase() || "freelancer";

    return (
      <Navigate
        to={`/create-profile?role=${userRole}`}
        replace
      />
    );
  }

  return children;
};

export default ProfileCompletionGuard;