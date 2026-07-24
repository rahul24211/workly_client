import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Briefcase,
  FileText,
  Clock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  UserCheck,
  Mail,
} from "lucide-react";
import { adminAPI } from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminProfile from "./AdminProfile";
import AdminCategoryManagement from "./AdminCategoryManagement";
import AdminFreelancerApprovals from "./AdminFreelancerApprovals";
import AdminFreelancerDetail from "./AdminFreelancerDetail";
import Notifications from "./Notifications";

const getAdminActiveView = (pathname) => {
  const segment = pathname.replace("/adminDashboard", "").replace(/^\/+/, "");

  if (pathname.startsWith("/admin/freelancer/")) {
    return "approval-detail";
  }

  switch (segment) {
    case "users":
      return "users";
    case "profile":
      return "profile";
    case "categories":
      return "category";
    case "approvals":
      return "approvals";
    case "notifications":
      return "notifications";
    default:
      return "dashboard";
  }
};

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [pendingFreelancers, setPendingFreelancers] = useState([]);
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeView = getAdminActiveView(location.pathname);

  useEffect(() => {
    fetchAdminData();
  }, []);

  useEffect(() => {
    // Trigger enter animations once data is ready
    if (!loading) {
      const t = setTimeout(() => setMounted(true), 30);
      return () => clearTimeout(t);
    }
    setMounted(false);
  }, [loading, activeView]);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [dashboardRes, pendingRes, usersRes] = await Promise.all([
        adminAPI.getDashboard(),
        adminAPI.getPendingFreelancers(),
        adminAPI.getAllUsers(),
      ]);

      if (dashboardRes.data.success) {
        setDashboardData(dashboardRes.data.data);
      }
      if (pendingRes.data.success) {
        setPendingFreelancers(pendingRes.data.freelancers || []);
      }
      if (usersRes.data.success) {
        setUsers(usersRes.data.users || []);
      }
    } catch (err) {
      console.error("Error fetching admin dashboard data:", err);
      setError("Unable to load admin dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-flex mb-4">
            <div className="animate-spin w-14 h-14 border-4 border-indigo-100 border-t-indigo-600 rounded-full"></div>
            <Sparkles className="absolute inset-0 m-auto text-indigo-500 animate-pulse" size={20} />
          </div>
          <p className="text-gray-600 animate-pulse">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-red-100 max-w-xl w-full text-center animate-[fadeInUp_0.4s_ease-out]">
          <AlertTriangle className="mx-auto text-red-600 mb-4 animate-bounce" size={40} />
          <h2 className="text-xl font-semibold mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAdminData}
            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl hover:bg-indigo-700 hover:scale-[1.03] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData || {};

  const handleSelectItem = (view) => {
    if (view === "dashboard") {
      navigate("/adminDashboard");
      return;
    }

    const viewToRoute = {
      users: "/adminDashboard/users",
      profile: "/adminDashboard/profile",
      category: "/adminDashboard/categories",
      approvals: "/adminDashboard/approvals",
      notifications: "/adminDashboard/notifications",
    };

    navigate(viewToRoute[view] || "/adminDashboard");
  };

  const colorMap = {
    indigo: { text: "text-indigo-600", bg: "bg-indigo-50", ring: "group-hover:ring-indigo-200" },
    emerald: { text: "text-emerald-600", bg: "bg-emerald-50", ring: "group-hover:ring-emerald-200" },
    sky: { text: "text-sky-600", bg: "bg-sky-50", ring: "group-hover:ring-sky-200" },
    purple: { text: "text-purple-600", bg: "bg-purple-50", ring: "group-hover:ring-purple-200" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-50", ring: "group-hover:ring-yellow-200" },
  };

  const StatCard = ({ icon: Icon, label, value, color = "indigo", delay = 0 }) => {
    const c = colorMap[color] || colorMap.indigo;
    return (
      <div
        className={`group bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ring-1 ring-transparent ${c.ring} ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        style={{ transitionDelay: mounted ? `${delay}ms` : "0ms" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-slate-500 font-medium truncate">{label}</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tabular-nums">{value ?? 0}</p>
          </div>
          <div className={`shrink-0 p-3 rounded-2xl ${c.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
            <Icon className={c.text} size={24} />
          </div>
        </div>
      </div>
    );
  };

  const normalizeRole = (value) => String(value || "").trim().toUpperCase();

  const visibleUsers = users.filter((user) => {
    const role = normalizeRole(user.role);
    const approvalStatus = normalizeRole(user.approval_status || user.approvalStatus || user.status);

    if (role === "FREELANCER") {
      return approvalStatus === "APPROVED" && (roleFilter === "all" || roleFilter === "freelancers");
    }

    if (role === "CLIENT") {
      return roleFilter === "all" || roleFilter === "clients";
    }

    return false;
  });

  const renderRightPanel = () => {
    switch (activeView) {
      case "users":
        return (
          <div className="rounded-[24px] border border-slate-200 bg-white p-5 sm:p-8 shadow-sm animate-[fadeInUp_0.35s_ease-out]">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Users className="text-indigo-600" size={24} />
                  User Management
                </h2>
                <p className="text-sm text-slate-500 mt-1">Browse approved freelancers and clients from a dedicated route.</p>
              </div>
              <div className="flex items-center gap-2 rounded-[16px] border border-slate-200 bg-slate-50 p-1 overflow-x-auto">
                {[
                  { value: "all", label: "All Users" },
                  { value: "freelancers", label: "Freelancers" },
                  { value: "clients", label: "Clients" },
                ].map((filter) => (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setRoleFilter(filter.value)}
                    className={`whitespace-nowrap rounded-[12px] px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      roleFilter === filter.value
                        ? "bg-indigo-600 text-white shadow-sm scale-100"
                        : "text-slate-600 hover:bg-white hover:text-slate-900 hover:scale-[1.02]"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {visibleUsers.length > 0 ? (
              <div className="space-y-3">
                {visibleUsers.map((user, i) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-3 rounded-[18px] border border-slate-100 bg-slate-50 p-4 hover:bg-white hover:border-indigo-100 hover:shadow-sm transition-all duration-200 animate-[fadeInUp_0.3s_ease-out_backwards]"
                    style={{ animationDelay: `${Math.min(i, 10) * 40}ms` }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">
                        {user.name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{user.name}</p>
                        <p className="text-sm text-slate-500 truncate flex items-center gap-1">
                          <Mail size={12} className="shrink-0" /> {user.email}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No users found for this selection.</p>
            )}
          </div>
        );
      case "profile":
        return <AdminProfile embedded />;
      case "category":
        return <AdminCategoryManagement embedded />;
      case "approvals":
        return <AdminFreelancerApprovals embedded />;
      case "approval-detail":
        return <AdminFreelancerDetail embedded />;
      case "notifications":
        return <Notifications embedded />;
      case "dashboard":
      default:
        return (
          <>
            <section
              className={`rounded-[32px] bg-gradient-to-r from-slate-900 via-indigo-700 to-sky-700 px-6 py-10 sm:px-8 sm:py-12 text-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] relative overflow-hidden transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              }`}
            >
              <div className="absolute -right-10 -top-10 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute right-24 bottom-0 w-40 h-40 bg-sky-300/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="max-w-5xl relative">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 flex items-center gap-3">
                  <ShieldCheck className="text-sky-200" size={32} />
                  Admin Dashboard
                </h1>
                <p className="text-slate-100 max-w-2xl text-sm sm:text-base">
                  Monitor users, jobs, proposals, and pending freelancer approvals from the admin panel.
                </p>
              </div>
            </section>

            <section className="mx-auto py-8">
              <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-5">
                <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="indigo" delay={0} />
                <StatCard icon={ShieldCheck} label="Clients" value={stats.totalClients} color="emerald" delay={60} />
                <StatCard icon={Briefcase} label="Freelancers" value={stats.totalFreelancers} color="sky" delay={120} />
                <StatCard icon={FileText} label="Total Jobs" value={stats.totalJobs} color="purple" delay={180} />
                <StatCard icon={Clock} label="Total Proposals" value={stats.totalProposals} color="yellow" delay={240} />
              </div>
            </section>

            <section className="space-y-6 sm:space-y-8 pb-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <div
                  className={`bg-white rounded-[24px] shadow-sm border border-slate-200 p-5 sm:p-6 transition-all duration-500 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: mounted ? "150ms" : "0ms" }}
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                    <UserCheck className="text-amber-600" size={20} />
                    Pending Freelancer Approvals
                  </h2>
                  {pendingFreelancers.length > 0 ? (
                    <div className="space-y-4">
                      {pendingFreelancers.slice(0, 5).map((freelancer, i) => (
                        <button
                          key={freelancer.id}
                          onClick={() => navigate(`/admin/freelancer/${freelancer.id}`)}
                          className="group w-full text-left rounded-[20px] border border-slate-100 p-4 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 bg-white animate-[fadeInUp_0.3s_ease-out_backwards]"
                          style={{ animationDelay: `${i * 60}ms` }}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate">{freelancer.name}</p>
                              <p className="text-sm text-slate-500 truncate">{freelancer.email}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs font-semibold uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                                {freelancer.approval_status}
                              </span>
                              <ArrowRight
                                size={16}
                                className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200"
                              />
                            </div>
                          </div>
                          {freelancer.FreelancerProfile?.skills && (
                            <p className="mt-3 text-sm text-slate-600 truncate">Skills: {freelancer.FreelancerProfile.skills}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">No pending freelancers currently awaiting approval.</p>
                  )}
                </div>

                <div
                  className={`bg-white rounded-[24px] shadow-sm border border-slate-200 p-5 sm:p-6 transition-all duration-500 ${
                    mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  }`}
                  style={{ transitionDelay: mounted ? "220ms" : "0ms" }}
                >
                  <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="text-indigo-600" size={20} />
                    Recent Users
                  </h2>
                  {users.length > 0 ? (
                    <div className="space-y-3">
                      {users.slice(0, 6).map((user, i) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between gap-4 p-3 rounded-[18px] bg-slate-50 hover:bg-indigo-50/60 transition-colors duration-200 animate-[fadeInUp_0.3s_ease-out_backwards]"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="shrink-0 w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-semibold">
                              {user.name?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-slate-900 truncate">{user.name}</p>
                              <p className="text-sm text-slate-500 truncate">{user.email}</p>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-semibold uppercase text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
                            {user.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">No users found yet.</p>
                  )}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 px-2 py-3 sm:px-4 sm:py-6 lg:px-6">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="mx-auto flex max-w-9xl flex-col gap-4 lg:flex-row lg:gap-6">
        <AdminSidebar activeItem={activeView} onSelectItem={handleSelectItem} onCollapsedChange={setIsSidebarCollapsed} />

        <div className={`min-w-0 flex-1 transition-[margin-left] duration-300 ease-out ${isSidebarCollapsed ? "lg:ml-24" : "lg:ml-72"}`}>
          {renderRightPanel()}
        </div>
      </div>
    </div>
  );
}