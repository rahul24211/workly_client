// src/components/home/CTABanner.jsx

import { motion } from "motion/react";
import { ArrowRight, Briefcase, Users } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700" />

      {/* Blur Effects */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-[40px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl md:p-14"
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            
            {/* Left Content */}
            <div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
                🚀 Start Today
              </span>

              <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
                Ready to Build Your Next
                <span className="block">
                  Amazing Project?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg text-green-50">
                Join thousands of businesses and freelancers already
                using FreeLincer to hire talent, complete projects,
                and grow faster than ever before.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-green-600 transition hover:scale-105">
                  Hire Talent
                  <ArrowRight size={18} />
                </button>

                <button className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
                  Find Work
                </button>
              </div>
            </div>

            {/* Right Cards */}
            <div className="grid gap-5">
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    <Users className="text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      50K+
                    </h3>

                    <p className="text-green-50">
                      Verified Freelancers
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 5,
                }}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
                    <Briefcase className="text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      200K+
                    </h3>

                    <p className="text-green-50">
                      Completed Projects
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                <h3 className="text-3xl font-bold text-white">
                  99%
                </h3>

                <p className="mt-2 text-green-50">
                  Client Satisfaction Rate
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;