// src/components/home/HowItWorks.jsx

import { motion } from "motion/react";
import {
  FileText,
  Users,
  UserCheck,
  Rocket,
  ArrowRight,
} from "lucide-react";

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
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Simple Process
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            How FreeLincer Works
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Hire expert freelancers in just a few simple steps and
            turn your ideas into successful projects.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Line */}
            <div className="absolute left-0 right-0 top-16 h-1 rounded-full bg-slate-200" />

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
                    <div className="relative z-10 mx-auto flex h-32 w-32 items-center justify-center rounded-full border-8 border-slate-50 bg-green-600 shadow-xl">
                      <Icon
                        size={40}
                        className="text-white"
                      />
                    </div>

                    {/* Number */}
                    <span className="mt-6 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                      Step {step.id}
                    </span>

                    <h3 className="mt-4 text-2xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-slate-600">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="space-y-6 lg:hidden">
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
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600">
                    <Icon
                      size={24}
                      className="text-white"
                    />
                  </div>

                  <div>
                    <span className="text-sm font-bold text-green-600">
                      STEP {step.id}
                    </span>

                    <h3 className="mt-1 text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
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
          className="mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-white shadow-2xl"
        >
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h3 className="text-3xl font-bold">
                Ready to Start Your Project?
              </h3>

              <p className="mt-3 text-green-50">
                Connect with thousands of verified freelancers and
                get your work done faster.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-green-600 transition hover:scale-105">
              Post a Project
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;