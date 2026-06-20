// src/components/home/Newsletter.jsx

import { motion } from "motion/react";
import { Mail, Send, BellRing } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl md:p-14"
        >
          {/* Background Effects */}
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            
            {/* Left */}
            <div>
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/20 text-green-400">
                <BellRing size={32} />
              </div>

              <h2 className="text-4xl font-bold text-white md:text-5xl">
                Stay Updated
              </h2>

              <p className="mt-5 max-w-xl text-lg text-slate-300">
                Subscribe to our newsletter and receive the latest
                freelance opportunities, hiring tips, industry news,
                and platform updates directly in your inbox.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-slate-300">
                  Weekly Job Alerts
                </div>

                <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-slate-300">
                  Hiring Insights
                </div>

                <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-slate-300">
                  Platform Updates
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  Join Our Community
                </h3>

                <form className="space-y-4">
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-green-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-green-600 font-semibold text-white transition hover:bg-green-700"
                  >
                    Subscribe Now
                    <Send size={18} />
                  </button>
                </form>

                <p className="mt-4 text-center text-sm text-slate-400">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 mt-12 grid gap-5 border-t border-white/10 pt-10 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-400">
                50K+
              </h3>
              <p className="text-slate-400">
                Newsletter Subscribers
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-400">
                200K+
              </h3>
              <p className="text-slate-400">
                Freelance Opportunities
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-400">
                99%
              </h3>
              <p className="text-slate-400">
                User Satisfaction
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;