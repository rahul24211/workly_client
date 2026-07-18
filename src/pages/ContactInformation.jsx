import { motion } from "motion/react";
import { Mail, PhoneCall, MapPin, Clock3, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const contactItems = [
  {
    icon: Mail,
    title: "Email",
    value: "support@freelincer.com",
    description: "Reach out for help, partnerships, or product questions.",
  },
  {
    icon: PhoneCall,
    title: "Phone",
    value: "+1 (800) 555-0199",
    description: "Call us Monday through Friday between 8 AM and 8 PM.",
  },
  {
    icon: MapPin,
    title: "Office Address",
    value: "456 Market Street, Suite 200, San Francisco, CA 94105",
    description: "We welcome visitors by appointment for consultations and onboarding.",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "Mon – Fri: 8:00 AM – 8:00 PM",
    description: "Support is available around the clock for urgent requests.",
  },
];

const ContactInformation = () => {
  return (
    <section className="min-h-screen bg-[#F7F8F5] px-4 py-20 sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .ff-serif { font-family: 'Fraunces', serif; }
        .ff-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[36px] border border-[#E4E8E3] bg-white p-8 shadow-[0_20px_70px_-30px_rgba(15,43,34,0.3)] sm:p-10 lg:p-12"
        >
          <div className="max-w-3xl">
            <span className="ff-sans rounded-full bg-[#0F2B22]/10 px-4 py-2 text-sm font-semibold text-[#0F2B22]">
              Contact Information
            </span>
            <h1 className="ff-serif mt-5 text-4xl font-semibold text-[#14231C] sm:text-5xl">
              We’re here to help.
            </h1>
            <p className="ff-sans mt-4 text-lg leading-8 text-[#6B7C74]">
              Whether you need support, want to discuss a partnership, or have a question about your account, our team is ready to assist.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="rounded-[24px] border border-[#E4E8E3] bg-[#FBFCFA] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F2B22] text-[#E8B34C]">
                    <Icon size={20} />
                  </div>
                  <h3 className="ff-serif mt-5 text-xl font-semibold text-[#14231C]">{item.title}</h3>
                  <p className="ff-sans mt-2 font-semibold text-[#0F2B22]">{item.value}</p>
                  <p className="ff-sans mt-2 text-sm leading-7 text-[#6B7C74]">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 rounded-[24px] border border-[#E4E8E3] bg-gradient-to-r from-[#0F2B22] to-[#1E4D3A] p-8 text-white">
            <h2 className="ff-serif text-2xl font-semibold">Need immediate support?</h2>
            <p className="ff-sans mt-3 max-w-2xl text-[#BFD6C8]">
              Use our email or phone options for account support, project assistance, and general enquiries.
            </p>
            <Link to="/login" className="ff-sans mt-6 inline-flex items-center gap-2 rounded-full bg-[#E8B34C] px-5 py-3 font-semibold text-[#0F2B22] transition hover:bg-[#F0C267]">
              Go to login <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInformation;
