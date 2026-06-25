import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, freelancerAPI, clientAPI } from "../services/api";
import {
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader,
  Eye,
  X,
  Send,
  FileText,
} from "lucide-react";
import { toast } from "react-toastify";

export default function MyContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [submitWorkModal, setSubmitWorkModal] = useState(false);
  const [workData, setWorkData] = useState({ message: "", file: null });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
  }, []);

const fetchContracts = async () => {
  try {
    setLoading(true);

    const response = await authAPI.getMyContracts();
    console.log(response)

    console.log("Contracts Response:", response.data);

    const contractsData =
      response.data.contracts?.map((contract) => ({
        ...contract,

        projectTitle: contract.Job?.title || "",
        projectBudget: contract.Job?.budget || "",
        projectStatus: contract.Job?.status || "",

        freelancerName: contract.freelancer?.name || "",
        freelancerTitle: contract.freelancer?.title || "",
        freelancerCountry: contract.freelancer?.country || "",
        freelancerImage: contract.freelancer?.profile_image || null,
      })) || [];

    setContracts(contractsData);

    console.log("Mapped Contracts:", contractsData);
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Failed to load contracts"
    );
  } finally {
    setLoading(false);
  }
};

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            <Clock size={14} />
            Active
          </span>
        );
      case "WORK_SUBMITTED":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
            <AlertCircle size={14} />
            Work Submitted
          </span>
        );
      case "COMPLETED":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle size={14} />
            Completed
          </span>
        );
      case "CANCELLED":
        return (
          <span className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <X size={14} />
            Cancelled
          </span>
        );
      default:
        return <span className="text-slate-500 text-sm">{status}</span>;
    }
  };

  const handleSubmitWork = async () => {
    if (!workData.message) {
      toast.error("Please enter a submission message");
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("contractId", selectedContract.id);
      formData.append("submissionMessage", workData.message);
      if (workData.file) {
        formData.append("submissionFile", workData.file);
      }

      await freelancerAPI.submitWork(formData);
      toast.success("Work submitted successfully!");
      setSubmitWorkModal(false);
      setWorkData({ message: "", file: null });
      fetchContracts();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to submit work");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredContracts = contracts.filter(
    (contract) =>
      filterStatus === "all" ||
      contract.status?.toUpperCase() === filterStatus.toUpperCase()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading your contracts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">My Contracts</h1>
          <p className="text-slate-600 mt-2">
            Manage your active contracts and submissions
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex gap-4 flex-wrap">
          {["all", "active", "work_submitted", "completed", "cancelled"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  filterStatus === status
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {status.replace(/_/g, " ")}
                {status !== "all" && (
                  <span className="ml-2">
                    (
                    {
                      contracts.filter(
                        (c) => c.status?.toUpperCase() === status.toUpperCase()
                      ).length
                    }
                    )
                  </span>
                )}
              </button>
            )
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Total Contracts</p>
            <p className="text-3xl font-bold mt-2">{contracts.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Active</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {contracts.filter((c) => c.status?.toUpperCase() === "ACTIVE").length}
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Pending Review</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {
                contracts.filter(
                  (c) => c.status?.toUpperCase() === "WORK_SUBMITTED"
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-slate-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {contracts.filter((c) => c.status?.toUpperCase() === "COMPLETED").length}
            </p>
          </div>
        </div>

        {/* Contracts List */}
        {filteredContracts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-xl text-slate-500">
              {filterStatus === "all"
                ? "You don't have any contracts yet"
                : `No ${filterStatus.replace(/_/g, " ")} contracts`}
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
            {filteredContracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-slate-900">
                      {contract.Job?.title || "Project"}
                    </h2>
                    <p className="text-slate-600 mt-2 line-clamp-1">
                      {contract.Job?.description}
                    </p>

                    {/* Contract Details */}
                    <div className="flex flex-wrap gap-6 mt-4 text-slate-600 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} />
                        <span>₹{contract.amount?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>
                          Started:{" "}
                          {new Date(contract.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {contract.status?.toUpperCase() === "COMPLETED" && (
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} />
                          <span>
                            Completed:{" "}
                            {new Date(contract.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 items-end">
                    {getStatusBadge(contract.status)}
                    <button
                      onClick={() => setSelectedContract(contract)}
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

      {/* Contract Details Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contract Details</h2>
              <button
                onClick={() => setSelectedContract(null)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6 max-h-[70vh] overflow-auto">
              {/* Project Title */}
              <div>
                <h3 className="text-sm text-slate-600 font-semibold">
                  Project Title
                </h3>
                <p className="text-lg font-bold mt-1">
                  {selectedContract.Job?.title}
                </p>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-sm text-slate-600 font-semibold">Status</h3>
                <div className="mt-2">
                  {getStatusBadge(selectedContract.status)}
                </div>
              </div>

              {/* Contract Value */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Contract Amount
                  </h3>
                  <p className="text-lg font-bold mt-1">
                    ₹{selectedContract.amount?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Start Date
                  </h3>
                  <p className="text-lg font-bold mt-1">
                    {new Date(selectedContract.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Submission Info */}
              {selectedContract.status?.toUpperCase() === "WORK_SUBMITTED" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-yellow-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-yellow-900">
                        Work Submitted
                      </p>
                      <p className="text-sm text-yellow-800 mt-1">
                        Your work is pending client review
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedContract.submissionMessage && (
                <div>
                  <h3 className="text-sm text-slate-600 font-semibold">
                    Submission Message
                  </h3>
                  <p className="text-slate-700 mt-2 bg-slate-50 p-4 rounded-lg">
                    {selectedContract.submissionMessage}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t p-6 flex gap-3 flex-wrap">
              <button
                onClick={() => setSelectedContract(null)}
                className="flex-1 min-w-[150px] px-6 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition"
              >
                Close
              </button>

              {selectedContract.status?.toUpperCase() === "ACTIVE" && (
                <button
                  onClick={() => {
                    setSubmitWorkModal(true);
                  }}
                  className="flex-1 min-w-[150px] px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  Submit Work
                </button>
              )}

             

              <button
                onClick={() => navigate("/chat")}
                className="flex-1 min-w-[150px] px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-xl font-medium transition"
              >
                Contact Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Work Modal */}
      {submitWorkModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Submit Your Work</h2>
              <button
                onClick={() => setSubmitWorkModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-sm text-slate-600 font-semibold mb-2">
                  Submission Message
                </h3>
                <textarea
                  value={workData.message}
                  onChange={(e) =>
                    setWorkData({ ...workData, message: e.target.value })
                  }
                  placeholder="Describe what you've completed and any notes for the client..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div>
                <h3 className="text-sm text-slate-600 font-semibold mb-2">
                  Attach File (Optional)
                </h3>
                <input
                  type="file"
                  onChange={(e) =>
                    setWorkData({
                      ...workData,
                      file: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSubmitWorkModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitWork}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium transition flex items-center justify-center gap-2"
                >
                  {submitting ? "Submitting..." : <>
                    <Send size={16} />
                    Submit Work
                  </>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
