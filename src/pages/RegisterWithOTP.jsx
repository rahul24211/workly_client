import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, UserPlus, Mail, Lock, Users } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <UserPlus size={30} className="text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-white/80 mt-2">
              {step === 1 ? "Join Workly today" : "Verify your email"}
            </p>
          </div>

          {/* Step 1: Registration */}
          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-sm text-white/80 block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-indigo-400 transition"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-white/80 block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-indigo-400 transition"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-white/80 block mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-indigo-400 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-white/70 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-white/60">
                      Password must contain:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { text: "8+ characters", met: password.length >= 8 },
                        {
                          text: "Uppercase letter",
                          met: /[A-Z]/.test(password),
                        },
                        {
                          text: "Lowercase letter",
                          met: /[a-z]/.test(password),
                        },
                        { text: "Number", met: /\d/.test(password) },
                        {
                          text: "Special character",
                          met: /[!@#$%^&*]/.test(password),
                        },
                      ].map((req, idx) => (
                        <div
                          key={idx}
                          className={`text-xs py-1 px-2 rounded ${
                            req.met
                              ? "bg-green-500/20 text-green-200"
                              : "bg-red-500/20 text-red-200"
                          }`}
                        >
                          {req.met ? "✓" : "✗"} {req.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="text-sm text-white/80 block mb-2">
                  Register As
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("FREELANCER")}
                    className={`p-3 rounded-xl border-2 transition ${
                      role === "FREELANCER"
                        ? "border-indigo-400 bg-indigo-400/20"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <Users size={20} className="mx-auto mb-1 text-white" />
                    <div className="text-xs font-medium text-white">
                      Freelancer
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("CLIENT")}
                    className={`p-3 rounded-xl border-2 transition ${
                      role === "CLIENT"
                        ? "border-indigo-400 bg-indigo-400/20"
                        : "border-white/20 bg-white/5 hover:border-white/40"
                    }`}
                  >
                    <Users size={20} className="mx-auto mb-1 text-white" />
                    <div className="text-xs font-medium text-white">
                      Client
                    </div>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading || passwordErrors.length > 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500/50 text-white py-3 rounded-xl font-semibold shadow-lg disabled:cursor-not-allowed transition"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </motion.button>
            </form>
          ) : (
            /* Step 2: OTP Verification */
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="bg-indigo-500/10 border border-indigo-400/30 rounded-xl p-4 mb-6">
                <p className="text-sm text-white/80">
                  We've sent a 6-digit verification code to{" "}
                  <strong className="text-white">{email}</strong>
                </p>
              </div>

              {/* OTP Input */}
              <div>
                <label className="text-sm text-white/80 block mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength="6"
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-indigo-400 transition text-center text-2xl font-mono tracking-widest"
                  required
                />
                <p className="text-xs text-white/60 mt-2">
                  Enter the 6-digit code from your email
                </p>
              </div>

              {/* Verify Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={otpLoading || otp.length !== 6}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-500/50 text-white py-3 rounded-xl font-semibold shadow-lg disabled:cursor-not-allowed transition"
              >
                {otpLoading ? "Verifying..." : "Verify & Continue"}
              </motion.button>

              {/* Resend OTP */}
              <div className="text-center">
                <p className="text-sm text-white/60">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendCountdown > 0 || otpLoading}
                    className={`font-semibold transition ${
                      resendCountdown > 0
                        ? "text-white/40 cursor-not-allowed"
                        : "text-indigo-300 hover:text-indigo-200"
                    }`}
                  >
                    {resendCountdown > 0
                      ? `Resend in ${resendCountdown}s`
                      : "Resend OTP"}
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
                className="w-full text-white/60 hover:text-white py-2 text-sm transition"
              >
                ← Back to Registration
              </button>
            </form>
          )}

          {/* Footer */}
          <p className="text-center text-white/70 mt-8 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-300 hover:text-indigo-200 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterWithOTP;
