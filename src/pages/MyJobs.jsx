// src/pages/MyJobs.jsx
import { useState, useEffect, useCallback } from "react";
import { Eye, Pencil, Trash2, Plus, X, ChevronLeft, ChevronRight, Briefcase, IndianRupee, Clock, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

// ─── Helpers ────────────────────────────────────────────────────────────────

const statusStyle = (status) => {
  switch (status?.toUpperCase()) {
    case "OPEN":        return { dot: "#16a34a", bg: "#dcfce7", text: "#15803d" };
    case "IN_PROGRESS":
    case "ACTIVE":      return { dot: "#2563eb", bg: "#dbeafe", text: "#1d4ed8" };
    case "PENDING":     return { dot: "#d97706", bg: "#fef3c7", text: "#b45309" };
    case "COMPLETED":   return { dot: "#7c3aed", bg: "#ede9fe", text: "#6d28d9" };
    case "CLOSED":
    case "REJECTED":    return { dot: "#dc2626", bg: "#fee2e2", text: "#b91c1c" };
    default:            return { dot: "#64748b", bg: "#f1f5f9", text: "#475569" };
  }
};

const StatusBadge = ({ status }) => {
  const s = statusStyle(status);
  return (
    <span style={{ background: s.bg, color: s.text }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
      <span style={{ background: s.dot }} className="w-1.5 h-1.5 rounded-full" />
      {status || "PENDING"}
    </span>
  );
};

// ─── Pagination ──────────────────────────────────────────────────────────────

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 1;
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30 hover:bg-slate-50 transition"
      >
        <ChevronLeft size={16} />
      </button>

      {pages[0] > 1 && (
        <>
          <button onClick={() => onPageChange(1)}
            className="w-9 h-9 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition">1</button>
          {pages[0] > 2 && <span className="text-slate-400 text-sm px-1">…</span>}
        </>
      )}

      {pages.map(p => (
        <button key={p} onClick={() => onPageChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
            p === page
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100"
          }`}>
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && <span className="text-slate-400 text-sm px-1">…</span>}
          <button onClick={() => onPageChange(totalPages)}
            className="w-9 h-9 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2 rounded-lg border border-slate-200 text-slate-500 disabled:opacity-30 hover:bg-slate-50 transition"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const MyJobs = () => {
  const [jobs, setJobs]                     = useState([]);
  const [pagination, setPagination]         = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState("");
  const [selectedJob, setSelectedJob]       = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposalLoading, setProposalLoading]   = useState(false);
  const [status, setStatus]                 = useState("");
  const [statusLoading, setStatusLoading]   = useState(false);
  const [deleteId, setDeleteId]             = useState(null);

  const navigate = useNavigate();

  // ── Fetch ────────────────────────────────────────────────────────────────

  const fetchMyJobs = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/login"); return; }

      const { data } = await axios.get(`${API}/api/client/getmyjobs`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: pagination.limit },
      });

      setJobs(data.jobs || data.data || data || []);
      if (data.pagination) setPagination(p => ({ ...p, ...data.pagination }));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to load jobs");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate, pagination.limit]);

  useEffect(() => { fetchMyJobs(1); }, []);

  const handlePageChange = (page) => {
    setPagination(p => ({ ...p, page }));
    fetchMyJobs(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Job modal ────────────────────────────────────────────────────────────

  const openJobDetails = (job) => { setSelectedJob(job); setSelectedProposal(null); };
  const closeJobModal  = ()    => { setSelectedJob(null); setSelectedProposal(null); };

  // ── Proposal ─────────────────────────────────────────────────────────────

  const viewProposal = async (proposalId) => {
    setProposalLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${API}/api/client/getjobproposalsbyid?proposalId=${proposalId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const proposal = data.data || data.proposal || data;
      setSelectedProposal(proposal);
      setStatus(proposal.status || "");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load proposal details");
    } finally {
      setProposalLoading(false);
    }
  };

  const updateProposalStatus = async () => {
    setStatusLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `${API}/api/client/updateproposalstatus`,
        { proposalId: selectedProposal._id, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(data.message || "Status updated");
      setSelectedProposal(p => ({ ...p, status }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setStatusLoading(false);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/api/client/jobs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(j => j.filter(x => x.id !== deleteId));
      if (selectedJob?.id === deleteId) closeJobModal();
    } catch {
      alert("Failed to delete job");
    } finally {
      setDeleteId(null);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
              <Briefcase size={18} className="text-emerald-600" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">My Jobs</h1>
              {!loading && (
                <p className="text-xs text-slate-400 mt-0.5">
                  {pagination.total} job{pagination.total !== 1 ? "s" : ""} posted
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => navigate("/PostJob")}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm shadow-emerald-200"
          >
            <Plus size={16} />
            Post Job
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl mb-6 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                <div className="h-5 bg-slate-100 rounded-lg w-2/5 mb-3" />
                <div className="h-4 bg-slate-100 rounded-lg w-1/3 mb-4" />
                <div className="h-6 bg-slate-100 rounded-full w-20" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && jobs.length === 0 && !error && (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase size={28} className="text-emerald-500" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No jobs yet</h2>
            <p className="text-slate-400 mb-6">Post your first job and start finding freelancers.</p>
            <button
              onClick={() => navigate("/PostJob")}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              Post Your First Job
            </button>
          </div>
        )}

        {/* Job cards */}
        {!loading && jobs.length > 0 && (
          <>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id}
                  className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-emerald-200 hover:shadow-md transition-all duration-200 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                        {job.title}
                      </h2>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          <IndianRupee size={13} />
                          {(job.budget || 0).toLocaleString()}
                          <span className="text-slate-400">· {job.budgetType}</span>
                        </span>
                        {job.duration && (
                          <span className="flex items-center gap-1 text-sm text-slate-400">
                            <Clock size={13} />
                            {job.duration}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-sm text-slate-400">
                          <Tag size={13} />
                          {job.Proposals?.length || 0} proposal{job.Proposals?.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <div className="mt-3">
                        <StatusBadge status={job.status} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => openJobDetails(job)}
                        title="View"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-500 transition">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => navigate(`/edit-job/${job.id}`)}
                        title="Edit"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-600 transition">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setDeleteId(job.id)}
                        title="Delete"
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 hover:bg-red-100 text-red-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />

            <p className="text-center text-xs text-slate-400 mt-4">
              Showing {(pagination.page - 1) * pagination.limit + 1}–
              {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} jobs
            </p>
          </>
        )}
      </div>

      {/* ── Delete Confirm Modal ─────────────────────────────────────────── */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full">
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 text-center mb-2">Delete this job?</h3>
            <p className="text-slate-500 text-sm text-center mb-6">
              This will permanently remove the job and all its proposals. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition">
                Cancel
              </button>
              <button onClick={confirmDelete}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Job Detail Modal ─────────────────────────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl max-h-[90vh] flex flex-col">

            {/* Modal header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-100">
              <div className="pr-4">
                <h2 className="text-xl font-bold text-slate-900">{selectedJob.title}</h2>
                <StatusBadge status={selectedJob.status} />
              </div>
              <button onClick={closeJobModal}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 transition flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">

              {/* Budget + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 rounded-2xl p-4">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide mb-1">Budget</p>
                  <p className="text-2xl font-bold text-emerald-700">
                    ₹{parseFloat(selectedJob.budget).toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600 mt-0.5">{selectedJob.budgetType}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Duration</p>
                  <p className="text-xl font-bold text-slate-800">{selectedJob.duration || "—"}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Description</p>
                <p className="text-slate-600 leading-relaxed text-sm">{selectedJob.description}</p>
              </div>

              {/* Skills */}
              {selectedJob.skills?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Skills Required</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, i) => (
                      <span key={i}
                        className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Proposals */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
                  Proposals ({selectedJob.Proposals?.length || 0})
                </p>
                {selectedJob.Proposals?.length > 0 ? (
                  <div className="space-y-3">
                    {selectedJob.Proposals.map((prop, i) => (
                      <div key={i}
                        onClick={() => navigate(`/proposal/${prop.id}`)}
                        className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 p-4 rounded-2xl cursor-pointer transition">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Proposal #{i + 1}</p>
                          <p className="text-sm text-slate-500 mt-0.5">
                            ₹{parseFloat(prop.bidAmount).toLocaleString()}
                          </p>
                        </div>
                        <StatusBadge status={prop.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-sm bg-slate-50 rounded-2xl">
                    No proposals received yet
                  </div>
                )}
              </div>
            </div>

            {/* Modal footer */}
            <div className="border-t border-slate-100 p-6 flex gap-3">
              <button onClick={closeJobModal}
                className="flex-1 py-3 border border-slate-200 rounded-2xl text-slate-600 font-semibold hover:bg-slate-50 transition text-sm">
                Close
              </button>
              <button onClick={() => { navigate(`/edit-job/${selectedJob.id}`); closeJobModal(); }}
                className="flex-1 py-3 bg-emerald-600 text-white rounded-2xl font-semibold hover:bg-emerald-700 transition text-sm">
                Edit Job
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Proposal Detail Modal ────────────────────────────────────────── */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Proposal Details</h2>
              <button onClick={() => setSelectedProposal(null)}
                className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-400 transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Freelancer</p>
                  <p className="font-semibold text-slate-800">{selectedProposal.freelancer?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Bid Amount</p>
                  <p className="font-bold text-emerald-700 text-lg">₹{selectedProposal.bidAmount?.toLocaleString()}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Cover Letter</p>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3">
                  {selectedProposal.coverLetter}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-xs text-slate-400">Current Status</p>
                <StatusBadge status={selectedProposal.status} />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-2">
                  Update Status
                </label>
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  <option value="">Select new status</option>
                  <option value="ACCEPTED">Accept Proposal</option>
                  <option value="REJECTED">Reject Proposal</option>
                </select>
              </div>

              <button onClick={updateProposalStatus} disabled={statusLoading || !status}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold transition text-sm">
                {statusLoading ? "Updating…" : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;