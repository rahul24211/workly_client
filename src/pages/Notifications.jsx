// src/pages/Notifications.jsx
// @ts-nocheck

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import {
  Bell, CheckCircle, MessageCircle, Briefcase, Award,
  Loader, Check, Mail, ChevronLeft, ChevronRight, Inbox,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";

const LIMIT = 10;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtTime = (d) => {
  if (!d) return "";
  const diff = Date.now() - new Date(d).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

const TYPE_MAP = {
  Proposal:  { icon: Briefcase,     bg: "bg-blue-100",   text: "text-blue-600",   ring: "ring-blue-200"   },
  Message:   { icon: MessageCircle, bg: "bg-violet-100", text: "text-violet-600", ring: "ring-violet-200" },
  Review:    { icon: Award,         bg: "bg-amber-100",  text: "text-amber-600",  ring: "ring-amber-200"  },
  Contract:  { icon: CheckCircle,   bg: "bg-green-100",  text: "text-green-600",  ring: "ring-green-200"  },
  default:   { icon: Bell,          bg: "bg-slate-100",  text: "text-slate-500",  ring: "ring-slate-200"  },
};

const getType = (title = "") => {
  const key = Object.keys(TYPE_MAP).find((k) => k !== "default" && title.includes(k));
  return TYPE_MAP[key] || TYPE_MAP.default;
};

const initials = (name) =>
  name ? name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";

// ─── Notification Row ─────────────────────────────────────────────────────────
function NotificationRow({ notification, onMarkRead, marking, onNavigate }) {
  const type = getType(notification.title);
  const Icon = type.icon;
  const sender = notification.sender;
  const isUnread = !notification.isRead;
  const isApprovalNotification = /approval|approve|approved|accepted|reject|rejected|pending/i.test(`${notification.title || ""} ${notification.message || ""}`);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => isApprovalNotification && onNavigate?.(notification)}
      onKeyDown={(event) => {
        if ((event.key === "Enter" || event.key === " ") && isApprovalNotification) {
          event.preventDefault();
          onNavigate?.(notification);
        }
      }}
      className={`relative flex items-start gap-4 px-5 py-4 rounded-2xl border transition-all cursor-pointer ${
        isUnread
          ? "bg-indigo-50/60 border-indigo-100"
          : "bg-white border-slate-100"
      }`}
    >
      {/* Unread dot */}
      {isUnread && (
        <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-indigo-500" />
      )}

      {/* Icon / Avatar */}
      <div className="flex-shrink-0 relative">
        {sender?.profile_image ? (
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${sender.profile_image}`}
            alt={sender.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-2 ring-offset-1 ${type.bg} ${type.text} ${type.ring}`}>
            {sender ? (
              <span className="text-xs font-bold">{initials(sender.name)}</span>
            ) : (
              <Icon size={18} />
            )}
          </div>
        )}
        {/* Type badge over avatar */}
        <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${type.bg} ${type.text} ring-2 ring-white`}>
          <Icon size={10} />
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`text-sm font-semibold ${isUnread ? "text-slate-900" : "text-slate-700"}`}>
            {notification.title}
          </p>
        </div>
        <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
          {notification.message}
        </p>
        <p className="text-xs text-slate-400 mt-1.5">{fmtTime(notification.createdAt)}</p>
      </div>

      {/* Mark read button */}
      {isUnread && (
        <button
          onClick={(event) => {
            event.stopPropagation();
            onMarkRead(notification.id);
          }}
          disabled={marking === notification.id}
          title="Mark as read"
          className="flex-shrink-0 w-8 h-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition disabled:opacity-50"
        >
          {marking === notification.id
            ? <Loader size={13} className="animate-spin" />
            : <Mail size={13} />
          }
        </button>
      )}
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronLeft size={15} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold border transition ${
            p === page
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Notifications({ embedded = false }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const [marking, setMarking] = useState(null); // id of notification being marked
  const [markingAll, setMarkingAll] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchNotifications = useCallback(async (p = page, silent = false) => {
    try {
      if (!silent) setLoading(true); else setRefreshing(true);
      const response = await authAPI.getNotifications(p, LIMIT);
      const data = response.data;
      setNotifications(data.notifications || []);
      setPagination(data.pagination || { total: 0, totalPages: 1 });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page]);

  useEffect(() => {
    fetchNotifications(page);
  }, [page]);

  // Auto-refresh every 30s silently
  useEffect(() => {
    const interval = setInterval(() => fetchNotifications(page, true), 30000);
    return () => clearInterval(interval);
  }, [page, fetchNotifications]);

  const handleMarkRead = async (id) => {
    try {
      setMarking(id);
      await authAPI.markNotificationRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch {
      toast.error("Failed to mark as read");
    } finally {
      setMarking(null);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setMarkingAll(true);
      await authAPI.markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark all as read");
    } finally {
      setMarkingAll(false);
    }
  };

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNotificationClick = (notification) => {
    const combinedText = `${notification?.title || ""} ${notification?.message || ""}`.toLowerCase();

    if (user?.role === "FREELANCER") {
      if (combinedText.includes("rejected")) {
        navigate("/approval-rejected");
        return;
      }

      if (combinedText.includes("approved") || combinedText.includes("accepted") || combinedText.includes("approval")) {
        navigate("/freelancerDashboard");
        return;
      }
    }

    if (combinedText.includes("approval") || combinedText.includes("pending")) {
      navigate("/adminDashboard/approvals");
    }
  };

  // Client-side filter (read/unread) on current page data
  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const hasUnread = notifications.some((n) => !n.isRead);

  const FILTERS = [
    { id: "all",    label: "All" },
    { id: "unread", label: "Unread" },
    { id: "read",   label: "Read" },
  ];

  // ── Loading state ──
  if (loading) {
    return (
      <div className={`bg-slate-50 flex items-center justify-center ${embedded ? "min-h-[40vh]" : "min-h-screen"}`}>
        <div className="text-center">
          <Loader className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
          <p className="mt-3 text-sm text-slate-500">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-slate-50 ${embedded ? "py-0 px-0" : "min-h-screen py-8 px-4"}`}>
      <div className={`mx-auto ${embedded ? "w-full" : "max-w-6xl"}`}>

        {/* Header */}
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {pagination.total} total
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh button */}
            <button
              onClick={() => fetchNotifications(page, true)}
              disabled={refreshing}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            </button>

            {/* Mark all read */}
            {hasUnread && (
              <button
                onClick={handleMarkAllRead}
                disabled={markingAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {markingAll
                  ? <Loader size={13} className="animate-spin" />
                  : <Check size={13} />
                }
                Mark all read
              </button>
            )}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 mb-5">
          {FILTERS.map(({ id, label }) => {
            const count = id === "all"
              ? notifications.length
              : notifications.filter((n) => id === "unread" ? !n.isRead : n.isRead).length;
            return (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition ${
                  filter === id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  filter === id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Inbox size={24} className="text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">
              {filter === "unread" ? "No unread notifications" : "No notifications yet"}
            </p>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="mt-3 text-xs text-indigo-600 font-semibold hover:underline"
              >
                View all
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((n) => (
              <NotificationRow
                key={n.id}
                notification={n}
                onMarkRead={handleMarkRead}
                marking={marking}
                onNavigate={handleNotificationClick}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPage={handlePageChange}
        />

      </div>
    </div>
  );
}