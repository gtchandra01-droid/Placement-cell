import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Users, Briefcase, TrendingUp, Award } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-[#0b1c33] via-[#142a4d] to-[#0b1c33] text-white overflow-hidden flex items-center">

        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#d4a853]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4a853]/40 bg-[#d4a853]/10 text-[#d4a853] text-sm font-semibold w-fit">
                <Sparkles className="w-4 h-4" />
                Welcome to JNTUK
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-display font-bold leading-tight">
                  Your Path to
                  <span className="block bg-gradient-to-r from-[#d4a853] via-yellow-400 to-[#d4a853] bg-clip-text text-transparent">
                    Success Starts Here
                  </span>
                </h1>
                <p className="text-xl text-white/70 leading-relaxed max-w-lg">
                  Discover placement opportunities, connect with top companies, and launch your dream career with JNTUK's comprehensive placement portal.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/portal"
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4a853] to-yellow-500 text-[#0b1c33] font-bold text-lg overflow-hidden shadow-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-[#d4a853] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center gap-2">
                    Explore Portal
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link
                  to="/admin/login"
                  className="group px-8 py-4 rounded-xl border-2 border-white/30 text-white font-bold text-lg hover:border-[#d4a853] hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-2">
                    Admin Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-3xl font-display font-bold text-[#d4a853]">10K+</p>
                  <p className="text-sm text-white/60">Placed</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-[#d4a853]">320+</p>
                  <p className="text-sm text-white/60">Companies</p>
                </div>
                <div>
                  <p className="text-3xl font-display font-bold text-[#d4a853]">₹42L</p>
                  <p className="text-sm text-white/60">Max Package</p>
                </div>
              </div>
            </div>

            {/* Right - Visual */}
            <div className="relative h-[500px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                  alt="Campus"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c33] via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Success Rate</p>
                <p className="text-2xl font-display font-bold text-[#d4a853]">96% Placement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-display font-bold text-center text-[#0b1c33] mb-16">
            Why Choose JNTUK Placement Cell?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Expert Guidance", desc: "Personalized career counseling from experienced mentors" },
              { icon: Briefcase, title: "Top Companies", desc: "Recruitment from 320+ leading organizations" },
              { icon: TrendingUp, title: "High Packages", desc: "Competitive salaries up to ₹42 LPA" },
              { icon: Award, title: "Success Rate", desc: "96% placement rate with proven track record" },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-[#d4a853]/50 hover:shadow-lg transition-all text-center">
                <div className="inline-flex p-4 rounded-xl bg-[#d4a853]/10 mb-4">
                  <f.icon className="w-6 h-6 text-[#d4a853]" />
                </div>
                <h3 className="text-lg font-display font-bold text-[#0b1c33] mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold text-[#0b1c33] mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Browse placement drives, companies, and statistics. Login as admin to manage the portal.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/portal"
              className="group px-8 py-4 rounded-xl bg-[#0b1c33] text-white font-bold hover:bg-[#142a4d] transition-all flex items-center gap-2"
            >
              Visit Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/admin/login"
              className="group px-8 py-4 rounded-xl border-2 border-[#d4a853] text-[#0b1c33] font-bold hover:bg-[#d4a853]/10 transition-all flex items-center gap-2"
            >
              Admin Panel
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1c33] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60 mb-4">
            JNTUK Training & Placement Cell
          </p>
          <p className="text-sm text-white/40">
            © 2026 All Rights Reserved. Jawaharlal Nehru Technological University Kakinada
          </p>
        </div>
      </footer>
    </div>
  );
}
