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
    <section className="relative overflow-hidden bg-white py-24">
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

      {/* Ambient background */}
      <div className="ff-mesh-anim pointer-events-none absolute -top-10 right-0 h-72 w-72 rounded-full bg-[#E8B34C]/[0.07] blur-3xl" />
      <div
        className="ff-mesh-anim pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#0F2B22]/[0.05] blur-3xl"
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
            Latest Opportunities
          </span>

          <h2 className="ff-serif mt-5 text-4xl font-semibold text-[#14231C] md:text-5xl">
            Featured Projects
          </h2>

          <p className="ff-sans mt-4 text-lg text-[#6B7C74]">
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
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-[#E4E8E3] bg-white p-6 shadow-sm transition-all hover:border-[#E8B34C]/50 hover:shadow-xl hover:shadow-[#0F2B22]/5"
            >
              {/* subtle hover wash */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0F2B22]/[0.03] via-transparent to-[#E8B34C]/[0.05] opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative">
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="ff-serif text-xl font-semibold text-[#14231C]">
                      {project.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#6B7C74]">
                      <span className="ff-sans flex items-center gap-1">
                        <Briefcase size={16} />
                        {project.level}
                      </span>

                      <span className="ff-sans flex items-center gap-1">
                        <Clock3 size={16} />
                        {project.duration}
                      </span>

                      <span className="ff-sans flex items-center gap-1">
                        <MapPin size={16} />
                        {project.location}
                      </span>
                    </div>
                  </div>

                  <span className="ff-sans shrink-0 rounded-full bg-[#E8B34C]/15 px-3 py-1 text-sm font-semibold text-[#8A6410]">
                    Open
                  </span>
                </div>

                {/* Budget */}
                <div className="mt-5 flex items-center gap-2 text-[#0F2B22]">
                  <DollarSign size={18} />
                  <span className="ff-serif text-lg font-semibold">
                    {project.budget}
                  </span>
                </div>

                {/* Skills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="ff-sans rounded-full bg-[#F7F8F5] px-3 py-1 text-sm text-[#14231C] ring-1 ring-inset ring-[#E4E8E3]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between border-t border-[#EEF1EC] pt-5">
                  <div className="ff-sans flex items-center gap-2 text-[#6B7C74]">
                    <Users size={16} />
                    <span>{project.proposals} Proposals</span>
                  </div>

                  <button className="ff-sans flex items-center gap-2 font-semibold text-[#0F2B22] transition group-hover:translate-x-1 group-hover:text-[#8A6410]">
                    Apply Now
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 text-center"
        >
          {/* <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="ff-sans rounded-2xl bg-[#0F2B22] px-8 py-4 font-semibold text-white transition hover:bg-[#153A2C]"
          >
            Browse All Projects
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;