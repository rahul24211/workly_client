import { useState, useEffect } from "react";
import { ArrowRight, BriefcaseBusiness, ShieldCheck, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const stats = [
  { value: "10k+", label: "Verified professionals" },
  { value: "4.9/5", label: "Average client rating" },
  { value: "24/7", label: "Secure collaboration" },
];

const pillars = [
  {
    title: "Smart matching",
    description: "We connect clients with freelancers based on skills, experience, budget, and availability.",
    icon: Sparkles,
  },
  {
    title: "Trusted workflow",
    description: "Built-in messaging, contracts, and milestone support keep projects moving smoothly.",
    icon: ShieldCheck,
  },
  {
    title: "Fast delivery",
    description: "From quick gigs to long-term engagements, FreeLincer helps teams launch faster.",
    icon: Zap,
  },
];

const clientBenefits = [
  "Find vetted experts for design, development, writing, marketing, and more",
  "Post jobs quickly and receive tailored proposals from qualified freelancers",
  "Collaborate confidently with secure communication and transparent project tracking",
];

const freelancerBenefits = [
  "Showcase your skills to clients actively looking for your expertise",
  "Access recurring projects, flexible opportunities, and higher earning potential",
  "Manage your workflow with tools that simplify proposals, contracts, and delivery",
];

// Swap these for your own freelancer / client photography.
const SLIDES = [
  { src: "https://picsum.photos/seed/freelincer-hero-1/1920/1080", alt: "Freelancer working on a laptop" },
  { src: "https://picsum.photos/seed/freelincer-hero-2/1920/1080", alt: "Client reviewing a project brief" },
  { src: "https://picsum.photos/seed/freelincer-hero-3/1920/1080", alt: "Designer sketching ideas at a desk" },
  { src: "https://picsum.photos/seed/freelincer-hero-4/1920/1080", alt: "Team discussing a proposal" },
];
const SLIDE_DURATION = 5000;

// Shared scroll-reveal animation for sections below the hero
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AboutPage = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F5] text-[#14231C]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .ff-serif { font-family: 'Fraunces', serif; }
        .ff-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* HERO — sliding photo background, no green gradient */}
      <section className="relative overflow-hidden px-6 py-24 sm:px-8 lg:px-12 text-white">
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.1, ease: "easeInOut" },
                scale: { duration: SLIDE_DURATION / 1000 + 1, ease: "linear" },
              }}
              className="absolute inset-0"
            >
              <img
                src={SLIDES[active].src}
                alt={SLIDES[active].alt}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2B22]/90 via-[#0F2B22]/75 to-[#0F2B22]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2B22]/70 via-transparent to-transparent" />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(idx)}
              aria-label={`Show slide ${idx + 1}`}
              className="relative h-1.5 w-8 overflow-hidden rounded-full bg-white/25"
            >
              {idx === active && (
                <motion.span
                  key={active}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#E8B34C]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <p className="ff-sans mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur">
              About FreeLincer
            </p>
            <h1 className="ff-serif text-4xl font-semibold leading-tight sm:text-5xl">
              A modern freelance marketplace built for trusted work.
            </h1>
            <p className="ff-sans mt-6 text-lg text-[#DCE7DF] sm:text-xl">
              FreeLincer brings clients and freelancers together in one
              streamlined platform where ideas become projects, projects
              become partnerships, and great work gets delivered faster.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register-with-otp"
                className="ff-sans group inline-flex items-center rounded-full bg-[#E8B34C] px-5 py-3 font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]"
              >
                Join as a Client
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/register-with-otp"
                className="ff-sans inline-flex items-center rounded-full border border-white/40 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Join as a Freelancer
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#E8B34C]/20 p-3">
                <BriefcaseBusiness size={24} className="text-[#E8B34C]" />
              </div>
              <div>
                <h2 className="ff-serif text-xl font-semibold">Why FreeLincer works</h2>
                <p className="ff-sans text-sm text-[#DCE7DF]">
                  Simple onboarding, strong matching, and quality outcomes.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#0F2B22]/40 p-4 text-center">
                  <p className="ff-serif text-2xl font-semibold">{item.value}</p>
                  <p className="ff-sans mt-1 text-sm text-[#DCE7DF]">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12"
      >
        <div className="grid gap-8 rounded-3xl border border-[#E4E8E3] bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="ff-sans text-sm font-semibold uppercase tracking-[0.2em] text-[#0F2B22]">
              What we do
            </p>
            <h2 className="ff-serif mt-3 text-3xl font-semibold text-[#14231C]">
              A trusted space for hiring and growing freelance talent.
            </h2>
            <p className="ff-sans mt-4 text-lg leading-8 text-[#6B7C74]">
              FreeLincer is designed to remove the friction from freelance
              hiring. Whether you need a one-time specialist or a long-term
              partner, the platform helps you discover proven talent,
              evaluate fit quickly, and build lasting collaborations with
              confidence.
            </p>
          </div>
          <div className="rounded-2xl bg-[#F7F8F5] p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#0F2B22]/10 p-3 text-[#0F2B22]">
                <Users size={22} />
              </div>
              <div>
                <h3 className="ff-serif font-semibold text-[#14231C]">
                  Built for both sides of the marketplace
                </h3>
                <p className="ff-sans text-sm text-[#6B7C74]">
                  Clients and freelancers get tools that make collaboration
                  easier from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PILLARS */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.12 }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-3xl border border-[#E4E8E3] bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-[#0F2B22]/10 p-3 text-[#0F2B22]">
                  <Icon size={22} />
                </div>
                <h3 className="ff-serif text-xl font-semibold text-[#14231C]">{item.title}</h3>
                <p className="ff-sans mt-3 text-sm leading-7 text-[#6B7C74]">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* CLIENT / FREELANCER BENEFITS */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="rounded-3xl border border-[#E4E8E3] bg-white p-8 shadow-sm"
          >
            <h3 className="ff-serif text-2xl font-semibold text-[#14231C]">For clients</h3>
            <ul className="mt-5 space-y-3 text-[#6B7C74]">
              {clientBenefits.map((benefit) => (
                <li key={benefit} className="ff-sans flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0F2B22]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-[#E4E8E3] bg-white p-8 shadow-sm"
          >
            <h3 className="ff-serif text-2xl font-semibold text-[#14231C]">For freelancers</h3>
            <ul className="mt-5 space-y-3 text-[#6B7C74]">
              {freelancerBenefits.map((benefit) => (
                <li key={benefit} className="ff-sans flex gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#E8B34C]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12"
      >
        <div className="relative overflow-hidden rounded-3xl bg-[#0F2B22] px-8 py-12 text-white shadow-xl sm:px-10">
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #E8B34C 0%, transparent 70%)" }}
          />
          <h2 className="ff-serif relative text-3xl font-semibold">Why choose FreeLincer?</h2>
          <p className="ff-sans relative mt-4 max-w-3xl text-lg leading-8 text-[#B9C7BE]">
            Because it combines quality, simplicity, and trust in one
            platform. You get access to capable professionals, a smooth
            hiring experience, and a community built for long-term success.
          </p>
          <div className="relative mt-8 flex flex-wrap gap-4">
            <Link
              to="/register-with-otp"
              className="ff-sans group inline-flex items-center rounded-full bg-[#E8B34C] px-5 py-3 font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]"
            >
              Get started today
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="ff-sans inline-flex items-center rounded-full border border-white/25 px-5 py-3 font-semibold text-[#F7F8F5] transition hover:bg-white/10"
            >
              Sign in to your account
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;