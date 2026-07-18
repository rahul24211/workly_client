// src/components/home/WhyChooseFreeLincer.jsx

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
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

// Counts up from 0 to `target` once the element scrolls into view.
const CountUp = ({ target, suffix = "", duration = 1.4 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let frame;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

const WhyChooseFreeLincer = () => {
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

      {/* Background Effects */}
      <div className="ff-mesh-anim absolute left-0 top-0 h-72 w-72 rounded-full bg-[#0F2B22]/[0.06] blur-3xl" />
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
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="ff-sans rounded-full bg-[#0F2B22]/10 px-4 py-2 text-sm font-semibold text-[#0F2B22]">
            Why Choose Us
          </span>

          <h2 className="ff-serif mt-6 text-4xl font-semibold text-[#14231C] md:text-5xl">
            Why Businesses Choose
            <span className="block text-[#0F2B22]">
              Free<span className="text-[#C98A1F]">Lincer</span>
            </span>
          </h2>

          <p className="ff-sans mt-5 text-lg text-[#6B7C74]">
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
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl border border-[#E4E8E3] bg-white/90 p-8 shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-xl hover:shadow-[#0F2B22]/5"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F2B22]/[0.04] via-transparent to-[#E8B34C]/[0.06] opacity-0 transition duration-300 group-hover:opacity-100" />

                {/* Hover border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-transparent transition duration-300 group-hover:ring-[#E8B34C]/40" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2B22]/10 text-[#0F2B22] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0F2B22] group-hover:text-[#E8B34C]">
                    <Icon size={30} />
                  </div>

                  {/* Title */}
                  <h3 className="ff-serif mb-3 text-2xl font-semibold text-[#14231C]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="ff-sans leading-relaxed text-[#6B7C74]">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlight Section */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-20 overflow-hidden rounded-[32px] bg-[#0F2B22] p-10 text-center text-white shadow-2xl"
        >
          <div
            className="ff-mesh-anim pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #E8B34C 0%, transparent 70%)" }}
          />
          <div
            className="ff-mesh-anim pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #2E5C46 0%, transparent 70%)", animationDelay: "2s" }}
          />

          <div className="relative">
            <h3 className="ff-serif text-3xl font-semibold md:text-4xl">
              Join <CountUp target={50000} suffix="+" />
              {" "}Freelancers &amp; <CountUp target={12000} suffix="+" /> Businesses
            </h3>

            <p className="ff-sans mx-auto mt-4 max-w-2xl text-[#B9C7BE]">
              Whether you're looking for top talent or your next opportunity,
              FreeLincer helps you connect, collaborate, and succeed.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="ff-sans rounded-2xl bg-[#E8B34C] px-8 py-4 font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]"
              >
                Hire Talent
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="ff-sans rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Find Work
              </motion.button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default WhyChooseFreeLincer;