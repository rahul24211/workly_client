import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

const AdminFreelancerApprovals = ({ embedded = false }) => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/pending-freelancers`, { headers });
      setFreelancers(res.data.freelancers || []);
    } catch {
      toast.error("Failed to load pending freelancers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPending(); }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/admin/freelancer-approval/${id}`, { status }, { headers });
      toast.success(`Freelancer ${status.toLowerCase()} successfully`);
      setFreelancers((prev) => prev.filter((f) => f.id !== id));
    } catch {
      toast.error("Action failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
    </div>
  );

  return (
    <div className={`bg-slate-50 ${embedded ? "min-h-0 p-0" : "min-h-screen p-4 lg:p-8"}`}>
      <div className={embedded ? "mx-auto" : "mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row"}>
        {!embedded && <AdminSidebar />}

        <div className={embedded ? "w-full" : "flex-1"}>
          <div className="flex items-center gap-3 mb-8">
            <Clock size={28} className="text-amber-500" />
            <h1 className="text-2xl font-bold text-slate-900">Pending Freelancer Approvals</h1>
            <span className="ml-auto bg-amber-100 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
              {freelancers.length} pending
            </span>
          </div>

          {freelancers.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center text-slate-500">
              No pending approvals
            </div>
          ) : (
            <div className="space-y-4">
              {freelancers.map((f) => (
                <div key={f.id} className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                  {f.profile_image ? (
                    <img src={`${API_BASE_URL}${f.profile_image}`} alt={f.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-200" />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl">
                      {f.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900">{f.name}</p>
                    <p className="text-sm text-slate-500">{f.email}</p>
                    {f.title && <p className="text-sm text-emerald-600 mt-0.5">{f.title}</p>}
                    <p className="text-xs text-slate-400 mt-0.5">{f.country}{f.city ? `, ${f.city}` : ""}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleAction(f.id, "APPROVED")}
                      className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={() => handleAction(f.id, "REJECTED")}
                      className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFreelancerApprovals;
