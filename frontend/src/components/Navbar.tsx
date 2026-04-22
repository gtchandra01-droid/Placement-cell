import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavLink {
  id: number;
  label: string;
  href: string;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    loadMenus();
    // Listen for storage changes from admin panel
    window.addEventListener("storage", loadMenus);
    return () => window.removeEventListener("storage", loadMenus);
  }, []);

  const loadMenus = () => {
    try {
      const saved = localStorage.getItem("menus");
      if (saved) {
        const menus = JSON.parse(saved);
        setNavLinks(menus);
      } else {
        // Default menus if none exist
        const defaultMenus: NavLink[] = [
          { id: 1, label: "Home", href: "/" },
          { id: 2, label: "About", href: "/about" },
          { id: 3, label: "Drives", href: "/drives" },
          { id: 4, label: "Companies", href: "/companies" },
          { id: 5, label: "Gallery", href: "/gallery" },
          { id: 6, label: "Statistics", href: "/statistics" },
          { id: 7, label: "Help", href: "/help" },
          { id: 8, label: "Contact", href: "/contact" },
        ];
        setNavLinks(defaultMenus);
        localStorage.setItem("menus", JSON.stringify(defaultMenus));
      }
    } catch (error) {
      console.error("Error loading menus:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand - Left */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-lg hover:text-orange-400 transition-colors flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-full border-2 border-orange-500 flex items-center justify-center text-orange-400 text-sm font-bold">
              JP
            </div>
            <span className="hidden sm:inline text-base">JNTUK Placement</span>
          </Link>

          {/* Desktop links - Center */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {navLinks.length > 0 ? (
              navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.id}
                    to={link.href}
                    className={`px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })
            ) : (
              <span className="text-white/50 text-sm">Loading menus...</span>
            )}
          </div>

          {/* Mobile toggle - Right */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-orange-500 bg-slate-900">
          <div className="flex flex-col px-4 py-3 gap-2">
            {navLinks.length > 0 ? (
              navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <span className="text-white/50 text-sm px-4 py-2">Loading menus...</span>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
