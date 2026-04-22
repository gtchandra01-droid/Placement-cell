import { useState, useRef, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Check,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  isMobileMenuOpen: boolean;
}

const notifications = [
  {
    id: 1,
    title: "New student application",
    message: "Sarah Mitchell submitted an application for Computer Science",
    time: "2 min ago",
    read: false,
    type: "application",
  },
  {
    id: 2,
    title: "Faculty meeting reminder",
    message: "Department meeting starts in 30 minutes",
    time: "28 min ago",
    read: false,
    type: "reminder",
  },
  {
    id: 3,
    title: "Course update",
    message: "Advanced Mathematics course has been updated",
    time: "1 hour ago",
    read: true,
    type: "update",
  },
  {
    id: 4,
    title: "System maintenance",
    message: "Scheduled maintenance tonight at 2:00 AM",
    time: "3 hours ago",
    read: true,
    type: "system",
  },
];

export default function Header({ onMenuClick, isMobileMenuOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-slate-600" />
          ) : (
            <Menu className="w-6 h-6 text-slate-600" />
          )}
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students, courses..."
            className="w-64 lg:w-80 h-11 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-navy placeholder:text-slate-400 focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/10 outline-none transition-all"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {/* Mobile Search */}
        <button className="sm:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
          <Search className="w-5 h-5 text-slate-600" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-display text-navy">Notifications</h3>
                <button className="text-sm text-gold hover:text-gold-light font-medium transition-colors">
                  Mark all read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer ${
                      !notification.read ? "bg-gold/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${notification.read ? "bg-slate-300" : "bg-gold"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-navy font-medium text-sm">{notification.title}</p>
                        <p className="text-slate-500 text-sm mt-0.5 line-clamp-2">{notification.message}</p>
                        <p className="text-slate-400 text-xs mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
                          <Check className="w-4 h-4 text-slate-400" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-slate-100">
                <button className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium transition-colors">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="hidden sm:block text-right">
              <p className="text-navy font-medium text-sm">Admin User</p>
              <p className="text-slate-500 text-xs">admin@jntuk.edu.in</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white font-semibold">
              AU
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showProfile ? "rotate-180" : ""}`} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center text-white font-semibold text-lg">
                    AU
                  </div>
                  <div>
                    <p className="text-navy font-medium">Admin User</p>
                    <p className="text-slate-500 text-sm">Super Administrator</p>
                  </div>
                </div>
              </div>
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">My Profile</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                  <Settings className="w-5 h-5" />
                  <span className="text-sm font-medium">Account Settings</span>
                </button>
              </div>
              <div className="p-2 border-t border-slate-100">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
