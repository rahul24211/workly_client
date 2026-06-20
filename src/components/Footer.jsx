// src/components/layout/Footer.jsx

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background Effects */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="container relative mx-auto px-4 lg:px-8">
        
        {/* Main Footer */}
        <div className="grid gap-12 border-b border-slate-800 py-20 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-xl font-bold">
                F
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  FreeLincer
                </h2>

                <p className="text-sm text-slate-400">
                  Freelance Marketplace
                </p>
              </div>
            </div>

            <p className="max-w-md leading-relaxed text-slate-400">
              FreeLincer connects businesses with top freelancers
              worldwide. Hire experts, manage projects, and grow
              your business faster with our secure freelance platform.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-slate-400">
                <Mail size={18} />
                support@freelincer.com
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <Phone size={18} />
                +91 98765 43210
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <MapPin size={18} />
                Jaipur, Rajasthan, India
              </div>
            </div>
          </div>

          {/* For Clients */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              For Clients
            </h3>

            <ul className="space-y-4">
              {[
                "Find Freelancers",
                "Post a Project",
                "Browse Categories",
                "Enterprise Solutions",
                "Success Stories",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 transition hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Freelancers */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              For Freelancers
            </h3>

            <ul className="space-y-4">
              {[
                "Find Work",
                "Create Profile",
                "Freelancer Guide",
                "Community",
                "Resources",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 transition hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">
              Company
            </h3>

            <ul className="space-y-4">
              {[
                "About Us",
                "Careers",
                "Blog",
                "Contact",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 transition hover:text-green-400"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Section */}
        <div className="flex flex-col gap-8 border-b border-slate-800 py-8 lg:flex-row lg:items-center lg:justify-between">
          
          <div>
            <h3 className="mb-3 text-lg font-semibold">
              Follow Us
            </h3>

            <div className="flex gap-4">
              {[
                Facebook,
                Twitter,
                Linkedin,
                Instagram,
                Youtube,
              ].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-slate-400 transition hover:bg-green-600 hover:text-white"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-medium transition hover:bg-green-700"
          >
            Back to Top
            <ArrowUp size={18} />
          </button>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-5 py-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          
          <p className="text-slate-500">
            © {new Date().getFullYear()} FreeLincer. All rights
            reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 lg:justify-end">
            <a
              href="#"
              className="text-slate-500 transition hover:text-green-400"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-slate-500 transition hover:text-green-400"
            >
              Terms & Conditions
            </a>

            <a
              href="#"
              className="text-slate-500 transition hover:text-green-400"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;