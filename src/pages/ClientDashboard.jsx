import { useEffect, useState } from "react";
import {
  Search,
  Code,
  PenTool,
  Video,
  Palette,
  ArrowRight,
  TrendingUp,
  Briefcase,
  CheckCircle,
  DollarSign,
  Users,
  Clock,
  AlertCircle,
  Star,
  LayoutDashboard,
  FileText,
  MessageSquareText,
  UserCircle2,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clientAPI } from "../services/api";
import CurvedSidebar from "../components/CurvedSidebar";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import ClientContracts from "./ClientContracts";
import FreelancersList from "./FreelancersList";
import ClientProfilePage from "./ClientProfilePage";
import Chat from "./Chat";
import Notifications from "./Notifications";

const getClientActiveView = (pathname) => {
  const segment = pathname.replace("/clientDashboard", "").replace(/^\/+/, "");

  switch (segment) {
    case "post-jobs":
      return "post-job";
    case "my-jobs":
      return "my-jobs";
    case "contracts":
      return "contracts";
    case "find-freelancers":
      return "find-freelancers";
    case "messages":
      return "messages";
    case "notifications":
      return "notifications";
    case "profile":
      return "profile";
    case "settings":
      return "settings";
    default:
      return "dashboard";
  }
};

export default function ClientDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const activeView = getClientActiveView(location.pathname);

  const handleViewDetails = (contract) => {
    setSelectedContract(contract);
    setShowModal(true);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await clientAPI.getClientDashboard();
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-6">
          <AlertCircle className="mb-2 text-red-600" />
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.statistics || {};
  const activeContracts = dashboardData?.activeContracts || [];
  const recentProposals = dashboardData?.recentProposals || [];
  const topFreelancers = dashboardData?.topFreelancers || [];

  const StatCard = ({ icon: Icon, label, value, subtext, color = "blue" }) => (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className={`mt-2 text-3xl font-bold text-${color}-600`}>{value}</p>
          {subtext && <p className="mt-1 text-xs text-gray-500">{subtext}</p>}
        </div>
        <Icon className={`text-${color}-600`} size={32} />
      </div>
    </div>
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/clientDashboard" },
    { id: "post-job", label: "Post Job", icon: FileText, to: "/clientDashboard/post-jobs" },
    { id: "my-jobs", label: "My Jobs", icon: Briefcase, to: "/clientDashboard/my-jobs" },
    { id: "contracts", label: "My Contracts", icon: Briefcase, to: "/clientDashboard/contracts" },
    { id: "find-freelancers", label: "Find Freelancers", icon: Search, to: "/clientDashboard/find-freelancers" },
    { id: "messages", label: "Messages", icon: MessageSquareText, to: "/clientDashboard/messages" },
    { id: "profile", label: "Profile", icon: UserCircle2, to: "/clientDashboard/profile" },
    { id: "settings", label: "Settings", icon: Settings, to: "/clientDashboard/settings" },
    { id: "notifications", label: "Notifications", icon: MessageSquareText, to: "/clientDashboard/notifications" },
  ];

  const handleSelectItem = (view) => {
    if (view === "messages") {
      navigate("/clientDashboard/messages");
      return;
    }

    if (view === "notifications") {
      navigate("/clientDashboard/notifications");
      return;
    }

    const viewToRoute = {
      dashboard: "/clientDashboard",
      "post-job": "/clientDashboard/post-jobs",
      "my-jobs": "/clientDashboard/my-jobs",
      contracts: "/clientDashboard/contracts",
      "find-freelancers": "/clientDashboard/find-freelancers",
      profile: "/clientDashboard/profile",
      settings: "/clientDashboard/settings",
    };

    navigate(viewToRoute[view] || "/clientDashboard");
  };

  const renderRightPanel = () => {
    switch (activeView) {
      case "post-job":
        return <PostJob embedded />;
      case "my-jobs":
        return <MyJobs embedded />;
      case "contracts":
        return <ClientContracts embedded />;
      case "find-freelancers":
        return <FreelancersList embedded />;
      case "messages":
        return <Chat />;
      case "notifications":
        return <Notifications embedded />;
      case "profile":
        return <ClientProfilePage embedded />;
      case "settings":
        return <div className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">Settings view coming soon.</div>;
      case "dashboard":
      default:
        return (
          <>
            <section className="rounded-[32px] bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
              <div className="max-w-5xl">
                <h1 className="mb-2 text-4xl font-bold">Client Dashboard</h1>
                <p className="text-indigo-100">Manage your projects, contracts, and team</p>
              </div>
            </section>

            <section className="py-8">
              <h2 className="mb-6 text-2xl font-bold">Overview</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <StatCard icon={Briefcase} label="Total Jobs" value={stats.totalJobs || 0} color="blue" />
                <StatCard icon={Clock} label="Open Jobs" value={stats.openJobs || 0} color="yellow" />
                <StatCard icon={Users} label="Active Contracts" value={stats.activeContracts || 0} color="green" />
                <StatCard icon={CheckCircle} label="Completed" value={stats.completedJobs || 0} color="emerald" />
                <StatCard icon={TrendingUp} label="Finished Contracts" value={stats.completedContracts || 0} color="purple" />
                <StatCard icon={DollarSign} label="Total Spent" value={`₹${stats.totalSpent?.toLocaleString("en-IN") || 0}`} color="indigo" />
              </div>
            </section>

            <section className="pb-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Active Contracts</h2>
                <button onClick={() => handleSelectItem("contracts")} className="font-semibold text-indigo-600 hover:text-indigo-700">
                  View All →
                </button>
              </div>

              {activeContracts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold">{contract.freelancer.name}</h3>
                          <p className="text-sm text-gray-600">{contract.freelancer.title}</p>
                        </div>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                          {contract.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-bold text-indigo-600">₹{contract.amount?.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span className="text-sm">
                            {contract.dueDate ? new Date(contract.dueDate).toLocaleDateString("en-IN") : "N/A"}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewDetails(contract)}
                        className="mt-4 w-full rounded-[16px] bg-indigo-600 py-2 text-white transition hover:bg-indigo-700"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[24px] border border-gray-100 bg-white p-12 text-center">
                  <Briefcase size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="mb-4 text-gray-600">No active contracts yet</p>
                  <button onClick={() => handleSelectItem("find-freelancers")} className="inline-block rounded-[16px] bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700">
                    Find Freelancers
                  </button>
                </div>
              )}
            </section>

            <section className="pb-6">
              <h2 className="mb-6 text-2xl font-bold">Recent Proposals</h2>

              {recentProposals.length > 0 ? (
                <div className="space-y-4">
                  {recentProposals.map((proposal) => (
                    <div key={proposal.id} className="rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">{proposal.jobTitle}</h3>
                          <p className="text-gray-600">From: {proposal.freelancer.name}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${proposal.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : proposal.status === "ACCEPTED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {proposal.status}
                        </span>
                      </div>

                      <p className="mb-3 text-sm text-gray-600">{proposal.coverLetter?.substring(0, 100)}...</p>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-600">₹{proposal.bidAmount?.toLocaleString("en-IN")}</span>
                        <p className="text-xs text-gray-500">{new Date(proposal.createdAt).toLocaleDateString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
                  <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No proposals received yet</p>
                </div>
              )}
            </section>

            <section className="pb-6">
              <h2 className="mb-6 text-2xl font-bold">Your Top Freelancers</h2>

              {topFreelancers.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                  {topFreelancers.map((freelancer) => (
                    <div key={freelancer.id} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-indigo-100">
                        <img
                          src={freelancer.profile_image ? `${import.meta.env.VITE_API_BASE_URL}${freelancer.profile_image}` : "/default-avatar.png"}
                          alt={freelancer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{freelancer.name}</h3>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">{freelancer.title}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
                  <Users size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">No freelancers worked with yet</p>
                </div>
              )}
            </section>

            <section className="pb-6">
              <h2 className="mb-6 text-2xl font-bold">Quick Actions</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <button onClick={() => handleSelectItem("post-job")} className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:shadow-lg">
                  <Briefcase className="mx-auto mb-4 text-indigo-600" size={40} />
                  <h3 className="text-lg font-bold">Post a Job</h3>
                  <p className="mt-2 text-sm text-gray-600">Create a new job posting and find talent</p>
                </button>
                <button onClick={() => handleSelectItem("find-freelancers")} className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:shadow-lg">
                  <Search className="mx-auto mb-4 text-green-600" size={40} />
                  <h3 className="text-lg font-bold">Browse Freelancers</h3>
                  <p className="mt-2 text-sm text-gray-600">Discover and hire top talent</p>
                </button>
                <button onClick={() => handleSelectItem("my-jobs")} className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:shadow-lg">
                  <TrendingUp className="mx-auto mb-4 text-purple-600" size={40} />
                  <h3 className="text-lg font-bold">My Jobs</h3>
                  <p className="mt-2 text-sm text-gray-600">Manage and track your job postings</p>
                </button>
              </div>
            </section>

            {showModal && selectedContract && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                  <div className="flex items-center justify-between bg-indigo-600 p-6 text-white">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedContract.freelancer.name}</h2>
                      <p className="text-indigo-100">{selectedContract.freelancer.title}</p>
                    </div>
                    <button onClick={() => setShowModal(false)} className="text-3xl transition hover:rotate-90">
                      ×
                    </button>
                  </div>

                  <div className="space-y-5 p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-gray-500">Contract Amount</p>
                        <p className="text-xl font-bold text-indigo-600">₹{selectedContract.amount?.toLocaleString("en-IN")}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-gray-500">Status</p>
                        <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
                          {selectedContract.status}
                        </span>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p>{selectedContract.startDate ? new Date(selectedContract.startDate).toLocaleDateString("en-IN") : "N/A"}</p>
                      </div>
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p>{selectedContract.dueDate ? new Date(selectedContract.dueDate).toLocaleDateString("en-IN") : "N/A"}</p>
                      </div>
                    </div>

                    {selectedContract.job?.title && (
                      <div className="rounded-xl bg-indigo-50 p-4">
                        <p className="text-sm text-gray-500">Job Title</p>
                        <h3 className="text-lg font-bold">{selectedContract.job.title}</h3>
                      </div>
                    )}

                    {selectedContract.description && (
                      <div>
                        <h4 className="mb-2 font-semibold">Description</h4>
                        <p className="leading-7 text-gray-600">{selectedContract.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end border-t p-5">
                    <button onClick={() => setShowModal(false)} className="rounded-xl bg-gray-200 px-6 py-2 hover:bg-gray-300">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 lg:px-6">
      <div className="mx-auto flex max-w-9xl flex-col gap-6 lg:flex-row">
        <CurvedSidebar
          title="Client Hub"
          subtitle="Client Menu"
          links={sidebarLinks}
          activeItem={activeView}
          onSelectItem={handleSelectItem}
          footerAction={{ label: "Logout", icon: LogOut, onClick: handleLogout }}
        />

        <div className="flex-1">{renderRightPanel()}</div>
      </div>
    </div>
  );
}
