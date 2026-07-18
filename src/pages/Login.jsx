// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Eye,
  EyeOff,
  LogIn,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  IndianRupee,
  Star,
  Circle,
} from "lucide-react";
import { authOtpAPI } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use configured axios API instead of raw fetch
      const response = await authOtpAPI.login(formData);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store auth data in context (which also saves to localStorage)
      login(data.user, data.token);

      const { role, profile_completed } = data.user;

      // Navigate based on role and profile completion
      if (role === "ADMIN") {
        navigate("/adminDashboard");
      } else if (role === "FREELANCER") {
        if (profile_completed) {
          navigate("/freelancerdashboard");
        } else {
          navigate("/create-freelancer-profile");
        }
      } else if (role === "CLIENT") {
        if (profile_completed) {
          navigate("/clientDashboard");
        } else {
          navigate("/create-client-profile");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F7F8F5] font-[Inter]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

        .ff-serif { font-family: 'Fraunces', serif; }
        .ff-sans { font-family: 'Inter', sans-serif; }

        @keyframes ff-drift-1 {
          0%, 100% { transform: translate(0, 0) rotate(-2deg); }
          50% { transform: translate(0, -14px) rotate(-1deg); }
        }
        @keyframes ff-drift-2 {
          0%, 100% { transform: translate(0, 0) rotate(1.5deg); }
          50% { transform: translate(0, -10px) rotate(2.5deg); }
        }
        @keyframes ff-drift-3 {
          0%, 100% { transform: translate(0, 0) rotate(-1deg); }
          50% { transform: translate(0, -18px) rotate(0deg); }
        }
        @keyframes ff-mesh {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(3%, -3%) scale(1.06); }
        }
        @keyframes ff-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes ff-pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .ff-card-1 { animation: ff-drift-1 6s ease-in-out infinite; }
        .ff-card-2 { animation: ff-drift-2 7s ease-in-out infinite; animation-delay: .4s; }
        .ff-card-3 { animation: ff-drift-3 8s ease-in-out infinite; animation-delay: .8s; }
        .ff-mesh-anim { animation: ff-mesh 12s ease-in-out infinite; }
        .ff-fade-up { animation: ff-fade-up .7s cubic-bezier(.16,1,.3,1) both; }
        .ff-pulse-dot { animation: ff-pulse-dot 1.6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ff-card-1, .ff-card-2, .ff-card-3, .ff-mesh-anim, .ff-fade-up, .ff-pulse-dot {
            animation: none !important;
          }
        }
      `}</style>

      {/* LEFT — brand / content panel */}
      <div className="hidden lg:flex relative w-[46%] overflow-hidden bg-[#0F2B22]">
        {/* animated mesh backdrop */}
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

        {/* faint grid texture */}
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
          <div className="ff-fade-up flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E8B34C] flex items-center justify-center">
              <span className="ff-serif text-[#0F2B22] font-semibold text-lg">F</span>
            </div>
            <span className="ff-sans text-[#F7F8F5] font-semibold tracking-wide text-sm uppercase">
              FreeLincer
            </span>
          </div>

          {/* Headline + copy */}
          <div className="ff-fade-up max-w-md" style={{ animationDelay: "0.1s" }}>
            <p className="ff-sans text-[#E8B34C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Where work meets trust
            </p>
            <h1 className="ff-serif text-[#F7F8F5] text-4xl xl:text-[2.75rem] leading-[1.15] mb-5">
              Work worth showing up for.
            </h1>
            <p className="ff-sans text-[#B9C7BE] text-base leading-relaxed">
              Sign in to pick up where you left off — proposals in motion,
              contracts to review, and clients waiting on your next move.
            </p>
          </div>

          {/* Floating live-activity cards (signature element) */}
          <div className="relative h-56 hidden xl:block">
            <div className="ff-card-1 absolute top-0 left-2 w-64 bg-[#16241D]/90 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-[#7FD99F] shrink-0" />
                <div className="min-w-0">
                  <p className="ff-sans text-[#F7F8F5] text-sm font-medium truncate">
                    Contract signed
                  </p>
                  <p className="ff-sans text-[#8AA091] text-xs">Website redesign · Client</p>
                </div>
              </div>
            </div>

            <div className="ff-card-2 absolute top-20 left-24 w-60 bg-[#16241D]/90 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <IndianRupee size={18} className="text-[#E8B34C] shrink-0" />
                <div className="min-w-0">
                  <p className="ff-sans text-[#F7F8F5] text-sm font-medium truncate">
                    Payment released
                  </p>
                  <p className="ff-sans text-[#8AA091] text-xs">₹42,000 · Milestone 2</p>
                </div>
              </div>
            </div>

            <div className="ff-card-3 absolute top-40 left-6 w-60 bg-[#16241D]/90 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2.5">
                <Star size={18} className="text-[#E8B34C] shrink-0" fill="#E8B34C" />
                <div className="min-w-0">
                  <p className="ff-sans text-[#F7F8F5] text-sm font-medium truncate">
                    5.0 rating received
                  </p>
                  <p className="ff-sans text-[#8AA091] text-xs">"Exceptional work, on time"</p>
                </div>
              </div>
            </div>
          </div>

          {/* footer status line */}
          <div className="ff-fade-up flex items-center gap-2" style={{ animationDelay: "0.2s" }}>
            <Circle size={8} className="text-[#7FD99F] ff-pulse-dot" fill="#7FD99F" />
            <p className="ff-sans text-[#8AA091] text-xs">
              2,400+ freelancers and clients online right now
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT — form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md ff-fade-up">
          {/* Mobile-only logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-9 h-9 rounded-lg bg-[#0F2B22] flex items-center justify-center">
              <span className="ff-serif text-[#E8B34C] font-semibold text-lg">F</span>
            </div>
            <span className="ff-sans text-[#0F2B22] font-semibold tracking-wide text-sm uppercase">
              FreeLincer
            </span>
          </div>

          <div className="mb-8">
            <h2 className="ff-serif text-3xl text-[#14231C] mb-2">Welcome back</h2>
            <p className="ff-sans text-[#6B7C74] text-sm">
              Sign in to continue to your FreeLincer dashboard.
            </p>
          </div>

          {error && (
            <div className="ff-sans bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9BAAA2]"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="ff-sans w-full pl-11 pr-4 py-3 border border-[#DDE3DE] rounded-xl bg-white focus:outline-none focus:border-[#0F2B22] focus:ring-1 focus:ring-[#0F2B22] transition text-[#14231C] placeholder:text-[#9BAAA2]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="ff-sans block text-sm font-medium text-[#14231C] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9BAAA2]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="ff-sans w-full pl-11 pr-12 py-3 border border-[#DDE3DE] rounded-xl bg-white focus:outline-none focus:border-[#0F2B22] focus:ring-1 focus:ring-[#0F2B22] transition text-[#14231C] placeholder:text-[#9BAAA2]"
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
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="ff-sans text-sm text-[#0F2B22] hover:text-[#E8B34C] font-medium transition"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="ff-sans group w-full bg-[#0F2B22] hover:bg-[#153A2C] disabled:bg-[#6B7C74] text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Signing in…</>
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-[#E4E8E3]"></div>
            <span className="ff-sans text-[#9BAAA2] text-xs uppercase tracking-wide">or</span>
            <div className="h-px flex-1 bg-[#E4E8E3]"></div>
          </div>

          {/* Sign Up Link */}
          <p className="ff-sans text-center text-[#6B7C74] text-sm">
            Don't have an account?{" "}
            <Link
              to="/register-with-otp"
              className="font-semibold text-[#0F2B22] hover:text-[#E8B34C] transition"
            >
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;