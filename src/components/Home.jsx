import React from 'react'
import HeroSection from '../pages/HeroSection'
import TrustedCompanies from '../pages/TrustedCompanies'
import PopularCategories from '../pages/PopularCategories'
import WhyChooseFreeLincer from '../pages/WhyChooseFreeLincer'
import FeaturedFreelancers from '../pages/FeaturedFreeLinced'
import HowItWorks from '../pages/HowItWork'
import FeaturedProjects from '../pages/FeaturedProjects'
import Testimonials from '../pages/Testimonials'
import FAQ from '../pages/FAQ'
import CTABanner from '../pages/CTABanner'
import Newsletter from '../pages/NewsLetter'
import { ArrowRight, BriefcaseBusiness, TrendingUp, Users2, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'



const Home = () => {
  return (
    <div className="bg-slate-50 text-slate-800">
      <HeroSection />

   

      <TrustedCompanies />
      <PopularCategories />

      <section className="mx-auto max-w-9xl px-6 py-8 sm:px-8 lg:px-12">
        <div className="grid gap-6 rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-slate-200">
              <Sparkles size={16} /> Premium freelance marketplace
            </div>
            <h2 className="mt-6 text-3xl font-semibold sm:text-4xl">Launch faster with vetted talent and polished collaboration tools.</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">From startup MVPs to large-scale campaigns, FreeLincer helps clients discover the right professionals and freelancers build sustainable careers.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Users2, title: 'Trusted matching', text: 'Find specialists aligned to your budget and timeline.' },
              { icon: BriefcaseBusiness, title: 'Quality work', text: 'Get projects delivered with clarity, accountability, and speed.' },
              { icon: ShieldCheck, title: 'Secure payments', text: 'Protect transactions with transparent milestone support.' },
              { icon: TrendingUp, title: 'Growth-ready', text: 'Scale teams, portfolios, and businesses with confidence.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <div className="inline-flex rounded-xl bg-white/15 p-2">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChooseFreeLincer />
      {/* <FeaturedFreelancers /> */}
      <HowItWorks />
      <FeaturedProjects />
      <Testimonials />
      <FAQ />
      {/* <CTABanner /> */}

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-600">Ready to jump in?</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Find your next opportunity or hire world-class talent.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/register-with-otp" className="inline-flex items-center rounded-full bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700">
                Create account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/login" className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <Newsletter /> */}

      <footer className="border-t border-slate-200 bg-slate-900 px-6 py-12 text-slate-300 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-2xl font-semibold text-white">FreeLincer</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">A modern freelance marketplace helping clients and freelancers collaborate effortlessly across the globe.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h4 className="font-semibold text-white">Platform</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/register-with-otp" className="hover:text-white">Join</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Resources</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link to="/howitwork" className="hover:text-white">How it works</Link></li>
                <li><Link to="/whychooseus" className="hover:text-white">Why Choose Us</Link></li>
                {/* <li><a href="#" className="hover:text-white">Community</a></li> */}
                <li><Link to="/contact" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Contact</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li><a href="mailto:support@workly.com" className="hover:text-white">support@workly.com</a></li>
                <li><a href="#" className="hover:text-white">+1 (800) 555-0199</a></li>
                <li><a href="#" className="hover:text-white">Global support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-slate-800 pt-6 text-center text-sm text-slate-500">© 2026 FreeLincer. All rights reserved.</div>
      </footer>
    </div>
  )
}

export default Home
