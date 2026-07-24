// src/components/home/HeroSection.jsx

import { motion } from "motion/react";
import { Search, ArrowRight, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Hire elite freelancers",
    subtitle: "Launch your next product with vetted design, development, and marketing talent.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Grow your freelance career",
    subtitle: "Access high-value opportunities, build your portfolio, and manage your workflow beautifully.",
    image: "https://images.unsplash.com/photo-1517048676731-5f1b9b2b1f0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Scale smarter with trusted collaboration",
    subtitle: "From quick gigs to long-term partnerships, connect faster and deliver better outcomes.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#f8fafc_0%,_#f1f5f9_100%)] py-16 lg:py-20">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.55),transparent)]" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="grid min-h-[88vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              <Star size={16} fill="currentColor" /> Trusted by 50,000+ freelancers worldwide
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Hire top talent.
              <span className="block bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Build what’s next.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              FreeLincer is a premium freelance marketplace for ambitious clients and talented professionals to collaborate seamlessly.
            </p>

            <div className="mt-8 flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white/80 p-3 shadow-xl shadow-slate-200/70 backdrop-blur md:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-50 px-3 py-3">
                <Search className="text-slate-400" size={20} />
                <input type="text" placeholder="Search designers, developers, marketers..." className="w-full bg-transparent text-sm outline-none" />
              </div>
              <button className="rounded-2xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700">Search</button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/register-with-otp" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-500">
                Hire talent <ArrowRight size={18} />
              </a>
              <a href="/register-with-otp" className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-100">
                Find work <Sparkles size={18} />
              </a>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { value: '50K+', label: 'Freelancers' },
                { value: '12K+', label: 'Clients' },
                { value: '200K+', label: 'Projects' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
                  <p className="text-2xl font-semibold text-slate-900">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-emerald-500/20 to-sky-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-3 shadow-[0_30px_80px_-25px_rgba(15,23,42,0.35)] backdrop-blur">
              <div className="relative h-[420px] overflow-hidden rounded-[28px] sm:h-[500px]">
                <img src={slides[activeSlide].image} alt={slides[activeSlide].title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-100">
                    <Sparkles size={14} /> Featured today
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{slides[activeSlide].title}</h2>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-slate-200 sm:text-base">{slides[activeSlide].subtitle}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between px-2">
                <div className="flex gap-2">
                  {slides.map((slide, index) => (
                    <button key={slide.title} onClick={() => setActiveSlide(index)} className={`h-2.5 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-emerald-500' : 'w-2.5 bg-slate-300'}`} />
                  ))}
                </div>
                <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-600">Auto-rotating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;