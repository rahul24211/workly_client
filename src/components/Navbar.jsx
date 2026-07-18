// src/components/layout/Navbar.jsx

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.png";

const Navbar = () => {
  // Use AuthContext as single source of truth
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!user;
  const isDashboardRoute = ["/adminDashboard", "/clientDashboard", "/freelancerDashboard", "/freelancerdashboard"].some((base) =>
    location.pathname === base || location.pathname.startsWith(`${base}/`)
  );
  const isAuthRoute = ["/login", "/register", "/register-with-otp"].includes(location.pathname);
const authNavLinks = [
  { name: "About", href: "/about" },
];

const visibleNavLinks = isDashboardRoute ? [] : authNavLinks;

  const handleLogoClick = () => {
    if (!user) {
      navigate("/");
      return;
    }

    if (user.role === "CLIENT") {
      navigate("/clientDashboard");
    } else if (user.role === "FREELANCER") {
      navigate("/freelancerDashboard");
    } else if (user.role === "ADMIN") {
      navigate("/adminDashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl ">
      <div className="container mx-auto px-4 lg:px-8 mr-40">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleLogoClick}
            className="mr-0 flex items-center gap-3 cursor-pointer pr-0"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div className="flex flex-col leading-tight">
              <h1 className="text-xl font-bold text-slate-900">
                FreeLincer
              </h1>

              <p className="text-xs text-slate-500">
                Freelance Marketplace
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
        

        {/* Desktop Right Side */}
{!isDashboardRoute && (
  <div className="hidden lg:flex items-center gap-6">
    <Link
      to="/about"
      className="font-medium text-slate-600 transition hover:text-green-600"
    >
      About
    </Link>

    {!isLoggedIn && (
      <>
        <Link
          to="/login"
          className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Login
        </Link>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
  <Link
    to="/register-with-otp"
    className="group inline-flex items-center gap-2 rounded-full bg-[#0F2B22] px-5 py-2.5 font-semibold text-white transition hover:bg-[#153A2C]"
  >
    Get Started
    <ArrowRight
      size={16}
      className="transition-transform duration-200 group-hover:translate-x-1"
    />
  </Link>
</motion.div>
      </>
    )}
  </div>
)}

        </div>
      </div>

    </header>
  );
};

export default Navbar;
