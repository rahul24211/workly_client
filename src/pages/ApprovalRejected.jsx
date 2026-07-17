import { XCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ApprovalRejected = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={32} className="text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Profile Not Approved</h1>
        <p className="text-slate-600 mb-2">
          Unfortunately, your profile was not approved by our admin team.
        </p>
        <p className="text-slate-500 text-sm mb-8">
          This may be due to incomplete or invalid documents. Please contact support for more information.
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

export default ApprovalRejected;
