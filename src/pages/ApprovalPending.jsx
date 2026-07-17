import { Clock, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ApprovalPending = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={32} className="text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Profile Under Review</h1>
        <p className="text-slate-600 mb-2">
          Your profile has been submitted and is awaiting admin approval.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          You will be able to access the platform once your profile is approved. This usually takes 1–2 business days.
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 mx-auto text-slate-600 hover:text-red-600 transition text-sm"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ApprovalPending;
