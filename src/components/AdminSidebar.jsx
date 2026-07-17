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
  { to: "/adminDashboard", label: "Dashboard", icon: ShieldCheck },
  { to: "/admin-profile", label: "Profile", icon: User },
  { to: "/admin/categories", label: "Category", icon: Layers },
  { to: "/admin/freelancer-approvals", label: "Approvals", icon: ClipboardList },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <CurvedSidebar
      title="Admin Panel"
      subtitle="Admin Menu"
      links={links}
      footerAction={{ label: "Logout", icon: LogOut, onClick: handleLogout }}
    />
  );
}
