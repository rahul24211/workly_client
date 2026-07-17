// src/components/layout/Navbar.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Use AuthContext as single source of truth
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!user;
  const isDashboardRoute = ["/adminDashboard", "/clientDashboard", "/freelancerDashboard"].includes(location.pathname);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Find Talent", href: "/freelancers" },
  ];

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
          {!isDashboardRoute && (
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="font-medium text-slate-600 transition hover:text-green-600"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoggedIn && user ? null : (
              /* Login & Signup */
              <>
                <button className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100">
                  <Link to="/login">Login</Link>
                </button>
                <button className="rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700">
                  <Link to="/Register">Sign Up</Link>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-sm bg-white shadow-2xl lg:hidden"
            >
              {/* Mobile menu content - same structure as desktop */}
              {/* Omitted for brevity - mirrors desktop structure */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
