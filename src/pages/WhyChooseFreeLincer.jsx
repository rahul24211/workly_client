// src/components/home/WhyChooseFreeLincer.jsx

import { motion } from "motion/react";
import {
  ShieldCheck,
  BadgeCheck,
  Clock3,
  CreditCard,
  Headphones,
  BriefcaseBusiness,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Talent",
    description:
      "Work with highly skilled and verified freelancers across multiple industries and technologies.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description:
      "Protected payments and milestone-based releases ensure complete trust and transparency.",
  },
  {
    icon: Clock3,
    title: "Fast Hiring",
    description:
      "Receive proposals from top freelancers within minutes and hire the best fit quickly.",
  },
  {
    icon: CreditCard,
    title: "Flexible Budget",
    description:
      "From small tasks to large-scale projects, find professionals that fit your budget.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Our support team is available around the clock to help clients and freelancers.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Project Success",
    description:
      "Track milestones, communicate efficiently, and complete projects successfully.",
  },
];

const WhyChooseFreeLincer = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">
            Why Businesses Choose
            <span className="block text-green-600">
              FreeLincer
            </span>
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            We make hiring freelancers simple, secure, and efficient so you can
            focus on building amazing products and growing your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/40 bg-white/80 p-8 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-50 opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:scale-110">
                    <Icon size={30} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-2xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlight Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-[32px] bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-center text-white shadow-2xl"
        >
          <h3 className="text-3xl font-bold md:text-4xl">
            Join 50,000+ Freelancers & 12,000+ Businesses
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-green-50">
            Whether you're looking for top talent or your next opportunity,
            FreeLincer helps you connect, collaborate, and succeed.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-green-600 transition hover:scale-105">
              Hire Talent
            </button>

            <button className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
              Find Work
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseFreeLincer;