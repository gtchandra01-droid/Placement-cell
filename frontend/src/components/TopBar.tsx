import { Phone, Mail, MapPin, ChevronRight, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
      {/* Orange accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-2 text-white/60">
          <span className="hidden sm:flex items-center gap-1.5 text-orange-400 font-semibold text-xs">
            <ChevronRight className="w-3 h-3" />
            Placement Cell – JNTUK
          </span>
          <span className="hidden md:inline text-white/30 text-xs">|</span>
          <span className="hidden md:inline text-white/50 tracking-wide text-xs font-medium">
            Driving Careers · Connecting Talent · Building Futures
          </span>
        </div>

        {/* Center - Contact Info */}
        <div className="hidden lg:flex items-center gap-4 text-white/60">
          <a href="tel:+918842300900" className="flex items-center gap-1 hover:text-orange-400 transition-colors text-xs font-medium">
            <Phone className="w-3 h-3" />
            +91-884-2300900
          </a>
          <a href="mailto:placements@jntuk.edu.in" className="flex items-center gap-1 hover:text-orange-400 transition-colors text-xs font-medium">
            <Mail className="w-3 h-3" />
            placements@jntuk.edu.in
          </a>
          <span className="flex items-center gap-1 text-white/60 text-xs font-medium">
            <MapPin className="w-3 h-3" />
            Kakinada Campus
          </span>
        </div>

        {/* Right - Mobile Contact & Admin Button */}
        <div className="flex items-center gap-3">
          <a href="mailto:placements@jntuk.edu.in" className="flex lg:hidden items-center gap-1 hover:text-orange-400 transition-colors text-xs font-medium">
            <Mail className="w-3 h-3" />
            <span className="hidden sm:inline">placements@jntuk.edu.in</span>
          </a>
          
          <Link
            to="/admin/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold hover:shadow-md hover:shadow-orange-500/50 transition-all hover:scale-105 whitespace-nowrap"
          >
            <LogIn className="w-3 h-3" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
