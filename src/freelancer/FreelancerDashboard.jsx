import { motion } from "framer-motion";
import {
  Briefcase,
  FileText,
  IndianRupee,
  Star,
  Bell,
  Loader,
  LayoutDashboard,
  FileCheck2,
  MessageSquareText,
  UserCircle2,
  Settings,
  LogOut,
  Compass,
  Bookmark,
  ClipboardList,
  BellRing,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { freelancerAPI } from "../services/api";
import { toast } from "react-toastify";
import CurvedSidebar from "../components/CurvedSidebar";
import { useAuth } from "../context/AuthContext";
import BrowseJobs from "../pages/BrowseJobs";
import MyProposals from "../pages/MyProposals";
import MyContracts from "../pages/MyContracts";
import SavedJobs from "../pages/SavedJobs";
import FreelancerProfile from "./FreelancerProfile";
import Chat from "../pages/Chat";
import Notifications from "../pages/Notifications";

const getFreelancerActiveView = (pathname) => {
  const segment = pathname.replace("/freelancerDashboard", "").replace(/^\/+/, "");

  switch (segment) {
    case "profile":
      return "profile";
    case "browse-jobs":
      return "browse-jobs";
    case "proposals":
      return "my-proposals";
    case "contracts":
      return "contracts";
    case "saved-jobs":
      return "saved-jobs";
    case "messages":
      return "messages";
    case "notifications":
      return "notifications";
    default:
      return "dashboard";
  }
};

export default function FreelancerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const activeView = getFreelancerActiveView(location.pathname);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard stats and contracts
      const dashboardResponse = await freelancerAPI.getFreelancerDashboard();
      setDashboardData(dashboardResponse.data.data);

      // Fetch recent notifications
      const notificationsResponse = await freelancerAPI.getNotifications(5, 0);
      setNotifications(notificationsResponse.data.data.notifications || []);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      setError(err.response?.data?.message || "Failed to load dashboard");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fontStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
      .ff-serif { font-family: 'Fraunces', serif; }
      .ff-sans { font-family: 'Inter', sans-serif; }
    `}</style>
  );

  if (loading) {
    return (
      <div className="ff-sans flex min-h-screen items-center justify-center bg-[#F7F8F5]">
        {fontStyles}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#0F2B22]/10" />
            <Loader size={32} className="relative animate-spin text-[#0F2B22]" />
          </div>
          <p className="text-[#6B7C74]">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ff-sans flex min-h-screen items-center justify-center bg-[#F7F8F5] px-4">
        {fontStyles}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-sm rounded-3xl border border-[#F3D0CF] bg-white p-8 text-center shadow-sm"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBEAEA] text-[#B3261E]">
            <AlertTriangle size={26} />
          </div>
          <p className="ff-serif mb-2 text-lg font-semibold text-[#14231C]">
            Error loading dashboard
          </p>
          <p className="mb-6 text-sm text-[#6B7C74]">{error}</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={fetchDashboardData}
            className="rounded-xl bg-[#0F2B22] px-6 py-2.5 font-semibold text-white transition hover:bg-[#153A2C]"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const stats = dashboardData?.stats ? [
    {
      title: "Active Contracts",
      value: dashboardData.stats.activeContracts,
      icon: Briefcase,
      color: "bg-[#0F2B22]",
    },
    {
      title: "Proposals",
      value: dashboardData.stats.totalProposals,
      icon: FileText,
      color: "bg-[#C98A1F]",
    },
    {
      title: "Earnings",
      value: `₹${(dashboardData.stats.totalEarnings || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-[#1C7C3E]",
    },
    {
      title: "Rating",
      value: dashboardData.stats.averageRating || "0",
      icon: Star,
      color: "bg-[#E8B34C]",
    },
  ] : [];

  const activeContracts = dashboardData?.activeContracts || [];
  const recentNotifications = notifications.slice(0, 4);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, to: "/freelancerDashboard" },
    { id: "profile", label: "Profile", icon: UserCircle2, to: "/freelancerDashboard/profile" },
    { id: "browse-jobs", label: "Browse Jobs", icon: Compass, to: "/freelancerDashboard/browse-jobs" },
    { id: "my-proposals", label: "My Proposals", icon: FileCheck2, to: "/freelancerDashboard/proposals" },
    { id: "contracts", label: "My Contracts", icon: ClipboardList, to: "/freelancerDashboard/contracts" },
    { id: "saved-jobs", label: "Saved Jobs", icon: Bookmark, to: "/freelancerDashboard/saved-jobs" },
    { id: "messages", label: "Messages", icon: MessageSquareText, to: "/freelancerDashboard/messages" },
    { id: "notifications", label: "Notifications", icon: BellRing, to: "/freelancerDashboard/notifications" },
  ];

  const handleSelectItem = (view) => {
    if (view === "messages") {
      navigate("/freelancerDashboard/messages");
      return;
    }

    if (view === "notifications") {
      navigate("/freelancerDashboard/notifications");
      return;
    }

    const viewToRoute = {
      dashboard: "/freelancerDashboard",
      profile: "/freelancerDashboard/profile",
      "browse-jobs": "/freelancerDashboard/browse-jobs",
      "my-proposals": "/freelancerDashboard/proposals",
      contracts: "/freelancerDashboard/contracts",
      "saved-jobs": "/freelancerDashboard/saved-jobs",
      notifications: "/freelancerDashboard/notifications",
    };

    navigate(viewToRoute[view] || "/freelancerDashboard");
  };

  const renderRightPanel = () => {
    switch (activeView) {
      case "profile":
        return <FreelancerProfile embedded />;
      case "browse-jobs":
        return <BrowseJobs embedded />;
      case "my-proposals":
        return <MyProposals embedded />;
      case "contracts":
        return <MyContracts embedded />;
      case "saved-jobs":
        return <SavedJobs embedded />;
      case "messages":
        return <Chat />;
      case "notifications":
        return <Notifications embedded />;
      case "dashboard":
      default:
        return (
          <>
            {/* Welcome banner */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mb-8 flex flex-col gap-4 overflow-hidden rounded-[32px] bg-[#0F2B22] p-6 text-white shadow-[0_20px_60px_-20px_rgba(15,43,34,0.45)] sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle, #E8B34C 0%, transparent 70%)" }}
              />
              <div className="relative">
                <h1 className="ff-serif text-2xl font-semibold sm:text-3xl">Welcome 👋</h1>
                <p className="ff-sans mt-1 text-[#B9C7BE]">
                  Manage your freelance work here.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={fetchDashboardData}
                className="ff-sans relative flex items-center gap-2 self-start rounded-2xl bg-white/15 px-4 py-2.5 font-medium transition hover:bg-white/25 sm:self-auto"
              >
                <RefreshCw size={16} />
                Refresh
              </motion.button>
            </motion.div>

            {/* Stat cards */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
            >
              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -4 }}
                    className="rounded-[24px] border border-[#E4E8E3] bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5"
                  >
                    <div
                      className={`${item.color} mb-3 flex h-11 w-11 items-center justify-center rounded-[14px] text-white sm:mb-4 sm:h-12 sm:w-12`}
                    >
                      <Icon size={20} />
                    </div>

                    <p className="ff-sans text-xs text-[#6B7C74] sm:text-sm">{item.title}</p>

                    <h2 className="ff-serif mt-1 text-xl font-semibold text-[#14231C] sm:mt-2 sm:text-2xl">
                      {item.value}
                    </h2>
                  </motion.div>
                );
              })}
            </motion.div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {/* Active Contracts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-[24px] border border-[#E4E8E3] bg-white p-5 shadow-sm"
              >
                <h2 className="ff-serif mb-4 flex items-center gap-2 text-lg font-semibold text-[#14231C]">
                  <Briefcase size={18} className="text-[#0F2B22]" />
                  Active Contracts
                </h2>

                {activeContracts.length > 0 ? (
                  <div className="space-y-3">
                    {activeContracts.map((contract, idx) => (
                      <motion.div
                        key={contract.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.06 }}
                        className="rounded-[18px] border border-[#EEF1EC] p-3 transition hover:border-[#E8B34C]/40 hover:bg-[#F7F8F5]"
                      >
                        <h3 className="ff-sans font-semibold text-[#14231C]">{contract.jobTitle}</h3>
                        <p className="ff-sans text-sm text-[#6B7C74]">
                          ₹{contract.amount?.toLocaleString()} • {contract.status}
                        </p>
                        {contract.dueDate && (
                          <p className="ff-sans mt-1 text-xs text-[#9BAAA2]">
                            Due: {new Date(contract.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-[#9BAAA2]">
                    <p className="ff-sans">No active contracts</p>
                  </div>
                )}
              </motion.div>

              {/* Recent Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="rounded-[24px] border border-[#E4E8E3] bg-white p-5 shadow-sm"
              >
                <h2 className="ff-serif mb-4 flex items-center gap-2 text-lg font-semibold text-[#14231C]">
                  <Bell size={18} className="text-[#0F2B22]" />
                  Recent Notifications
                </h2>

                {recentNotifications.length > 0 ? (
                  <ul className="space-y-3 text-[#6B7C74]">
                    {recentNotifications.map((notification, idx) => (
                      <motion.li
                        key={notification.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + idx * 0.06 }}
                        className={`rounded-[16px] p-3 ${
                          notification.isRead
                            ? "bg-[#F7F8F5]"
                            : "border-l-4 border-[#E8B34C] bg-[#FBF3E2]"
                        }`}
                      >
                        <p className="ff-sans text-sm font-semibold text-[#14231C]">
                          {notification.title}
                        </p>
                        <p className="ff-sans text-xs">{notification.message}</p>
                        <p className="ff-sans mt-1 text-xs text-[#9BAAA2]">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="py-8 text-center text-[#9BAAA2]">
                    <p className="ff-sans">No notifications yet</p>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="ff-sans min-h-screen overflow-x-hidden bg-[#F7F8F5] px-2 py-3 sm:px-4 sm:py-6 lg:px-6">
      {fontStyles}
      <div className="mx-auto flex max-w-9xl flex-col gap-4 lg:flex-row lg:gap-6">
        <CurvedSidebar
          title="Freelancer Hub"
          subtitle="Freelancer Menu"
          links={sidebarLinks}
          activeItem={activeView}
          onSelectItem={handleSelectItem}
          footerAction={{ label: "Logout", icon: LogOut, onClick: handleLogout }}
        />

        <div className="min-w-0 flex-1 lg:ml-[19rem]">{renderRightPanel()}</div>
      </div>
    </div>
  );
}