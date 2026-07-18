// src/components/home/FAQ.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "How does FreeLincer work?",
    answer:
      "FreeLincer connects businesses with skilled freelancers. Clients post projects, freelancers submit proposals, and clients hire the best candidate for their needs.",
  },
  {
    question: "How do I hire a freelancer?",
    answer:
      "Simply post your project, review freelancer profiles and proposals, conduct interviews if needed, and hire the freelancer that best matches your requirements.",
  },
  {
    question: "How are payments secured?",
    answer:
      "All payments are protected through our secure escrow system. Funds are only released when agreed milestones are successfully completed.",
  },
  {
    question: "How much does it cost to use FreeLincer?",
    answer:
      "Creating an account is free. Clients only pay for completed work, while freelancers pay a small service fee on successfully completed projects.",
  },
  {
    question: "Can I work remotely from any country?",
    answer:
      "Yes. FreeLincer is a global platform where freelancers and clients can collaborate from anywhere in the world.",
  },
  {
    question: "What if I am not satisfied with the work?",
    answer:
      "Our dispute resolution and support team help ensure fair outcomes and protect both freelancers and clients.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

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
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="ff-sans rounded-full bg-[#0F2B22]/10 px-4 py-2 text-sm font-semibold text-[#0F2B22]">
            Frequently Asked Questions
          </span>

          <h2 className="ff-serif mt-5 text-4xl font-semibold text-[#14231C] md:text-5xl">
            Got Questions?
          </h2>

          <p className="ff-sans mt-4 text-lg text-[#6B7C74]">
            Find answers to the most common questions about
            hiring freelancers and working on FreeLincer.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <div className="mx-auto max-w-4xl space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition-colors duration-300 ${
                  isOpen ? "border-[#E8B34C]/50" : "border-[#E4E8E3]"
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{
                        backgroundColor: isOpen ? "#0F2B22" : "#0F2B221A",
                        color: isOpen ? "#E8B34C" : "#0F2B22",
                      }}
                      transition={{ duration: 0.25 }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                    >
                      <HelpCircle size={22} />
                    </motion.div>

                    <h3 className="ff-serif text-lg font-semibold text-[#14231C] md:text-xl">
                      {faq.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 ${isOpen ? "text-[#E8B34C]" : "text-[#6B7C74]"}`}
                  >
                    <ChevronDown />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-[#EEF1EC] px-6 pb-6 pt-4">
                        <p className="ff-sans leading-relaxed text-[#6B7C74]">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="relative overflow-hidden rounded-[32px] bg-[#0F2B22] p-10 text-white">
            <div
              className="ff-mesh-anim pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #E8B34C 0%, transparent 70%)" }}
            />
            <div
              className="ff-mesh-anim pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #2E5C46 0%, transparent 70%)", animationDelay: "2s" }}
            />

            <div className="relative">
              <h3 className="ff-serif text-3xl font-semibold">
                Still Have Questions?
              </h3>

              <p className="ff-sans mx-auto mt-3 max-w-2xl text-[#B9C7BE]">
                Our support team is available 24/7 to help you
                get started and make the most of FreeLincer.
              </p>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/contact")}
                className="ff-sans mt-6 rounded-2xl bg-[#E8B34C] px-8 py-4 font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]"
              >
                Contact Support
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;