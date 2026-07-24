import {
  User,
  Grid,
  Layers,
  ClipboardList,
  ShieldCheck,
  Bell,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import CurvedSidebar from "./CurvedSidebar";
import { useAuth } from "../context/AuthContext";

const links = [
  { id: "dashboard", label: "Dashboard", icon: ShieldCheck, to: "/adminDashboard" },
  { id: "users", label: "Users", icon: ShieldCheck, to: "/adminDashboard/users" },
  { id: "profile", label: "Profile", icon: User, to: "/adminDashboard/profile" },
  { id: "category", label: "Category", icon: Layers, to: "/adminDashboard/categories" },
  { id: "approvals", label: "Approvals", icon: ClipboardList, to: "/adminDashboard/approvals" },
  { id: "notifications", label: "Notifications", icon: Bell, to: "/adminDashboard/notifications" },
];

export default function AdminSidebar({ activeItem, onSelectItem, onCollapsedChange }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <CurvedSidebar
      title="Admin Panel"
      subtitle="Admin Menu"
      links={links}
      activeItem={activeItem}
      onSelectItem={onSelectItem}
      onCollapsedChange={onCollapsedChange}
      footerAction={{ label: "Logout", icon: LogOut, onClick: handleLogout }}
    />
  );
}
