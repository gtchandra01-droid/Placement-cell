import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowUp } from "lucide-react";

const quickLinks = [
  { label: "Home",          href: "/" },
  { label: "About",         href: "/about" },
  { label: "Drives",        href: "/drives" },
  { label: "Companies",     href: "/companies" },
  { label: "Statistics",    href: "/statistics" },
  { label: "Notifications", href: "/notifications" },
];

const socials = [
  { Icon: Facebook,  href: "#" },
  { Icon: Twitter,   href: "#" },
  { Icon: Linkedin,  href: "#" },
  { Icon: Youtube,   href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">

      {/* Orange top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/jntu-logo.jpeg" alt="JNTUK" className="w-12 h-12 rounded-full border-2 border-orange-500/40 object-contain" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-orange-500 font-semibold">Placement Portal</p>
                <h3 className="text-lg font-display font-bold">JNTUK</h3>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-sm">
              The Training & Placement Cell at Jawaharlal Nehru Technological
              University Kakinada — bridging talent with opportunity since 2008.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-white/50 hover:border-orange-500 hover:text-orange-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-orange-500 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-white/55 text-sm hover:text-orange-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-widest uppercase text-orange-500 mb-5">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/55">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>HSB Ground Floor, JNTUK, Kakinada – 533003, Andhra Pradesh</span>
              </li>
              <li>
                <a href="tel:+918842300900" className="flex gap-3 hover:text-orange-400 transition-colors">
                  <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  +91-884-2300900
                </a>
              </li>
              <li>
                <a href="mailto:placements@jntuk.edu.in" className="flex gap-3 hover:text-orange-400 transition-colors">
                  <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  placements@jntuk.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© 2026 JNTUK Training & Placement Cell. All Rights Reserved.</p>
          <p>Designed for JNTUK Students & Recruiters</p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg hover:shadow-orange-500/50 transition-all z-50"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
}
