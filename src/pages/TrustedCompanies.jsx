// src/components/home/TrustedCompanies.jsx

import { motion } from "motion/react";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Shopify",
  "Airbnb",
  "Stripe",
  "Netflix",
  "Adobe",
];

const TrustedCompanies = () => {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-slate-50 py-16">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Trusted Worldwide
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
            Trusted by Leading Companies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Thousands of businesses hire top freelancers through FreeLincer to
            build products, grow brands, and scale faster.
          </p>
        </motion.div>

        {/* Infinite Logo Scroll */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              repeat: Infinity,
              duration: 20,
              ease: "linear",
            }}
            className="flex w-max gap-6"
          >
            {[...companies, ...companies].map((company, index) => (
              <div
                key={index}
                className="flex min-w-[180px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-5 shadow-sm transition hover:shadow-md"
              >
                <span className="text-lg font-bold text-slate-700">
                  {company}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
       
      </div>
    </section>
  );
};

export default TrustedCompanies;