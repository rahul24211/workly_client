// src/components/home/PopularCategories.jsx

import { motion } from "motion/react";
import {
  Code2,
  Smartphone,
  Palette,
  PenTool,
  Megaphone,
  Video,
  Brain,
  Database,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Web Development",
    jobs: "12,500+ Jobs",
    icon: Code2,
  },
  {
    title: "Mobile Apps",
    jobs: "8,200+ Jobs",
    icon: Smartphone,
  },
  {
    title: "UI/UX Design",
    jobs: "6,400+ Jobs",
    icon: Palette,
  },
  {
    title: "Content Writing",
    jobs: "9,800+ Jobs",
    icon: PenTool,
  },
  {
    title: "Digital Marketing",
    jobs: "7,300+ Jobs",
    icon: Megaphone,
  },
  {
    title: "Video Editing",
    jobs: "5,600+ Jobs",
    icon: Video,
  },
  {
    title: "AI & Machine Learning",
    jobs: "4,200+ Jobs",
    icon: Brain,
  },
  {
    title: "Data Science",
    jobs: "3,900+ Jobs",
    icon: Database,
  },
];

const PopularCategories = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Explore Categories
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Browse Talent by Category
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Discover top freelancers across technology, design,
            marketing, writing, AI, and many other professional
            categories.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-green-200 hover:shadow-xl"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-transparent to-emerald-50 opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition group-hover:scale-110">
                    <Icon size={30} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-slate-500">
                    {category.jobs}
                  </p>

                  {/* Link */}
                  <div className="mt-6 flex items-center gap-2 font-medium text-green-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Explore
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button className="rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700">
            View All Categories
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCategories;