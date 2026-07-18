import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  Briefcase,
  Building2,
  IndianRupee,
  TrendingUp,
  Search,
  ShieldCheck,
  ArrowRight,
  Circle,
  MailCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

// Left-panel copy + feature bullets per role — swaps with animation when the user picks a role
const ROLE_CONTENT = {
  FREELANCER: {
    eyebrow: "FOR FREELANCERS",
    headline: "Find work you're proud of.",
    subcopy:
      "Build a profile that sells itself, pitch on projects that fit your skills, and get paid on time, every time.",
    points: [
      { icon: Briefcase, text: "Browse curated projects daily" },
      { icon: IndianRupee, text: "Get paid securely, on milestone" },
      { icon: TrendingUp, text: "Grow your rating with every job" },
    ],
  },
  CLIENT: {
    eyebrow: "FOR CLIENTS",
    headline: "Hire talent you can trust.",
    subcopy:
      "Post a brief, review proposals from vetted freelancers, and keep every payment protected until the work is done.",
    points: [
      { icon: Search, text: "Post a project in minutes" },
      { icon: Building2, text: "Access pre-vetted freelancers" },
      { icon: ShieldCheck, text: "Pay only for approved work" },
    ],
  },
};

const RegisterWithOTP = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("FREELANCER");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const validatePassword = (pass) => {
    const errors = [];
    if (pass.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pass)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(pass)) errors.push("One lowercase letter");
    if (!/\d/.test(pass)) errors.push("One number");
    if (!/[!@#$%^&*]/.test(pass)) errors.push("One special character (!@#$%^&*)");
    return errors;
  };

  const handlePasswordChange = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    if (pass) {
      setPasswordErrors(validatePassword(pass));
    } else {
      setPasswordErrors([]);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (passwordErrors.length > 0) {
      toast.error("Password does not meet requirements");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/send-registration-otp`,
        {
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        }
      );

      if (response.data.success) {
        toast.success("OTP sent to your email!");
        setStep(2);
        setOtp("");
        startResendCountdown();
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0] ||
        "Failed to send OTP";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const startResendCountdown = () => {
    setResendCountdown(60);
    const interval = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    setOtpLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/resend-otp`,
        { email: email.trim() }
      );

      if (response.data.success) {
        toast.success("New OTP sent!");
        startResendCountdown();
        setOtp("");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP"
      );
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setOtpLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/verify-registration-otp`,
        {
          email: email.trim(),
          otp,
        }
      );

      if (response.data.success) {
        toast.success("Registration successful!");

        // Store token and user data
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.data.user)
        );

        // Dispatch auth change event
        window.dispatchEvent(new Event("authChange"));

        // Redirect to profile completion
        const profilePath =
          response.data.data.user.role === "CLIENT"
            ? "/create-profile?role=client"
            : "/create-profile?role=freelancer";

        navigate(profilePath);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to verify OTP";
      toast.error(message);
    } finally {
      setOtpLoading(false);
    }
  };

  const content = ROLE_CONTENT[role];

  return (
    <div className="min-h-screen w-full flex bg-[#F7F8F5]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .ff-serif { font-family: 'Fraunces', serif; }
        .ff-sans { font-family: 'Inter', sans-serif; }

        @keyframes ff-mesh {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(3%, -3%) scale(1.06); }
        }
        @keyframes ff-pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .ff-mesh-anim { animation: ff-mesh 12s ease-in-out infinite; }
        .ff-pulse-dot { animation: ff-pulse-dot 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ff-mesh-anim, .ff-pulse-dot { animation: none !important; }
        }
      `}</style>

      {/* LEFT — role-reactive brand panel */}
      <div className="hidden lg:flex relative w-[46%] overflow-hidden bg-[#0F2B22]">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="ff-mesh-anim absolute -top-24 -left-16 w-[420px] h-[420px] rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, #E8B34C 0%, transparent 70%)" }}
          />
          <div
            className="ff-mesh-anim absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #2E5C46 0%, transparent 70%)", animationDelay: "2s" }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#F7F8F5 1px, transparent 1px), linear-gradient(90deg, #F7F8F5 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E8B34C] flex items-center justify-center">
              <span className="ff-serif text-[#0F2B22] font-semibold text-lg">F</span>
            </div>
            <span className="ff-sans text-[#F7F8F5] font-semibold tracking-wide text-sm uppercase">
              FreeLincer
            </span>
          </div>

          {/* Animated role-based content OR verification content */}
          <div className="max-w-md">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <p className="ff-sans text-[#E8B34C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                    {content.eyebrow}
                  </p>
                  <h1 className="ff-serif text-[#F7F8F5] text-4xl xl:text-[2.75rem] leading-[1.15] mb-5">
                    {content.headline}
                  </h1>
                  <p className="ff-sans text-[#B9C7BE] text-base leading-relaxed mb-8">
                    {content.subcopy}
                  </p>

                  <div className="space-y-3">
                    {content.points.map((point, idx) => {
                      const Icon = point.icon;
                      return (
                        <motion.div
                          key={point.text}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + idx * 0.08 }}
                          className="flex items-center gap-3 bg-[#16241D]/80 border border-white/10 rounded-xl px-4 py-3"
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#E8B34C]/15 flex items-center justify-center shrink-0">
                            <Icon size={16} className="text-[#E8B34C]" />
                          </div>
                          <span className="ff-sans text-[#F7F8F5] text-sm">
                            {point.text}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <p className="ff-sans text-[#E8B34C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
                    Almost there
                  </p>
                  <h1 className="ff-serif text-[#F7F8F5] text-4xl xl:text-[2.75rem] leading-[1.15] mb-5">
                    Check your inbox.
                  </h1>
                  <p className="ff-sans text-[#B9C7BE] text-base leading-relaxed mb-8">
                    We've sent a 6-digit code to confirm it's really you —
                    enter it to finish setting up your {role === "CLIENT" ? "client" : "freelancer"} account.
                  </p>
                  <div className="flex items-center gap-3 bg-[#16241D]/80 border border-white/10 rounded-xl px-4 py-3 w-fit">
                    <div className="w-8 h-8 rounded-lg bg-[#E8B34C]/15 flex items-center justify-center shrink-0">
                      <MailCheck size={16} className="text-[#E8B34C]" />
                    </div>
                    <span className="ff-sans text-[#F7F8F5] text-sm truncate max-w-[220px]">
                      {email}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* footer status line */}
          <div className="flex items-center gap-2">
            <Circle size={8} className="text-[#7FD99F] ff-pulse-dot" fill="#7FD99F" />
            <p className="ff-sans text-[#8AA091] text-xs">
              2,400+ freelancers and clients online right now
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile-only logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-9 h-9 rounded-lg bg-[#0F2B22] flex items-center justify-center">
              <span className="ff-serif text-[#E8B34C] font-semibold text-lg">F</span>
            </div>
            <span className="ff-sans text-[#0F2B22] font-semibold tracking-wide text-sm uppercase">
              FreeLincer
            </span>
          </div>

          <div className="mb-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F2B22] flex items-center justify-center shrink-0">
              <UserPlus size={22} className="text-[#E8B34C]" />
            </div>
            <div>
              <h2 className="ff-serif text-3xl text-[#14231C] mb-1">
                {step === 1 ? "Create account" : "Verify your email"}
              </h2>
              <p className="ff-sans text-[#6B7C74] text-sm">
                {step === 1 ? "Join FreeLincer today" : `Code sent to ${email}`}
              </p>
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              {/* Name */}
              <div>
                <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="ff-sans w-full px-4 py-3 border border-[#DDE3DE] rounded-xl bg-white focus:outline-none focus:border-[#0F2B22] focus:ring-1 focus:ring-[#0F2B22] transition text-[#14231C] placeholder:text-[#9BAAA2]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9BAAA2]" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="ff-sans w-full pl-11 pr-4 py-3 border border-[#DDE3DE] rounded-xl bg-white focus:outline-none focus:border-[#0F2B22] focus:ring-1 focus:ring-[#0F2B22] transition text-[#14231C] placeholder:text-[#9BAAA2]"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9BAAA2]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="ff-sans w-full pl-11 pr-12 py-3 border border-[#DDE3DE] rounded-xl bg-white focus:outline-none focus:border-[#0F2B22] focus:ring-1 focus:ring-[#0F2B22] transition text-[#14231C] placeholder:text-[#9BAAA2]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9BAAA2] hover:text-[#14231C] transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Requirements */}
                <AnimatePresence>
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-1.5 overflow-hidden"
                    >
                      <p className="ff-sans text-xs text-[#6B7C74]">
                        Password must contain:
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { text: "8+ characters", met: password.length >= 8 },
                          { text: "Uppercase letter", met: /[A-Z]/.test(password) },
                          { text: "Lowercase letter", met: /[a-z]/.test(password) },
                          { text: "Number", met: /\d/.test(password) },
                          { text: "Special character", met: /[!@#$%^&*]/.test(password) },
                        ].map((req, idx) => (
                          <div
                            key={idx}
                            className={`ff-sans text-xs py-1.5 px-2.5 rounded-lg border ${
                              req.met
                                ? "bg-[#EAF7EE] text-[#1C7C3E] border-[#CFEBD9]"
                                : "bg-[#FBEAEA] text-[#B3261E] border-[#F3D0CF]"
                            }`}
                          >
                            {req.met ? "✓" : "✗"} {req.text}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Role Selection */}
              <div>
                <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                  Register as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("FREELANCER")}
                    className={`p-4 rounded-xl border-2 transition text-left ${
                      role === "FREELANCER"
                        ? "border-[#0F2B22] bg-[#0F2B22]/5"
                        : "border-[#DDE3DE] bg-white hover:border-[#9BAAA2]"
                    }`}
                  >
                    <Briefcase
                      size={20}
                      className={role === "FREELANCER" ? "text-[#0F2B22] mb-2" : "text-[#9BAAA2] mb-2"}
                    />
                    <div className="ff-sans text-sm font-semibold text-[#14231C]">
                      Freelancer
                    </div>
                    <div className="ff-sans text-xs text-[#6B7C74]">I want to find work</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("CLIENT")}
                    className={`p-4 rounded-xl border-2 transition text-left ${
                      role === "CLIENT"
                        ? "border-[#0F2B22] bg-[#0F2B22]/5"
                        : "border-[#DDE3DE] bg-white hover:border-[#9BAAA2]"
                    }`}
                  >
                    <Building2
                      size={20}
                      className={role === "CLIENT" ? "text-[#0F2B22] mb-2" : "text-[#9BAAA2] mb-2"}
                    />
                    <div className="ff-sans text-sm font-semibold text-[#14231C]">
                      Client
                    </div>
                    <div className="ff-sans text-xs text-[#6B7C74]">I want to hire</div>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || passwordErrors.length > 0}
                className="ff-sans group w-full bg-[#0F2B22] hover:bg-[#153A2C] disabled:bg-[#6B7C74] disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-base transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Sending OTP…"
                ) : (
                  <>
                    Send OTP
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>
          ) : (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="flex items-center gap-3 bg-[#0F2B22]/5 border border-[#0F2B22]/10 rounded-xl p-4">
                <MailCheck size={20} className="text-[#0F2B22] shrink-0" />
                <p className="ff-sans text-sm text-[#14231C]">
                  We've sent a 6-digit verification code to{" "}
                  <strong>{email}</strong>
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                  Verification code
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength="6"
                  className="ff-sans w-full px-4 py-3 border border-[#DDE3DE] rounded-xl bg-white focus:outline-none focus:border-[#0F2B22] focus:ring-1 focus:ring-[#0F2B22] transition text-[#14231C] text-center text-2xl font-mono tracking-[0.5em]"
                  required
                />
                <p className="ff-sans text-xs text-[#6B7C74] mt-2">
                  Enter the 6-digit code from your email
                </p>
              </div>

              {/* Verify Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={otpLoading || otp.length !== 6}
                className="ff-sans group w-full bg-[#0F2B22] hover:bg-[#153A2C] disabled:bg-[#6B7C74] disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold text-base transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {otpLoading ? (
                  "Verifying…"
                ) : (
                  <>
                    Verify &amp; continue
                    <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="ff-sans text-sm text-[#6B7C74]">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendCountdown > 0 || otpLoading}
                    className={`ff-sans font-semibold transition ${
                      resendCountdown > 0
                        ? "text-[#9BAAA2] cursor-not-allowed"
                        : "text-[#0F2B22] hover:text-[#E8B34C]"
                    }`}
                  >
                    {resendCountdown > 0 ? `Resend in ${resendCountdown}s` : "Resend OTP"}
                  </button>
                </p>
              </div>

              {/* Change Email */}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                }}
                className="ff-sans w-full text-[#6B7C74] hover:text-[#14231C] py-2 text-sm transition"
              >
                ← Back to registration
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="ff-sans text-center text-[#6B7C74] mt-8 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#0F2B22] hover:text-[#E8B34C] transition">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterWithOTP;