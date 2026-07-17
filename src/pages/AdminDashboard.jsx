import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Users, Briefcase, FileText, Clock, AlertTriangle } from "lucide-react";
import { adminAPI } from "../services/api";
import AdminSidebar from "../components/AdminSidebar";
import AdminProfile from "./AdminProfile";
import AdminCategoryManagement from "./AdminCategoryManagement";
import AdminFreelancerApprovals from "./AdminFreelancerApprovals";
import Notifications from "./Notifications";

const getAdminActiveView = (pathname) => {
  const segment = pathname.replace("/adminDashboard", "").replace(/^\/+/, "");

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const activeView = getAdminActiveView(location.pathname);

  useEffect(() => {
    fetchAdminData();
  }, []);

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
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-100 max-w-xl text-center">
          <AlertTriangle className="mx-auto text-red-600 mb-4" size={40} />
          <h2 className="text-xl font-semibold mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchAdminData}
            className="bg-indigo-600 text-white px-5 py-3 rounded-2xl hover:bg-indigo-700 transition"
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

  const StatCard = ({ icon: Icon, label, value, color = "indigo" }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mt-3">{value ?? 0}</p>
        </div>
        <Icon className={`text-${color}-600`} size={32} />
      </div>
    </div>
  );

  const renderRightPanel = () => {
    switch (activeView) {
      case "users":
        return (
          <div className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">User Management</h2>
                <p className="text-sm text-slate-500">Browse the current user roster from a dedicated route.</p>
              </div>
            </div>
            {users.length > 0 ? (
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-[18px] border border-slate-100 bg-slate-50 p-4">
                    <div>
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-sm text-slate-500">{user.email}</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-600">No users found yet.</p>
            )}
          </div>
        );
      case "profile":
        return <AdminProfile embedded />;
      case "category":
        return <AdminCategoryManagement embedded />;
      case "approvals":
        return <AdminFreelancerApprovals embedded />;
      case "notifications":
        return <Notifications embedded />;
      case "dashboard":
      default:
        return (
          <>
            <section className="rounded-[32px] bg-gradient-to-r from-slate-900 via-indigo-700 to-sky-700 px-8 py-12 text-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)]">
              <div className="max-w-5xl">
                <h1 className="text-4xl font-bold mb-3">Admin Dashboard</h1>
                <p className="text-slate-100 max-w-2xl">
                  Monitor users, jobs, proposals, and pending freelancer approvals from the admin panel.
                </p>
              </div>
            </section>

            <section className="mx-auto py-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard icon={Users} label="Total Users" value={stats.totalUsers} color="indigo" />
                <StatCard icon={ShieldCheck} label="Clients" value={stats.totalClients} color="emerald" />
                <StatCard icon={Briefcase} label="Freelancers" value={stats.totalFreelancers} color="sky" />
                <StatCard icon={FileText} label="Total Jobs" value={stats.totalJobs} color="purple" />
                <StatCard icon={Clock} label="Total Proposals" value={stats.totalProposals} color="yellow" />
              </div>
            </section>

            <section className="space-y-8 pb-4">
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Pending Freelancer Approvals</h2>
                  {pendingFreelancers.length > 0 ? (
                    <div className="space-y-4">
                      {pendingFreelancers.slice(0, 5).map((freelancer) => (
                        <button
                          key={freelancer.id}
                          onClick={() => window.location.assign(`/admin/freelancer/${freelancer.id}`)}
                          className="w-full text-left rounded-[20px] border border-slate-100 p-4 hover:shadow-sm transition bg-white"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-semibold text-slate-900">{freelancer.name}</p>
                              <p className="text-sm text-slate-500">{freelancer.email}</p>
                            </div>
                            <span className="text-xs font-semibold uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                              {freelancer.approval_status}
                            </span>
                          </div>
                          {freelancer.FreelancerProfile?.skills && (
                            <p className="mt-3 text-sm text-slate-600">Skills: {freelancer.FreelancerProfile.skills}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">No pending freelancers currently awaiting approval.</p>
                  )}
                </div>

                <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                  {users.length > 0 ? (
                    <div className="space-y-3">
                      {users.slice(0, 6).map((user) => (
                        <div key={user.id} className="flex items-center justify-between gap-4 p-3 rounded-[18px] bg-slate-50">
                          <div>
                            <p className="font-medium text-slate-900">{user.name}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                          <span className="text-xs font-semibold uppercase text-slate-700 bg-slate-200 px-3 py-1 rounded-full">
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
    <div className="min-h-screen bg-slate-50 px-4 py-6 lg:px-6">
      <div className="mx-auto flex max-w-9xl flex-col gap-6 lg:flex-row">
        <AdminSidebar activeItem={activeView} onSelectItem={handleSelectItem} />

        <div className="flex-1">{renderRightPanel()}</div>
      </div>
    </div>
  );
}
