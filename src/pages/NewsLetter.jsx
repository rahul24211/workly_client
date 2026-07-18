// src/components/home/Newsletter.jsx

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Send, BellRing } from "lucide-react";

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
      const eased = 1 - Math.pow(1 - progress, 3);
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

const tags = ["Weekly Job Alerts", "Hiring Insights", "Platform Updates"];

const stats = [
  { value: 50, suffix: "K+", label: "Newsletter Subscribers" },
  { value: 200, suffix: "K+", label: "Freelance Opportunities" },
  { value: 99, suffix: "%", label: "User Satisfaction" },
];

const Newsletter = () => {
  return (
    <section className="bg-white py-24">
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

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[40px] bg-[#0F2B22] p-8 shadow-2xl md:p-14"
        >
          {/* Background Effects */}
          <div
            className="ff-mesh-anim pointer-events-none absolute -left-10 top-0 h-72 w-72 rounded-full bg-[#E8B34C]/15 blur-3xl"
          />
          <div
            className="ff-mesh-anim pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[#2E5C46]/30 blur-3xl"
            style={{ animationDelay: "3s" }}
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E8B34C]/15 text-[#E8B34C]">
                <BellRing size={32} />
              </div>

              <h2 className="ff-serif text-4xl font-semibold text-white md:text-5xl">
                Stay Updated
              </h2>

              <p className="ff-sans mt-5 max-w-xl text-lg text-[#B9C7BE]">
                Subscribe to our newsletter and receive the latest
                freelance opportunities, hiring tips, industry news,
                and platform updates directly in your inbox.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {tags.map((tag, idx) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.08 }}
                    className="ff-sans rounded-xl bg-white/10 px-4 py-2 text-sm text-[#DCE7DF]"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <h3 className="ff-serif mb-6 text-2xl font-semibold text-white">
                  Join Our Community
                </h3>

                <form className="space-y-4">
                  <div className="relative">
                    <Mail
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8AA091]"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="ff-sans h-14 w-full rounded-2xl border border-white/10 bg-white/10 pl-12 pr-4 text-white outline-none transition placeholder:text-[#8AA091] focus:border-[#E8B34C] focus:ring-1 focus:ring-[#E8B34C]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="ff-sans group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#E8B34C] font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]"
                  >
                    Subscribe Now
                    <Send
                      size={18}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </motion.button>
                </form>

                <p className="ff-sans mt-4 text-center text-sm text-[#8AA091]">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 mt-12 grid gap-5 border-t border-white/10 pt-10 md:grid-cols-3">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="text-center"
              >
                <h3 className="ff-serif text-3xl font-semibold text-[#E8B34C]">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="ff-sans text-[#8AA091]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;