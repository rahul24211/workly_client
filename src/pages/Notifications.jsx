import { useState, useEffect } from "react";
import { authAPI } from "../services/api";
import {
  Bell,
  CheckCircle,
  MessageCircle,
  Briefcase,
  Award,
  Loader,
  Check,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRead, setFilterRead] = useState("all");

  useEffect(() => {
    fetchNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await authAPI.getNotifications();
      const notificationsData = response.data.notifications || response.data.data || [];
      setNotifications(notificationsData);
    } catch (error) {
      console.error(error);
      if (!loading) {
        // Only show error on refresh, not on initial load
        toast.error("Failed to load notifications");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (notificationId) => {
    try {
      await authAPI.markNotificationRead(notificationId);
      setNotifications(
        notifications.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
      toast.success("Marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await authAPI.markAllNotificationsRead();
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error(error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  const getNotificationIcon = (title) => {
    if (title?.includes("Proposal")) return <Briefcase size={20} />;
    if (title?.includes("Message")) return <MessageCircle size={20} />;
    if (title?.includes("Review")) return <Award size={20} />;
    if (title?.includes("Contract")) return <CheckCircle size={20} />;
    return <Bell size={20} />;
  };

  const getNotificationColor = (title) => {
    if (title?.includes("Proposal")) return "bg-blue-100 text-blue-700";
    if (title?.includes("Message")) return "bg-purple-100 text-purple-700";
    if (title?.includes("Review")) return "bg-yellow-100 text-yellow-700";
    if (title?.includes("Contract")) return "bg-green-100 text-green-700";
    return "bg-slate-100 text-slate-700";
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filterRead === "unread") return !n.isRead;
    if (filterRead === "read") return n.isRead;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto" />
          <p className="mt-4 text-slate-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-600 mt-2">
              {notifications.filter((n) => !n.isRead).length} unread
            </p>
          </div>

          {notifications.some((n) => !n.isRead) && (
            <button
              onClick={handleMarkAllRead}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition flex items-center gap-2"
            >
              <Check size={18} />
              Mark All Read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex gap-4 flex-wrap">
          {["all", "unread", "read"].map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterRead(filter)}
              className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                filterRead === filter
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {filter}
              {filter !== "all" && (
                <span className="ml-2">
                  (
                  {
                    notifications.filter((n) =>
                      filter === "unread" ? !n.isRead : n.isRead
                    ).length
                  }
                  )
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500">
              {filterRead === "unread"
                ? "No unread notifications"
                : "No notifications"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl shadow-md p-6 transition ${
                  notification.isRead
                    ? "bg-white"
                    : "bg-indigo-50 border-l-4 border-indigo-600"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`p-3 rounded-lg flex-shrink-0 ${getNotificationColor(
                      notification.title
                    )}`}
                  >
                    {getNotificationIcon(notification.title)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900">
                      {notification.title}
                    </h3>
                    <p className="text-slate-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex gap-2">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkRead(notification.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition"
                        title="Mark as read"
                      >
                        <Mail size={18} className="text-indigo-600" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
