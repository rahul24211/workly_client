// src/components/home/FeaturedFreelancers.jsx

import { motion } from "motion/react";
import {
  Star,
  MapPin,
  BadgeCheck,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";

const freelancers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Full Stack Developer",
    rating: 4.9,
    reviews: 124,
    rate: "$45/hr",
    location: "United States",
    image: "https://i.pravatar.cc/300?img=11",
    skills: ["React", "Node.js", "MongoDB"],
    online: true,
  },
  {
    id: 2,
    name: "Sarah Wilson",
    role: "UI/UX Designer",
    rating: 5.0,
    reviews: 98,
    rate: "$40/hr",
    location: "Canada",
    image: "https://i.pravatar.cc/300?img=32",
    skills: ["Figma", "UI Design", "UX Research"],
    online: true,
  },
  {
    id: 3,
    name: "David Smith",
    role: "Mobile App Developer",
    rating: 4.8,
    reviews: 87,
    rate: "$50/hr",
    location: "Germany",
    image: "https://i.pravatar.cc/300?img=15",
    skills: ["Flutter", "React Native", "Firebase"],
    online: false,
  },
  {
    id: 4,
    name: "Emma Brown",
    role: "Digital Marketer",
    rating: 4.9,
    reviews: 142,
    rate: "$35/hr",
    location: "Australia",
    image: "https://i.pravatar.cc/300?img=24",
    skills: ["SEO", "Google Ads", "Meta Ads"],
    online: true,
  },
  {
    id: 5,
    name: "Michael Lee",
    role: "AI Engineer",
    rating: 5.0,
    reviews: 63,
    rate: "$70/hr",
    location: "Singapore",
    image: "https://i.pravatar.cc/300?img=19",
    skills: ["Python", "LLMs", "Machine Learning"],
    online: true,
  },
  {
    id: 6,
    name: "Sophia Clark",
    role: "Content Writer",
    rating: 4.8,
    reviews: 110,
    rate: "$28/hr",
    location: "United Kingdom",
    image: "https://i.pravatar.cc/300?img=44",
    skills: ["SEO Writing", "Blogs", "Copywriting"],
    online: false,
  },
];

const FeaturedFreelancers = () => {
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
            Top Talent
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            Featured Freelancers
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Connect with highly rated professionals ready to help
            you build, grow, and scale your projects.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {freelancers.map((freelancer, index) => (
            <motion.div
              key={freelancer.id}
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
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-2xl"
            >
              {/* Top */}
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-green-500 to-emerald-500" />

                <div className="absolute left-6 top-10">
                  <div className="relative">
                    <img
                      src={freelancer.image}
                      alt={freelancer.name}
                      className="h-20 w-20 rounded-2xl border-4 border-white object-cover"
                    />

                    <span
                      className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white ${
                        freelancer.online
                          ? "bg-green-500"
                          : "bg-slate-400"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-12">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">
                    {freelancer.name}
                  </h3>

                  <BadgeCheck
                    size={18}
                    className="text-green-600"
                  />
                </div>

                <p className="mt-1 text-slate-500">
                  {freelancer.role}
                </p>

                {/* Rating */}
                <div className="mt-4 flex items-center gap-2">
                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="font-semibold">
                    {freelancer.rating}
                  </span>

                  <span className="text-slate-500">
                    ({freelancer.reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <div className="mt-3 flex items-center gap-2 text-slate-500">
                  <MapPin size={16} />
                  {freelancer.location}
                </div>

                {/* Skills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {freelancer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Rate */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-green-600">
                    <CircleDollarSign size={18} />
                    <span className="font-bold">
                      {freelancer.rate}
                    </span>
                  </div>

                  <button className="flex items-center gap-2 font-medium text-green-600 transition group-hover:translate-x-1">
                    View Profile
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <button className="rounded-2xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700">
            View All Freelancers
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;