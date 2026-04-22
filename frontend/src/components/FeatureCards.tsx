import { Link } from "react-router-dom";
import { Briefcase, TrendingUp, Building2, Users, GraduationCap, Globe2, ArrowRight, Zap } from "lucide-react";

const features = [
  {
    title: "Campus Recruitment Drives",
    desc: "Top companies visit our campus regularly to recruit talented graduates across various domains and roles.",
    icon: Building2,
    color: "from-blue-500 to-blue-600",
    lightColor: "from-blue-50 to-blue-100",
    stat: "300+ Companies",
  },
  {
    title: "Skill Development Programs",
    desc: "Comprehensive training in aptitude, coding, soft skills, and domain-specific technologies.",
    icon: GraduationCap,
    color: "from-orange-500 to-orange-600",
    lightColor: "from-orange-50 to-orange-100",
    stat: "200+ Sessions",
  },
  {
    title: "Internship Opportunities",
    desc: "Gain real-world experience through internships with leading companies before your final placement.",
    icon: Briefcase,
    color: "from-red-500 to-red-600",
    lightColor: "from-red-50 to-red-100",
    stat: "1000+ Internships",
  },
  {
    title: "Career Mentorship",
    desc: "Get guidance from experienced alumni and placement officers to navigate your career path effectively.",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    lightColor: "from-purple-50 to-purple-100",
    stat: "15K+ Alumni",
  },
  {
    title: "Global Opportunities",
    desc: "Access international placement opportunities with multinational companies across 20+ countries.",
    icon: Globe2,
    color: "from-cyan-500 to-cyan-600",
    lightColor: "from-cyan-50 to-cyan-100",
    stat: "20+ Countries",
  },
  {
    title: "Salary Growth Tracking",
    desc: "Monitor your career progression and salary growth with our comprehensive placement analytics.",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-600",
    lightColor: "from-emerald-50 to-emerald-100",
    stat: "Real-time Data",
  },
];

export default function FeatureCards() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange-400/30 bg-orange-500/10 text-orange-600 text-sm font-semibold mb-6">
            <Zap className="w-4 h-4" />
            What We Offer
            <Zap className="w-4 h-4" />
          </div>

          <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">
            Shape Your
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              Career Future
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Embark on a transformative journey where innovation meets opportunity. From cutting-edge skill enhancement
            and AI-driven training to personalized placement strategies, we empower you to thrive in the dynamic
            tech landscape and beyond.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative h-full rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
              style={{
                animation: `fadeInUp 0.6s ease-out forwards`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-white border border-slate-100 group-hover:border-orange-500/50 transition-colors" />

              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${f.lightColor} opacity-0 group-hover:opacity-100 transition-opacity`} />

              {/* Content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${f.color} mb-6 shadow-lg group-hover:scale-110 transition-transform w-fit`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:bg-clip-text transition-all">
                  {f.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{f.desc}</p>

                {/* Link */}
                <Link
                  to="/drives"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:gap-3 transition-all group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>

              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link
            to="/drives"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:from-orange-600 hover:to-red-600 transition-colors"
          >
            Explore All Opportunities
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>  
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
