import { useEffect, useState } from "react";
import {
  Building2,
  Calendar,
  ChevronRight,
  BarChart3,
  FileText,
  Image,
  AlertCircle,
  Trash2,
  Navigation,
  Zap,
} from "lucide-react";

/** ✅ TYPES */
interface Company {
  id: number;
  name: string;
  sector: string;
  location: string;
}

interface Drive {
  id: number;
  company_name: string;
  role: string;
  package: number;
  date: string;
}

interface Stats {
  totalCompanies: number;
  totalDrives: number;
  totalPages: number;
  totalImages: number;
  totalMenus: number;
  totalStats: number;
  duplicateCompanies: number;
  duplicateNotifications: number;
}

export default function Dashboard() {
  /** ✅ STATE FIXED */
  const [stats, setStats] = useState<Stats>({
    totalCompanies: 0,
    totalDrives: 0,
    totalPages: 0,
    totalImages: 0,
    totalMenus: 0,
    totalStats: 0,
    duplicateCompanies: 0,
    duplicateNotifications: 0,
  });

  const [recentCompanies, setRecentCompanies] = useState<Company[]>([]);
  const [recentDrives, setRecentDrives] = useState<Drive[]>([]);
  const [duplicates, setDuplicates] = useState<{ companies: Company[] }>({
    companies: [],
  });

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

  /** ✅ FETCH DATA FIXED */
  const fetchDashboardData = () => {
    try {
      const companies: Company[] = JSON.parse(localStorage.getItem("companies") || "[]");
      const drives: Drive[] = JSON.parse(localStorage.getItem("placementDrives") || "[]");
      const pages = JSON.parse(localStorage.getItem("pages") || "[]");
      const images = JSON.parse(localStorage.getItem("images") || "[]");
      const menus = JSON.parse(localStorage.getItem("menus") || "[]");
      const placementStats = JSON.parse(localStorage.getItem("placementStats") || "[]");

      const companyDuplicates = findDuplicates<Company>(companies, "name");

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

      setDuplicates({ companies: companyDuplicates });

      setRecentCompanies(companies.slice(-5).reverse());
      setRecentDrives(drives.slice(-5).reverse());
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  /** ✅ GENERIC DUPLICATE FUNCTION */
  const findDuplicates = <T extends Record<string, any>>(
    items: T[],
    key: keyof T
  ): T[] => {
    const seen: Record<string, boolean> = {};
    const duplicateItems: T[] = [];

    items.forEach((item) => {
      const value = String(item[key]);
      if (seen[value]) {
        if (!duplicateItems.find((d) => String(d[key]) === value)) {
          duplicateItems.push(item);
        }
      } else {
        seen[value] = true;
      }
    });

    return duplicateItems;
  };

  /** ✅ REMOVE DUPLICATES FIXED */
  const removeDuplicates = (type: "companies") => {
    try {
      if (type === "companies") {
        const companies: Company[] = JSON.parse(localStorage.getItem("companies") || "[]");

        const seen: Record<string, boolean> = {};
        const unique = companies.filter((c) => {
          if (seen[c.name]) return false;
          seen[c.name] = true;
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

  /** ✅ STAT CARDS */
  const statCards = [
    { title: "Companies", value: stats.totalCompanies, icon: Building2, iconBg: "bg-blue-500" },
    { title: "Placement Drives", value: stats.totalDrives, icon: Zap, iconBg: "bg-emerald-500" },
    { title: "Pages", value: stats.totalPages, icon: FileText, iconBg: "bg-violet-500" },
    { title: "Gallery Images", value: stats.totalImages, icon: Image, iconBg: "bg-amber-500" },
    { title: "Navigation Menus", value: stats.totalMenus, icon: Navigation, iconBg: "bg-pink-500" },
    { title: "Placement Stats", value: stats.totalStats, icon: BarChart3, iconBg: "bg-indigo-500" },
  ];

  if (loading) {
    return <div className="p-6 text-center text-black">Loading dashboard...</div>;
  }

  const totalItems =
    stats.totalCompanies +
    stats.totalDrives +
    stats.totalPages +
    stats.totalImages +
    stats.totalMenus +
    stats.totalStats;

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3a82]">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time overview of placement portal management</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-lg bg-white border text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString()}
          </button>

          <button
            onClick={fetchDashboardData}
            className="px-4 py-2.5 rounded-lg bg-[#0b3a82] text-white"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {statCards.map((stat) => (
          <div key={stat.title} className="bg-white p-5 rounded-lg border">
            <stat.icon className="w-5 h-5 text-white mb-2" />
            <h3 className="text-2xl font-bold">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* RECENT COMPANIES */}
      <div className="bg-white rounded-lg border">
        {recentCompanies.map((company) => (
          <div key={company.id} className="p-4 border-b">
            <p>{company.name}</p>
            <p className="text-sm text-gray-500">
              {company.sector} • {company.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}