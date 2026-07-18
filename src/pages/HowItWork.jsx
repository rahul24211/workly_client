// src/components/home/HowItWorks.jsx

import { motion } from "motion/react";
import {
  FileText,
  Users,
  UserCheck,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: "01",
    title: "Post a Project",
    description:
      "Describe your project requirements, budget, and timeline. It only takes a few minutes.",
    icon: FileText,
  },
  {
    id: "02",
    title: "Receive Proposals",
    description:
      "Top freelancers submit proposals and share their experience relevant to your project.",
    icon: Users,
  },
  {
    id: "03",
    title: "Hire the Best Talent",
    description:
      "Review profiles, ratings, portfolios, and hire the freelancer that fits your needs.",
    icon: UserCheck,
  },
  {
    id: "04",
    title: "Get Work Done",
    description:
      "Collaborate, track progress, release payments securely, and complete your project.",
    icon: Rocket,
  },
];

const HowItWorks = () => {

  const navigate = useNavigate()
  return (
    <section className="relative overflow-hidden bg-[#F7F8F5] py-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .ff-serif { font-family: 'Fraunces', serif; }
        .ff-sans { font-family: 'Inter', sans-serif; }
        @keyframes ff-mesh {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(3%, -3%) scale(1.08); }
        }
        .ff-mesh-anim { animation: ff-mesh 14s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .ff-mesh-anim { animation: none !important; } }
      `}</style>

      {/* Background Blur */}
      <div className="ff-mesh-anim absolute left-0 top-0 h-80 w-80 rounded-full bg-[#0F2B22]/[0.06] blur-3xl" />
      <div
        className="ff-mesh-anim absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#E8B34C]/10 blur-3xl"
        style={{ animationDelay: "3s" }}
      />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="ff-sans rounded-full bg-[#0F2B22]/10 px-4 py-2 text-sm font-semibold text-[#0F2B22]">
            Simple Process
          </span>

          <h2 className="ff-serif mt-5 text-4xl font-semibold text-[#14231C] md:text-5xl">
            How FreeLincer Works
          </h2>

          <p className="ff-sans mt-5 text-lg text-[#6B7C74]">
            Hire expert freelancers in just a few simple steps and
            turn your ideas into successful projects.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Track */}
            <div className="absolute left-0 right-0 top-16 h-1 rounded-full bg-[#DDE3DE]" />
            {/* Animated fill — draws left to right as it enters view */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: "easeInOut", delay: 0.2 }}
              style={{ transformOrigin: "left" }}
              className="absolute left-0 right-0 top-16 h-1 rounded-full bg-gradient-to-r from-[#0F2B22] to-[#E8B34C]"
            />

            <div className="grid grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.15,
                    }}
                    className="relative text-center"
                  >
                    {/* Icon Circle */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: index * 0.15 + 0.15,
                      }}
                      whileHover={{ scale: 1.08 }}
                      className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-[#F7F8F5] bg-[#0F2B22] shadow-xl"
                    >
                      <Icon size={40} className="text-[#E8B34C]" />
                    </motion.div>

                    {/* Number */}
                    <span className="ff-sans mt-6 inline-block rounded-full bg-[#0F2B22]/10 px-4 py-2 text-sm font-bold text-[#0F2B22]">
                      Step {step.id}
                    </span>

                    <h3 className="ff-serif mt-4 text-2xl font-semibold text-[#14231C]">
                      {step.title}
                    </h3>

                    <p className="ff-sans mt-3 text-[#6B7C74]">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="relative space-y-6 lg:hidden">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[26px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#0F2B22] to-[#E8B34C]"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                className="relative rounded-3xl border border-[#E4E8E3] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0F2B22]">
                    <Icon size={24} className="text-[#E8B34C]" />
                  </div>

                  <div>
                    <span className="ff-sans text-sm font-bold text-[#0F2B22]">
                      STEP {step.id}
                    </span>

                    <h3 className="ff-serif mt-1 text-xl font-semibold text-[#14231C]">
                      {step.title}
                    </h3>

                    <p className="ff-sans mt-2 text-[#6B7C74]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-20 overflow-hidden rounded-[32px] bg-[#0F2B22] p-10 text-white shadow-2xl"
        >
          <div
            className="ff-mesh-anim pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #E8B34C 0%, transparent 70%)" }}
          />
          <div
            className="ff-mesh-anim pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #2E5C46 0%, transparent 70%)", animationDelay: "2s" }}
          />

          <div className="relative flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="ff-serif text-3xl font-semibold">
                Ready to Start Your Project?
              </h3>

              <p className="ff-sans mt-3 text-[#B9C7BE]">
                Connect with thousands of verified freelancers and
                get your work done faster.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="ff-sans group flex items-center gap-2 rounded-2xl bg-[#E8B34C] px-8 py-4 font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]"
              onClick={()=> navigate("/register-with-otp")}
            >
              Post a Project
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;