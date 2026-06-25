import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { freelancerAPI } from "../services/api";
import {
  DollarSign,
  Calendar,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Loader,
  Eye,
  X,
} from "lucide-react";
import { toast } from "react-toastify";

export default function MyProposals() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await freelancerAPI.getMyProposals();
      const proposalsData = response.data.proposals || response.data.data || [];
      setProposals(proposalsData);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load proposals");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Clock size={14} />
            Pending
          </span>
        );
      case "ACCEPTED":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle size={14} />
            Accepted
          </span>
        );
      case "REJECTED":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <XCircle size={14} />
            Rejected
          </span>
        );
      default:
        return <span className="text-slate-500 text-sm">{status}</span>;
    }
  };

  const filteredProposals = proposals.filter(
    (proposal) =>
      filterStatus === "all" ||
      proposal.status?.toUpperCase() === filterStatus.toUpperCase()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading your proposals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">My Proposals</h1>
          <p className="text-slate-600 mt-2">
            Track all your submitted proposals
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex gap-4 flex-wrap">
          {["all", "pending", "accepted", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                filterStatus === status
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {status === "all" ? "All Proposals" : status}
              {status !== "all" && (
                <span className="ml-2">
                  ({proposals.filter((p) => p.status?.toUpperCase() === status.toUpperCase()).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Total Proposals</p>
            <p className="text-3xl font-bold mt-2">{proposals.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {proposals.filter((p) => p.status?.toUpperCase() === "PENDING").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Accepted</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {proposals.filter((p) => p.status?.toUpperCase() === "ACCEPTED").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {proposals.filter((p) => p.status?.toUpperCase() === "REJECTED").length}
            </p>
          </div>
        </div>

        {/* Proposals List */}
        {filteredProposals.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-xl text-slate-500">
              {filterStatus === "all"
                ? "You haven't submitted any proposals yet"
                : `No ${filterStatus} proposals`}
            </p>
            <button
              onClick={() => navigate("/browse-jobs")}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {proposal.job?.title || "Job Title"}
                    </h2>
                    <p className="text-slate-600 mt-2 line-clamp-2">
                      {proposal.job?.description || "Job description"}
                    </p>

                    {/* Proposal Details */}
                    <div className="flex flex-wrap gap-6 mt-4 text-slate-600 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        <span>Bid: ₹{proposal.bidAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          Submitted:{" "}
                          {new Date(proposal.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>{proposal.deliveryDays} days delivery</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-end">
                    {getStatusBadge(proposal.status)}
                    <button
                      onClick={() => setSelectedProposal(proposal)}
                      className="px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Proposal Details</h2>
              <button
                onClick={() => setSelectedProposal(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-auto">
              {/* Job Title */}
              <div>
                <h3 className="text-sm text-slate-600 font-semibold">
                  Job Title
                </h3>
                <p className="text-lg font-bold mt-1">
                  {selectedProposal.job?.title}
                </p>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm text-slate-600 font-semibold">Status</h3>
                <div className="mt-2">{getStatusBadge(selectedProposal.status)}</div>
              </div>

              {/* Bid Amount */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Your Bid
                  </h3>
                  <p className="text-lg font-bold mt-1">
                    ₹{selectedProposal.bidAmount?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Delivery Time
                  </h3>
                  <p className="text-lg font-bold mt-1">
                    {selectedProposal.deliveryDays} days
                  </p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="text-sm text-slate-600 font-semibold">
                  Cover Letter
                </h3>
                <p className="text-slate-700 mt-2 bg-slate-50 p-4 rounded-lg">
                  {selectedProposal.coverLetter}
                </p>
              </div>

              {/* Submitted Date */}
              <div>
                <h3 className="text-sm text-slate-600 font-semibold">
                  Submitted
                </h3>
                <p className="text-slate-700 mt-1">
                  {new Date(selectedProposal.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Job Category */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Category
                  </h3>
                  <p className="text-slate-700 mt-1">
                    {selectedProposal.job?.category}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Experience Level
                  </h3>
                  <p className="text-slate-700 mt-1">
                    {selectedProposal.job?.experienceLevel}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t p-6 flex gap-3">
              <button
                onClick={() => setSelectedProposal(null)}
                className="flex-1 px-6 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigate("/browse-jobs");
                  setSelectedProposal(null);
                }}
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition"
              >
                Browse More Jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
