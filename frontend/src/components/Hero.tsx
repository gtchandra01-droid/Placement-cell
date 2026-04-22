import { Link } from "react-router-dom";
import { ArrowRight, Award, Building2, Users, TrendingUp, Sparkles } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

export default function Hero() {
  const { theme } = useTheme();
  
  const stats = {
    studentsPlaced: 12500,
    companiesVisited: 120,
    highestPackage: 60,
    placementPercent: 96,
  };

  const statsData = [
    { value: `${stats.studentsPlaced}+`, label: "Students Placed", icon: Users, color: "from-emerald-400 to-emerald-600" },
    { value: `${stats.companiesVisited}+`, label: "Companies", icon: Building2, color: "from-blue-400 to-blue-600" },
    { value: `₹${stats.highestPackage} LPA`, label: "Highest Package", icon: TrendingUp, color: "from-orange-400 to-orange-600" },
    { value: `${stats.placementPercent}%`, label: "Placement Rate", icon: Award, color: "from-red-400 to-red-600" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/JNTU_Kakinada_Main_Gate_03.jpg"
          alt="JNTUK Campus"
          className="w-full h-full object-cover"
        />
        
        {/* Dark Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-center items-center text-center">
        
        {/* JNTUK Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm text-sm font-semibold tracking-widest uppercase w-fit transition-all duration-300 hover:scale-105 border-orange-400/60 bg-orange-500/20 text-orange-300 hover:border-orange-300 mb-6">
          <Sparkles className="w-4 h-4" />
          JNTUK Placement Portal
        </div>

        {/* Main Heading */}
        <div className="space-y-4 mb-8 max-w-4xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white">
            Your Gateway to
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-orange-400">
              Success Starts Here
            </span>
          </h1>
          <p className="text-xl leading-relaxed text-white/90 max-w-2xl mx-auto">
            Join JNTUK's premier placement program. Connect with 150+ top companies and launch your career with packages up to ₹60 LPA.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link
            to="/drives"
            className="group relative px-8 py-4 rounded-xl font-bold text-lg overflow-hidden shadow-2xl transition-all duration-300 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-orange-500/50"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-red-500 to-orange-500" />
            <div className="relative flex items-center gap-2">
              Explore Drives
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/companies"
            className="group px-8 py-4 rounded-xl border-2 border-white/40 font-bold text-lg transition-all backdrop-blur-sm text-white hover:border-orange-400 hover:bg-white/10"
          >
            <div className="flex items-center gap-2">
              Top Companies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
          {statsData.map((s) => (
            <div
              key={s.label}
              className="group p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 bg-white/10 border-white/20 hover:border-orange-400/50 hover:bg-white/15"
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} shadow-lg group-hover:scale-110 transition-transform`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-white">{s.value}</p>
                  <p className="text-xs uppercase tracking-wider text-white/60">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs uppercase tracking-widest text-white/60">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full animate-pulse bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
