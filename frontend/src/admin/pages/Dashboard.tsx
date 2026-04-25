import { useEffect, useState } from "react";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bell,
  ChevronRight,
  BarChart3,
  FileText,
  Image,
  AlertCircle,
  Trash2,
  Navigation,
  Zap,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalDrives: 0,
    totalPages: 0,
    totalImages: 0,
    totalMenus: 0,
    totalStats: 0,
    duplicateCompanies: 0,
    duplicateNotifications: 0,
  });
  const [recentCompanies, setRecentCompanies] = useState([]);
  const [recentDrives, setRecentDrives] = useState([]);
  const [duplicates, setDuplicates] = useState({ companies: [] });
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    const handleStorageChange = () => {
      fetchDashboardData();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchDashboardData = () => {
    try {
      const companies = JSON.parse(localStorage.getItem("companies") || "[]");
      const drives = JSON.parse(localStorage.getItem("placementDrives") || "[]");
      const pages = JSON.parse(localStorage.getItem("pages") || "[]");
      const images = JSON.parse(localStorage.getItem("images") || "[]");
      const menus = JSON.parse(localStorage.getItem("menus") || "[]");
      const placementStats = JSON.parse(localStorage.getItem("placementStats") || "[]");

      const companyDuplicates = findDuplicates(companies, "name");

      setStats({
        totalCompanies: companies.length,
        totalDrives: drives.length,
        totalPages: pages.length,
        totalImages: images.length,
        totalMenus: menus.length,
        totalStats: placementStats.length,
        duplicateCompanies: companyDuplicates.length,
        duplicateNotifications: 0,
      });

      setDuplicates({
        companies: companyDuplicates,
      });

      setRecentCompanies(companies.slice(-5).reverse());
      setRecentDrives(drives.slice(-5).reverse());
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  const findDuplicates = (items, key) => {
    const seen = {};
    const duplicateItems = [];

    items.forEach((item) => {
      const value = item[key];
      if (seen[value]) {
        if (!duplicateItems.find((d) => d[key] === value)) {
          duplicateItems.push(item);
        }
      } else {
        seen[value] = true;
      }
    });

    return duplicateItems;
  };

  const removeDuplicates = (type) => {
    try {
      if (type === "companies") {
        const companies = JSON.parse(localStorage.getItem("companies") || "[]");
        const seen = {};
        const unique = companies.filter((c) => {
          const key = c.name;
          if (seen[key]) return false;
          seen[key] = true;
          return true;
        });
        localStorage.setItem("companies", JSON.stringify(unique));
        window.dispatchEvent(new Event("storage"));
      }

      alert(`Duplicates removed from ${type}!`);
      fetchDashboardData();
    } catch (error) {
      console.error("Error removing duplicates", error);
    }
  };

  const statCards = [
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: Building2,
      iconBg: "bg-blue-500",
    },
    {
      title: "Placement Drives",
      value: stats.totalDrives,
      icon: Zap,
      iconBg: "bg-emerald-500",
    },
    {
      title: "Pages",
      value: stats.totalPages,
      icon: FileText,
      iconBg: "bg-violet-500",
    },
    {
      title: "Gallery Images",
      value: stats.totalImages,
      icon: Image,
      iconBg: "bg-amber-500",
    },
    {
      title: "Navigation Menus",
      value: stats.totalMenus,
      icon: Navigation,
      iconBg: "bg-pink-500",
    },
    {
      title: "Placement Stats",
      value: stats.totalStats,
      icon: BarChart3,
      iconBg: "bg-indigo-500",
    },
  ];

  if (loading) {
    return <div className="p-6 text-center text-black">Loading dashboard...</div>;
  }

  const totalItems = stats.totalCompanies + stats.totalDrives + stats.totalPages + stats.totalImages + stats.totalMenus + stats.totalStats;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3a82]">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time overview of placement portal management
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-300 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString()}
          </button>

          <button
            onClick={fetchDashboardData}
            className="px-4 py-2.5 rounded-lg bg-[#0b3a82] text-white text-sm font-medium hover:bg-[#0a2d6a] transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg p-5 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-[#0b3a82] mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 text-sm">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      {/* Duplicate Alert */}
      {stats.duplicateCompanies > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                Duplicate Data Detected
              </h3>
              <p className="text-red-800 mb-4">
                {stats.duplicateCompanies} duplicate companies found in your database.
              </p>
              <button
                onClick={() => setShowDuplicates(!showDuplicates)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                {showDuplicates ? "Hide Details" : "View & Remove Duplicates"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicates Details */}
      {showDuplicates && stats.duplicateCompanies > 0 && (
        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#0b3a82] flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Duplicate Companies ({stats.duplicateCompanies})
            </h3>
            <button
              onClick={() => removeDuplicates("companies")}
              className="px-3 py-1.5 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove All
            </button>
          </div>
          <div className="space-y-2">
            {duplicates.companies.map((company) => (
              <div key={company.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium text-[#0b3a82]">{company.name}</p>
                <p className="text-sm text-gray-600">{company.sector} • {company.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Companies */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-[#0b3a82] flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Recent Companies
            </h2>
            <span className="text-sm text-gray-500">{stats.totalCompanies} total</span>
          </div>

          <div className="divide-y divide-gray-100">
            {recentCompanies.length > 0 ? (
              recentCompanies.map((company) => (
                <div
                  key={company.id}
                  className="p-4 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[#0b3a82] font-medium group-hover:text-[#d4a853] transition-colors">
                        {company.name}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {company.sector} • {company.location}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#d4a853] transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 text-gray-500 text-center">No companies yet</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Drives */}
          <div className="bg-white rounded-lg border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0b3a82] flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Recent Drives
              </h2>
            </div>

            <div className="p-4 space-y-3">
              {recentDrives.length > 0 ? (
                recentDrives.map((drive) => (
                  <div
                    key={drive.id}
                    className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group"
                  >
                    <p className="text-[#0b3a82] font-medium text-sm group-hover:text-[#d4a853] transition-colors">
                      {drive.company_name}
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      {drive.role} • ₹{drive.package} LPA
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      📅 {drive.date}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center text-sm">No drives yet</p>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-gradient-to-br from-[#0b3a82] to-[#0a2d6a] rounded-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Portal Summary</h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Total Items</span>
                <span className="font-bold text-[#d4a853]">{totalItems}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Duplicates</span>
                <span className="font-bold text-red-400">{stats.duplicateCompanies}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300 text-sm">Last Updated</span>
                <span className="text-gray-400 text-sm">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>

              <div className="pt-3 border-t border-white/20">
                <p className="text-xs text-gray-300 mb-3">
                  ✓ All data syncs in real-time
                </p>
                <button className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
