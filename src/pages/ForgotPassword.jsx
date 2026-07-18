import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Lock, ShieldCheck } from "lucide-react";
import { authOtpAPI } from "../services/api";

const ForgotPassword = () => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await authOtpAPI.requestPasswordReset({ email });
      if (response.data?.success) {
        setMessage(response.data.message || "A password reset code has been sent to your email.");
        setStep("otp");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send reset code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await authOtpAPI.verifyPasswordResetOTP({ email, otp });
      if (response.data?.success) {
        setMessage("Code verified. Please set your new password.");
        setStep("reset");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await authOtpAPI.resetPassword({ email, otp, password });
      if (response.data?.success) {
        setMessage("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-amber-600 p-8 text-white text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold">Forgot Password</h2>
          <p className="text-amber-100 mt-2">Reset your password securely in a few steps</p>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}
          {message && (
            <div className="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>
          )}

          {step === "email" && (
            <form onSubmit={handleRequestCode} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-10 pr-4 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:bg-amber-400">
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Enter 6-digit code"
                />
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:bg-amber-400">
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button type="button" onClick={() => setStep("email")} className="flex items-center text-sm text-slate-600 hover:text-slate-900">
                <ArrowLeft size={16} className="mr-2" /> Back
              </button>
            </form>
          )}

          {step === "reset" && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">New Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-10 pr-4 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Confirm New Password</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-300 py-3 pl-10 pr-4 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-amber-600 px-4 py-3 font-semibold text-white transition hover:bg-amber-700 disabled:bg-amber-400">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-600">
            <Link to="/login" className="font-semibold text-amber-600 hover:text-amber-700">Return to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
