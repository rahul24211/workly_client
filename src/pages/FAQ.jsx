// src/components/home/FAQ.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
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
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Got Questions?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Find answers to the most common questions about
            hiring freelancers and working on FreeLincer.
          </p>
        </motion.div>

        {/* FAQ Container */}
        <div className="mx-auto max-w-4xl space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
              }}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                    <HelpCircle size={22} />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                    {faq.question}
                  </h3>
                </div>

                <motion.div
                  animate={{
                    rotate: active === index ? 180 : 0,
                  }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-slate-100 px-6 pb-6 pt-4">
                      <p className="leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="rounded-[32px] bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-white">
            <h3 className="text-3xl font-bold">
              Still Have Questions?
            </h3>

            <p className="mx-auto mt-3 max-w-2xl text-green-50">
              Our support team is available 24/7 to help you
              get started and make the most of FreeLincer.
            </p>

            <button className="mt-6 rounded-2xl bg-white px-8 py-4 font-semibold text-green-600 transition hover:scale-105">
              Contact Support
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;