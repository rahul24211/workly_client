// src/components/home/FeaturedProjects.jsx

import { motion } from "motion/react";
import {
  Briefcase,
  Clock3,
  DollarSign,
  MapPin,
  ArrowRight,
  Users,
} from "lucide-react";

const projects = [
  {
    title: "Build a Modern SaaS Dashboard",
    budget: "$1,500 - $3,000",
    level: "Expert",
    duration: "1-3 Months",
    proposals: 18,
    location: "Worldwide",
    skills: ["React", "Node.js", "Tailwind"],
  },
  {
    title: "Mobile App UI/UX Design",
    budget: "$800 - $2,000",
    level: "Intermediate",
    duration: "2-4 Weeks",
    proposals: 12,
    location: "Remote",
    skills: ["Figma", "UI Design", "UX"],
  },
  {
    title: "AI Chatbot Development",
    budget: "$2,500 - $5,000",
    level: "Expert",
    duration: "2 Months",
    proposals: 25,
    location: "Worldwide",
    skills: ["Python", "OpenAI", "LLM"],
  },
  {
    title: "SEO & Digital Marketing Campaign",
    budget: "$500 - $1,500",
    level: "Intermediate",
    duration: "Ongoing",
    proposals: 9,
    location: "Remote",
    skills: ["SEO", "Google Ads", "Marketing"],
  },
  {
    title: "E-commerce Website Development",
    budget: "$1,200 - $4,000",
    level: "Expert",
    duration: "1 Month",
    proposals: 21,
    location: "Worldwide",
    skills: ["Next.js", "Stripe", "MongoDB"],
  },
  {
    title: "Video Editing for YouTube Channel",
    budget: "$300 - $800",
    level: "Beginner",
    duration: "2 Weeks",
    proposals: 15,
    location: "Remote",
    skills: ["Premiere Pro", "After Effects"],
  },
];

const FeaturedProjects = () => {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Latest Opportunities
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Featured Projects
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Discover high-quality freelance opportunities from startups,
            agencies, and businesses around the world.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ y: -5 }}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-green-200 hover:shadow-xl"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {project.level}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock3 size={16} />
                      {project.duration}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {project.location}
                    </span>
                  </div>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  Open
                </span>
              </div>

              {/* Budget */}
              <div className="mt-5 flex items-center gap-2 text-green-600">
                <DollarSign size={18} />
                <span className="font-bold text-lg">
                  {project.budget}
                </span>
              </div>

              {/* Skills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom */}
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                <div className="flex items-center gap-2 text-slate-500">
                  <Users size={16} />
                  <span>{project.proposals} Proposals</span>
                </div>

                <button className="flex items-center gap-2 font-semibold text-green-600 transition group-hover:translate-x-1">
                  Apply Now
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button className="rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700">
            Browse All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;