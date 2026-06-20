// src/components/layout/Navbar.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, Briefcase, UserRound } from "lucide-react";

import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Find Work", href: "#" },
    { name: "Find Talent", href: "#" },
    { name: "Categories", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-14 w-14 rounded-xl object-cover"
            />

            <div>
              <h1 className="text-xl font-bold text-slate-900">FreeLincer</h1>
              <p className="text-xs text-slate-500">Freelance Marketplace</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-slate-600 transition hover:text-green-600"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search */}
            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50">
              <Search size={20} />
            </button>

            {/* Login */}
            <button className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100">
              Login
            </button>

            {/* Sign Up */}
            <button className="rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700">
              Sign Up
            </button>
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
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-screen w-[85%] max-w-sm bg-white shadow-2xl lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white font-bold">
                    F
                  </div>

                  <h2 className="font-bold text-lg">FreeLincer</h2>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <X />
                </button>
              </div>

              {/* User Card */}
              <div className="m-5 rounded-2xl bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
                    <UserRound />
                  </div>

                  <div>
                    <h3 className="font-semibold">Welcome</h3>
                    <p className="text-sm text-slate-500">
                      Join FreeLincer Today
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="px-5">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                      >
                        <Briefcase size={18} />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Buttons */}
              <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-5">
                <div className="space-y-3">
                  <button className="w-full rounded-xl border border-slate-300 py-3 font-medium">
                    Login
                  </button>

                  <button className="w-full rounded-xl bg-green-600 py-3 font-medium text-white hover:bg-green-700">
                    Create Account
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
