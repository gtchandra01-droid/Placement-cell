import { Link } from "react-router-dom";
import { ArrowRight, Target, Eye, Heart, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Prepare JNTUK students for industry-ready careers through comprehensive training programs, campus recruitment drives, and strategic corporate partnerships.",
    color: "from-blue-500 to-blue-600",
    benefits: ["Industry Training", "Campus Drives", "Career Guidance"],
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "Position JNTUK as a premier recruitment hub connecting exceptional talent with global technology and business leaders.",
    color: "from-orange-500 to-orange-600",
    benefits: ["Global Reach", "Top Companies", "Excellence"],
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Student success, integrity, excellence, innovation, and long-term industry relationships guide everything we do.",
    color: "from-red-500 to-red-600",
    benefits: ["Student Focus", "Integrity", "Innovation"],
  },
];

export default function Intro() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">

      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-400/30 bg-orange-500/10 text-orange-600 text-sm font-semibold mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            About JNTUK Placement Cell
            <div className="w-2 h-2 rounded-full bg-orange-500" />
          </div>

          <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
            Shaping Careers Through
            <span className="block bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Training & Recruitment
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            The Training & Placement Cell at JNTUK acts as the bridge between students and recruiters, 
            organizing campus drives, career guidance programs, internships, and industry-aligned training.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">

          {/* Left - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-orange-600 font-semibold">
                <div className="w-8 h-0.5 bg-orange-500" />
                <span>Why Choose JNTUK</span>
              </div>

              <p className="text-lg text-slate-700 leading-relaxed">
                We work closely with top organizations across IT, core engineering, analytics, and finance sectors 
                to ensure strong placement outcomes every academic year.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {[
                "320+ recruiting companies visit our campus",
                "10,500+ students successfully placed",
                "₹60 LPA highest package offered",
                "96% placement rate achieved",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <div className="p-1 rounded-full bg-orange-500/20 group-hover:bg-orange-500/40 transition-colors mt-1">
                    <CheckCircle2 className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-slate-700 font-medium">{point}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/companies"
                className="group px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center gap-2"
              >
                Explore Recruiters
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/statistics"
                className="group px-6 py-3 rounded-xl border-2 border-orange-400/40 text-slate-900 font-semibold hover:border-orange-500 hover:bg-orange-500/10 transition-all"
              >
                View Reports
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative h-[400px] group">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200"
                alt="Campus"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 max-w-xs">
              <p className="text-sm text-slate-500 uppercase tracking-wider mb-2">Success Rate</p>
              <p className="text-4xl font-display font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-1">96%</p>
              <p className="text-sm text-slate-600">Students placed in 2024</p>
            </div>

            <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10" />
          </div>
        </div>

        {/* Pillars Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-display font-bold text-slate-900">Our Core Pillars</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative p-8 rounded-2xl bg-white border border-slate-100 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-opacity`} />

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${pillar.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <pillar.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h4 className="text-2xl font-display font-bold text-slate-900 mb-3">{pillar.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-6">{pillar.desc}</p>

                {/* Benefits */}
                <div className="space-y-2">
                  {pillar.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${pillar.color}`} />
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
