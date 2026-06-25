import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI, clientAPI } from "../services/api";
import { Loader, ChevronRight, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function ClientContracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("active"); // active, submitted, completed
  const [selectedContract, setSelectedContract] = useState(null);
  const [marking, setMarking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
  try {
    setLoading(true);

    const response = await authAPI.getMyContracts();

    console.log("Contracts API Response:", response.data);

    const contractsData = response.data.contracts || [];

    setContracts(contractsData);

  } catch (error) {
    console.error("Error fetching contracts:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to load contracts"
    );
  } finally {
    setLoading(false);
  }
};

  const getFilteredContracts = () => {
    if (activeTab === "active") {
      return contracts.filter(c => c.status === "ACTIVE");
    } else if (activeTab === "submitted") {
      return contracts.filter(c => c.status === "WORK_SUBMITTED");
    } else if (activeTab === "completed") {
      return contracts.filter(c => c.status === "COMPLETED");
    }
    return contracts;
  };

  const handleMarkComplete = async (contractId) => {
    try {
      console.log(contractId)
      setMarking(true);
      await clientAPI.completeContract(contractId);
      toast.success("Contract marked as complete!");
      await fetchContracts();
      setSelectedContract(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to complete contract");
    } finally {
      setMarking(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: { bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-500" },
      WORK_SUBMITTED: { bg: "bg-yellow-50", text: "text-yellow-700", icon: "text-yellow-500" },
      COMPLETED: { bg: "bg-green-50", text: "text-green-700", icon: "text-green-500" },
      CANCELLED: { bg: "bg-red-50", text: "text-red-700", icon: "text-red-500" },
    };
    return colors[status] || colors.ACTIVE;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5" />;
      case "WORK_SUBMITTED":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

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

  const filteredContracts = getFilteredContracts();

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">My Contracts</h1>
          <p className="text-slate-600 mt-2">Manage your active and completed projects</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          {[
            { id: "active", label: "Active", count: contracts.filter(c => c.status === "ACTIVE").length },
            { id: "submitted", label: "Work Submitted", count: contracts.filter(c => c.status === "WORK_SUBMITTED").length },
            { id: "completed", label: "Completed", count: contracts.filter(c => c.status === "COMPLETED").length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label} <span className="ml-2 text-xs bg-slate-200 px-2 py-1 rounded-full">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Contracts List */}
        {filteredContracts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-xl text-slate-500">
              No {activeTab} contracts at the moment
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
            {filteredContracts.map(contract => {
              const colors = getStatusColor(contract.status);
              return (
                <div
                  key={contract.id}
                  className={`${colors.bg} rounded-2xl shadow-md hover:shadow-lg transition p-6 border-l-4 border-indigo-600`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className={colors.icon}>
                          {getStatusIcon(contract.status)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">
                            {contract.Job?.title || "Project"}
                          </h2>
                          <p className="text-slate-600 text-sm mt-1">
                            Contract #<span className="font-mono">{contract.id}</span>
                          </p>
                        </div>
                      </div>

                      {/* Contract Details Grid */}
                      <div className="grid md:grid-cols-2 gap-4 mt-4 bg-white bg-opacity-50 rounded-xl p-4">
                        <div>
                          <p className="text-slate-600 text-sm">Freelancer</p>
                          <p className="font-semibold text-slate-900">
                            {contract.freelancer?.name || "Unknown"}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-sm">Amount</p>
                          <p className="font-semibold text-slate-900">
                            ₹{parseFloat(contract.amount)?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-sm">Delivery Days</p>
                          <p className="font-semibold text-slate-900">
                            {contract.deliveryDays || "N/A"} days
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600 text-sm">Due Date</p>
                          <p className="font-semibold text-slate-900">
                            {contract.dueDate 
                              ? new Date(contract.dueDate).toLocaleDateString()
                              : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colors.text} bg-white`}>
                          {contract.status === "ACTIVE" && "🔵 Active"}
                          {contract.status === "WORK_SUBMITTED" && "⏳ Work Submitted"}
                          {contract.status === "COMPLETED" && "✅ Completed"}
                          {contract.status === "CANCELLED" && "❌ Cancelled"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 min-w-48">
                      <button
                        onClick={() => setSelectedContract(contract)}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                      >
                        View Details <ChevronRight size={18} />
                      </button>

                      {contract.status === "WORK_SUBMITTED" && (
                        <button
                          onClick={() => handleMarkComplete(contract.id)}
                          disabled={marking}
                          className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 transition"
                        >
                          {marking ? "Processing..." : "Mark Complete"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Contract Details Modal */}
      {selectedContract && (
        <ContractDetailsModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
          onMarkComplete={handleMarkComplete}
          marking={marking}
        />
      )}
    </div>
  );
}

// Contract Details Modal Component
function ContractDetailsModal({ contract, onClose, onMarkComplete, marking }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-bold">{contract.Job?.title || "Contract"}</h2>
          <p className="text-indigo-100 mt-1">Contract #{contract.id}</p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Contract Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 bg-slate-50 rounded-xl p-6">
            <div>
              <p className="text-slate-600 text-sm mb-1">Freelancer</p>
              <p className="text-lg font-semibold text-slate-900">{contract.freelancer?.name}</p>
              {contract.freelancer?.title && (
                <p className="text-sm text-slate-600 mt-1">{contract.freelancer.title}</p>
              )}
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Status</p>
              <p className="text-lg font-semibold text-slate-900">{contract.status}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Amount</p>
              <p className="text-lg font-semibold text-slate-900">₹{parseFloat(contract.amount)?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Delivery Days</p>
              <p className="text-lg font-semibold text-slate-900">{contract.deliveryDays} days</p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Start Date</p>
              <p className="text-lg font-semibold text-slate-900">
                {contract.startDate ? new Date(contract.startDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Due Date</p>
              <p className="text-lg font-semibold text-slate-900">
                {contract.dueDate ? new Date(contract.dueDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>

          {/* Submission Details (if submitted) */}
          {contract.status === "WORK_SUBMITTED" && (
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="font-bold text-yellow-900 mb-3">Work Submission</h3>
              {contract.submissionMessage && (
                <div className="mb-4">
                  <p className="text-sm text-yellow-700 mb-2">Submission Message:</p>
                  <p className="text-yellow-900 bg-white rounded p-3">{contract.submissionMessage}</p>
                </div>
              )}
              {contract.submissionFile && (
                <div>
                  <p className="text-sm text-yellow-700 mb-2">Submission File:</p>
                  <a
                    href={contract.submissionFile}
                    className="text-indigo-600 hover:underline font-semibold"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📎 Download File
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Job Description */}
          {contract.Job?.description && (
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Project Description</h3>
              <p className="text-slate-700 bg-slate-50 rounded-xl p-4">
                {contract.Job.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-slate-50 p-6 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-slate-300 rounded-xl font-semibold hover:bg-slate-100 transition"
          >
            Close
          </button>
          {contract.status === "WORK_SUBMITTED" && (
            <button
              onClick={() => onMarkComplete(contract.id)}
              disabled={marking}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 disabled:bg-green-400 transition"
            >
              {marking ? "Processing..." : "✅ Mark as Complete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
