import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle, ArrowLeft, Briefcase, Users, Link } from "lucide-react";
import { adminAPI } from "../services/api";
import { toast } from "react-toastify";

export default function AdminFreelancerDetail() {
  const { freelancerId } = useParams();
  const navigate = useNavigate();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const getDocumentUrl = (value) => {
    if (!value) return "";
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value;
    }
    return `${import.meta.env.VITE_API_BASE_URL || ""}${value}`;
  };

  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.getPendingFreelancers();
        if (response.data.success) {
          const found = response.data.freelancers?.find(
            (item) => String(item.id) === String(freelancerId)
          );
          if (!found) {
            setError("Pending freelancer not found.");
          } else {
            setFreelancer(found);
          }
        } else {
          setError("Unable to load freelancer details.");
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load freelancer details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, [freelancerId]);

  const handleApproval = async (status) => {
    if (!freelancer) return;
    try {
      setSubmitting(true);
      await adminAPI.updateFreelancerApproval(freelancer.id, status);
      toast.success(`Freelancer ${status.toLowerCase()} successfully.`);
      navigate("/adminDashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update freelancer approval status.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4"></div>
          <p className="text-gray-600">Loading freelancer details...</p>
        </div>
      </div>
    );
  }

  if (error || !freelancer) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 max-w-xl text-center">
          <p className="text-red-600 font-semibold mb-3">{error || "Freelancer not found."}</p>
          <button
            onClick={() => navigate("/adminDashboard")}
            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl hover:bg-indigo-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const profile = freelancer.FreelancerProfile || {};

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/adminDashboard")}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-slate-700 hover:bg-slate-100 transition"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Freelancer Approval</h1>
            <p className="text-sm text-slate-500">Review profile details and approve or reject this freelancer.</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold">
                {freelancer.name?.[0]?.toUpperCase() || "F"}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{freelancer.name}</h2>
                <p className="text-sm text-slate-500">{freelancer.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">{freelancer.role}</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{freelancer.approval_status}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{freelancer.city || "N/A"}, {freelancer.country || "N/A"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5 border border-slate-200">
                <p className="text-sm text-slate-500">Experience</p>
                <p className="mt-2 text-base font-semibold text-slate-900">{profile.experienceYears || "N/A"} years</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Skills</h3>
                <p className="mt-3 text-slate-700">{profile.skills || "Not specified"}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Portfolio & Profiles</h3>
                <div className="mt-3 flex flex-col gap-2 text-slate-700">
                  <p>GitHub: {profile.github || "Not provided"}</p>
                  <p>LinkedIn: {profile.linkedin || "Not provided"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Documents</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <a
                    href={getDocumentUrl(profile.aadhaarFront)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-3xl p-4 border ${profile.aadhaarFront ? "border-slate-200 bg-white hover:border-indigo-400" : "border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed"}`}
                  >
                    <p className="text-xs text-slate-500">Aadhaar Front</p>
                    <p className="mt-2 text-sm text-slate-700">{profile.aadhaarFront ? "View Document" : "Missing"}</p>
                  </a>
                  <a
                    href={getDocumentUrl(profile.aadhaarBack)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-3xl p-4 border ${profile.aadhaarBack ? "border-slate-200 bg-white hover:border-indigo-400" : "border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed"}`}
                  >
                    <p className="text-xs text-slate-500">Aadhaar Back</p>
                    <p className="mt-2 text-sm text-slate-700">{profile.aadhaarBack ? "View Document" : "Missing"}</p>
                  </a>
                  <a
                    href={getDocumentUrl(profile.panFront)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-3xl p-4 border ${profile.panFront ? "border-slate-200 bg-white hover:border-indigo-400" : "border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed"}`}
                  >
                    <p className="text-xs text-slate-500">PAN Front</p>
                    <p className="mt-2 text-sm text-slate-700">{profile.panFront ? "View Document" : "Missing"}</p>
                  </a>
                  <a
                    href={getDocumentUrl(profile.panBack)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-3xl p-4 border ${profile.panBack ? "border-slate-200 bg-white hover:border-indigo-400" : "border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed"}`}
                  >
                    <p className="text-xs text-slate-500">PAN Back</p>
                    <p className="mt-2 text-sm text-slate-700">{profile.panBack ? "View Document" : "Missing"}</p>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Approval Actions</h2>
              <button
                onClick={() => handleApproval("APPROVED")}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-white font-semibold hover:bg-emerald-700 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CheckCircle size={18} /> Approve Freelancer
              </button>
              <button
                onClick={() => handleApproval("REJECTED")}
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 font-semibold hover:bg-slate-50 transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                <XCircle size={18} /> Reject Freelancer
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Facts</h2>
              <div className="space-y-3 text-slate-700">
                <p className="flex items-center gap-2"><Users size={16} /> Email: <span className="font-semibold text-slate-900">{freelancer.email}</span></p>
                <p className="flex items-center gap-2"><Briefcase size={16} /> Role: <span className="font-semibold text-slate-900">{freelancer.role}</span></p>
                <p className="flex items-center gap-2"><Link size={16} /> Profile Completed: <span className="font-semibold text-slate-900">{freelancer.profile_completed ? "Yes" : "No"}</span></p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
