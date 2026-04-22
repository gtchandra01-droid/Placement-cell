import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowRight, GraduationCap } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const { authService } = await import("../services/auth.services");
      await authService.login({ email: formData.email, password: formData.password });
      navigate("/admin");
    } catch (err: any) {
      const serverMessage = err?.response?.data?.message;
      setError(serverMessage || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-navy overflow-hidden">
        {/* JNTUK Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/jntu-logo.jpeg" 
            alt="JNTUK Logo Background" 
            className="w-full h-full object-contain opacity-10"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 xl:px-24">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-xl bg-gold/20 flex items-center justify-center border border-gold/30">
              <GraduationCap className="w-8 h-8 text-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-display text-white tracking-tight">JNTUK</h1>
              <p className="text-gold/80 text-sm font-medium tracking-widest uppercase">University</p>
            </div>
          </div>

          <h2 className="text-5xl xl:text-6xl font-display text-white leading-tight mb-6">
            Admin<br />
            <span className="text-gold">Portal</span>
          </h2>

          <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-12">
            Manage students, faculty, courses, and institutional resources from a single unified dashboard.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3">
            {["Student Management", "Faculty Portal", "Course Analytics", "Reports"].map((feature, i) => (
              <span
                key={feature}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-ivory">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h1 className="text-xl font-display text-navy">JNTUK</h1>
              <p className="text-slate-500 text-xs tracking-widest uppercase">Admin Portal</p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-3xl font-display text-navy mb-2">Welcome back</h3>
            <p className="text-slate-500">Enter your credentials to access the admin dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy/80 block">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@jntuk.edu.in"
                  className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-navy/80 block">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-gold transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full h-14 pl-12 pr-12 rounded-xl border-2 border-slate-200 bg-white text-navy placeholder:text-slate-400 focus:border-gold focus:ring-4 focus:ring-gold/10 outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-slate-300 bg-white peer-checked:bg-gold peer-checked:border-gold transition-all flex items-center justify-center">
                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-navy transition-colors">Remember me</span>
              </label>

              <Link to="/admin/forgot-password" className="text-sm text-gold hover:text-gold-light font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-xl bg-navy text-white font-medium flex items-center justify-center gap-3 hover:bg-navy-light disabled:opacity-70 transition-all group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 pt-8 border-t border-slate-200">
            <p className="text-center text-slate-500 text-sm">
              Need help? Contact{" "}
              <a href="mailto:support@jntuk.edu.in" className="text-gold hover:underline">
                IT Support
              </a>
            </p>
          </div>

          {/* Back to site */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-navy transition-colors inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to main site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
