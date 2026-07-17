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
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { freelancerAPI } from "../services/api";
import { toast } from "react-toastify";
import CurvedSidebar from "../components/CurvedSidebar";
import { useAuth } from "../context/AuthContext";

export default function FreelancerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader size={40} className="animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold mb-2">Error loading dashboard</p>
          <p className="mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats ? [
    {
      title: "Active Contracts",
      value: dashboardData.stats.activeContracts,
      icon: Briefcase,
      color: "bg-blue-500",
    },
    {
      title: "Proposals",
      value: dashboardData.stats.totalProposals,
      icon: FileText,
      color: "bg-orange-500",
    },
    {
      title: "Earnings",
      value: `₹${(dashboardData.stats.totalEarnings || 0).toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-green-500",
    },
    {
      title: "Rating",
      value: dashboardData.stats.averageRating || "0",
      icon: Star,
      color: "bg-yellow-500",
    },
  ] : [];

  const activeContracts = dashboardData?.activeContracts || [];
  const recentNotifications = notifications.slice(0, 4);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarLinks = [
    { to: "/freelancerdashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/freelancerProfile", label: "Profile", icon: UserCircle2 },
    { to: "/browse-jobs", label: "Browse Jobs", icon: Compass },
    { to: "/my-proposals", label: "My Proposals", icon: FileCheck2 },
    { to: "/my-contracts-freelancer", label: "My Contracts", icon: ClipboardList },
    { to: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
    { to: "/chat", label: "Messages", icon: MessageSquareText },
    { to: "/notifications", label: "Notifications", icon: BellRing },
  ];

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 lg:px-6">
      <div className="mx-auto flex max-w-9xl flex-col gap-6 lg:flex-row">
        <CurvedSidebar
          title="Freelancer Hub"
          subtitle="Freelancer Menu"
          links={sidebarLinks}
          footerAction={{ label: "Logout", icon: LogOut, onClick: handleLogout }}
        />

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col gap-4 rounded-[32px] bg-gradient-to-r from-indigo-700 via-slate-900 to-sky-700 p-8 text-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold">Welcome 👋</h1>
              <p className="text-slate-200">
                Manage your freelance work here.
              </p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="rounded-[16px] bg-white/15 px-4 py-2 font-medium transition hover:bg-white/25"
            >
              Refresh
            </button>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="rounded-[24px] bg-white p-5 shadow-sm"
                >
                  <div
                    className={`${item.color} mb-4 flex h-12 w-12 items-center justify-center rounded-[16px] text-white`}
                  >
                    <Icon size={22} />
                  </div>

                  <p className="text-gray-500">{item.title}</p>

                  <h2 className="mt-2 text-2xl font-bold">
                    {item.value}
                  </h2>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[24px] bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-lg">
                Active Contracts
              </h2>

              {activeContracts.length > 0 ? (
                <div className="space-y-3">
                  {activeContracts.map((contract) => (
                    <div key={contract.id} className="rounded-[18px] border border-slate-100 p-3 transition hover:bg-slate-50">
                      <h3 className="font-semibold">{contract.jobTitle}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{contract.amount?.toLocaleString()} • {contract.status}
                      </p>
                      {contract.dueDate && (
                        <p className="mt-1 text-xs text-gray-400">
                          Due: {new Date(contract.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No active contracts</p>
                </div>
              )}
            </div>

            <div className="rounded-[24px] bg-white p-5 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-lg">
                <Bell size={20} />
                Recent Notifications
              </h2>

              {recentNotifications.length > 0 ? (
                <ul className="space-y-3 text-gray-600">
                  {recentNotifications.map((notification) => (
                    <li
                      key={notification.id}
                      className={`rounded-[16px] p-2 ${
                        notification.isRead
                          ? "bg-gray-50"
                          : "border-l-4 border-indigo-600 bg-indigo-50"
                      }`}
                    >
                      <p className="text-sm font-semibold">{notification.title}</p>
                      <p className="text-xs">{notification.message}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}