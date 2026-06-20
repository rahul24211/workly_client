// src/components/home/Testimonials.jsx

import { motion } from "motion/react";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Michael Anderson",
    role: "Founder, TechNova",
    image: "https://i.pravatar.cc/300?img=12",
    rating: 5,
    review:
      "FreeLincer helped us hire an exceptional React developer within 24 hours. The quality of talent exceeded our expectations.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/300?img=32",
    rating: 5,
    review:
      "The platform made hiring incredibly simple. We found an SEO expert who significantly improved our organic traffic.",
  },
  {
    id: 3,
    name: "David Johnson",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/300?img=15",
    rating: 5,
    review:
      "Outstanding experience. From UI/UX design to development, FreeLincer connected us with world-class freelancers.",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const nextSlide = () => {
    setActive((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background Blur */}
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
            Client Success Stories
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 md:text-5xl">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Thousands of businesses trust FreeLincer to connect
            them with top freelancers and deliver exceptional results.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <motion.div
          key={testimonials[active].id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-5xl rounded-[32px] border border-white/50 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            
            {/* Left Side */}
            <div>
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
                <Quote size={30} />
              </div>

              <div className="mb-6 flex gap-1">
                {[...Array(testimonials[active].rating)].map(
                  (_, index) => (
                    <Star
                      key={index}
                      size={20}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  )
                )}
              </div>

              <p className="text-xl leading-relaxed text-slate-700 md:text-2xl">
                "{testimonials[active].review}"
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-slate-900">
                  {testimonials[active].name}
                </h3>

                <p className="text-slate-500">
                  {testimonials[active].role}
                </p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-green-500/20 blur-3xl" />

                <img
                  src={testimonials[active].image}
                  alt={testimonials[active].name}
                  className="relative h-72 w-72 rounded-full border-8 border-white object-cover shadow-xl"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prevSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-sm transition hover:bg-green-700"
          >
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`h-3 rounded-full transition-all ${
                active === index
                  ? "w-10 bg-green-600"
                  : "w-3 bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            {
              value: "12K+",
              label: "Happy Clients",
            },
            {
              value: "50K+",
              label: "Freelancers",
            },
            {
              value: "99%",
              label: "Success Rate",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-8 text-center shadow-sm"
            >
              <h3 className="text-4xl font-bold text-green-600">
                {item.value}
              </h3>

              <p className="mt-2 text-slate-600">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;