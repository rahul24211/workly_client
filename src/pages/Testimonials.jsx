// src/components/home/Testimonials.jsx

import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul kumar",
    role: "Founder, TechNova",
    image: "https://i.pravatar.cc/300?img=12",
    rating: 5,
    review:
      "FreeLincer helped us hire an exceptional React developer within 24 hours. The quality of talent exceeded our expectations.",
  },
  {
    id: 2,
    name: "Narender Singh",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/300?img=32",
    rating: 5,
    review:
      "The platform made hiring incredibly simple. We found an SEO expert who significantly improved our organic traffic.",
  },
  {
    id: 3,
    name: "Virat Sharma ",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/300?img=15",
    rating: 5,
    review:
      "Outstanding experience. From UI/UX design to development, FreeLincer connected us with world-class freelancers.",
  },
];

const AUTO_ADVANCE_MS = 6000;

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setDirection(1);
    setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActive((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  const t = testimonials[active];

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

      {/* Background Blur */}
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
            Client Success Stories
          </span>

          <h2 className="ff-serif mt-5 text-4xl font-semibold text-[#14231C] md:text-5xl">
            What Our Clients Say
          </h2>

          <p className="ff-sans mt-4 text-lg text-[#6B7C74]">
            Thousands of businesses trust FreeLincer to connect
            them with top freelancers and deliver exceptional results.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto max-w-5xl"
        >
          <div className="overflow-hidden rounded-[32px] border border-[#E4E8E3] bg-white/90 p-8 shadow-xl backdrop-blur-xl md:p-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid gap-10 lg:grid-cols-2 lg:items-center"
              >
                {/* Left Side */}
                <div>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F2B22]/10 text-[#0F2B22]">
                    <Quote size={30} />
                  </div>

                  <div className="mb-6 flex gap-1">
                    {[...Array(t.rating)].map((_, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15 + index * 0.06 }}
                      >
                        <Star size={20} className="fill-[#E8B34C] text-[#E8B34C]" />
                      </motion.span>
                    ))}
                  </div>

                  <p className="ff-serif text-xl leading-relaxed text-[#14231C] md:text-2xl">
                    "{t.review}"
                  </p>

                  <div className="mt-8">
                    <h3 className="ff-sans text-xl font-bold text-[#14231C]">
                      {t.name}
                    </h3>

                    <p className="ff-sans text-[#6B7C74]">{t.role}</p>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#E8B34C]/20 blur-3xl" />

                    <img
                      src={t.image}
                      alt={t.name}
                      className="relative h-72 w-72 rounded-full border-8 border-white object-cover shadow-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[#DDE3DE] bg-white shadow-sm transition hover:bg-[#F0F2EF]"
          >
            <ArrowLeft size={20} className="text-[#14231C]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F2B22] text-[#E8B34C] shadow-sm transition hover:bg-[#153A2C]"
          >
            <ArrowRight size={20} />
          </motion.button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-9 bg-[#E8B34C]"
                  : "w-2.5 bg-[#DDE3DE] hover:bg-[#B9C7BE]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;