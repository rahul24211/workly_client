// src/components/home/HeroSection.jsx

import { motion } from "motion/react";
import {
  Search,
  ArrowRight,
  Star,
  Briefcase,
  Users,
  ShieldCheck,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid min-h-[90vh] items-center gap-12 py-16 lg:grid-cols-2">
          
          {/* Left Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700"
            >
              <Star size={16} fill="currentColor" />
              Trusted by 50,000+ freelancers worldwide
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-bold leading-tight text-slate-900 md:text-6xl"
            >
              Hire Top Talent.
              <span className="block text-green-600">
                Build Amazing Projects.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-xl text-lg text-slate-600"
            >
              FreeLincer connects businesses with skilled freelancers across
              development, design, marketing, content creation, AI, and more.
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-lg md:flex-row"
            >
              <div className="flex flex-1 items-center gap-3 px-3">
                <Search className="text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search freelancers, skills, services..."
                  className="w-full bg-transparent outline-none"
                />
              </div>

              <button className="rounded-2xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700">
                Search
              </button>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button className="flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700">
                Hire Talent
                <ArrowRight size={18} />
              </button>

              <button className="rounded-2xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100">
                Find Work
              </button>
            </motion.div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">50K+</h3>
                <p className="text-sm text-slate-500">Freelancers</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">12K+</h3>
                <p className="text-sm text-slate-500">Clients</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">200K+</h3>
                <p className="text-sm text-slate-500">Projects</p>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold">Top Freelancer</h3>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Available
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700">
                  RK
                </div>

                <div>
                  <h4 className="font-bold">Rahul Kumar</h4>
                  <p className="text-slate-500">
                    Full Stack Developer
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span>Project Success</span>
                  <span className="font-semibold">98%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-100">
                  <div className="h-3 w-[98%] rounded-full bg-green-500"></div>
                </div>

                <div className="flex justify-between">
                  <span>Hourly Rate</span>
                  <span className="font-bold text-green-600">
                    $45/hr
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            {/* <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="absolute -left-6 top-12 rounded-2xl border bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Users className="text-green-600" />
                <div>
                  <h5 className="font-semibold">10,000+</h5>
                  <p className="text-xs text-slate-500">
                    Active Clients
                  </p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="absolute -right-4 bottom-12 rounded-2xl border bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" />
                <div>
                  <h5 className="font-semibold">Secure</h5>
                  <p className="text-xs text-slate-500">
                    Payment Protection
                  </p>
                </div>
              </div>
            </motion.div> */}

            {/* <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute right-12 top-0 rounded-2xl border bg-white p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="text-green-600" />
                <div>
                  <h5 className="font-semibold">200K+</h5>
                  <p className="text-xs text-slate-500">
                    Completed Jobs
                  </p>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;