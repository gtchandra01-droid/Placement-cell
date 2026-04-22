import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, BarChart3 } from "lucide-react";
import axios from "axios";

type PlacementStat = {
  id: number;
  year: number;
  total_students: number;
  students_placed: number;
  highest_package: number;
  avg_package: number;
};

type ChartConfig = {
  id: string;
  title: string;
  dataSource: "placement_rate" | "package_distribution" | "year_comparison";
  enabled: boolean;
  color: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DEFAULT_CHARTS: ChartConfig[] = [
  {
    id: "placement_rate",
    title: "Placement Rate",
    dataSource: "placement_rate",
    enabled: true,
    color: "#3b82f6",
  },
  {
    id: "package_dist",
    title: "Package Distribution",
    dataSource: "package_distribution",
    enabled: true,
    color: "#10b981",
  },
  {
    id: "year_comp",
    title: "Year Comparison",
    dataSource: "year_comparison",
    enabled: true,
    color: "#f59e0b",
  },
];

export default function PlacementStats() {
  const [stats, setStats] = useState<PlacementStat[]>([]);
  const [charts, setCharts] = useState<ChartConfig[]>(DEFAULT_CHARTS);
  const [showModal, setShowModal] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);
  const [editingStat, setEditingStat] = useState<PlacementStat | null>(null);
  const [editingChart, setEditingChart] = useState<ChartConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "charts">("stats");

  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    total_students: "",
    students_placed: "",
    highest_package: "",
    avg_package: "",
  });

  const [chartFormData, setChartFormData] = useState({
    title: "",
    dataSource: "placement_rate" as "placement_rate" | "package_distribution" | "year_comparison",
    enabled: true,
    color: "#3b82f6",
  });

  useEffect(() => {
    fetchStats();
    loadChartConfig();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data || [];
        setStats(data);
        localStorage.setItem("placementStats", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      } catch (apiErr) {
        console.log("API failed, using localStorage");
        const saved = localStorage.getItem("placementStats");
        if (saved) setStats(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const loadChartConfig = () => {
    try {
      const saved = localStorage.getItem("chartConfigs");
      if (saved) {
        setCharts(JSON.parse(saved));
      } else {
        localStorage.setItem("chartConfigs", JSON.stringify(DEFAULT_CHARTS));
      }
    } catch (error) {
      console.error("Error loading chart config:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.year || !formData.total_students || !formData.students_placed) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = {
        year: parseInt(formData.year.toString()),
        total_students: parseInt(formData.total_students),
        students_placed: parseInt(formData.students_placed),
        highest_package: parseFloat(formData.highest_package),
        avg_package: parseFloat(formData.avg_package),
      };

      if (editingStat) {
        try {
          await axios.put(`${API_URL}/admin/stats/${editingStat.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (apiErr) {
          console.log("API update failed, using localStorage");
        }

        const updated = stats.map((s) =>
          s.id === editingStat.id ? { ...s, ...data } : s
        );
        setStats(updated);
        localStorage.setItem("placementStats", JSON.stringify(updated));
        alert("Statistics updated!");
      } else {
        try {
          const response = await axios.post(`${API_URL}/admin/stats`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newStat = response.data;
          const updated = [...stats, newStat];
          setStats(updated);
          localStorage.setItem("placementStats", JSON.stringify(updated));
        } catch (apiErr) {
          console.log("API create failed, using localStorage");
          const newStat = { id: Date.now(), ...data };
          const updated = [...stats, newStat];
          setStats(updated);
          localStorage.setItem("placementStats", JSON.stringify(updated));
        }
        alert("Statistics created!");
      }

      window.dispatchEvent(new Event("storage"));
      resetForm();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to save statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleChartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chartFormData.title) {
      alert("Please enter chart title");
      return;
    }

    try {
      let updated: ChartConfig[];

      if (editingChart) {
        updated = charts.map((c) =>
          c.id === editingChart.id ? { ...c, ...chartFormData } : c
        );
      } else {
        const newChart: ChartConfig = {
          id: `chart_${Date.now()}`,
          ...chartFormData,
        };
        updated = [...charts, newChart];
      }

      setCharts(updated);
      localStorage.setItem("chartConfigs", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      alert(editingChart ? "Chart updated!" : "Chart created!");
      resetChartForm();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to save chart");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${API_URL}/admin/stats/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (apiErr) {
        console.log("API delete failed, using localStorage");
      }

      const updated = stats.filter((s) => s.id !== id);
      setStats(updated);
      localStorage.setItem("placementStats", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      alert("Statistics deleted!");
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to delete statistics");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChart = (id: string) => {
    if (!window.confirm("Delete this chart?")) return;
    const updated = charts.filter((c) => c.id !== id);
    setCharts(updated);
    localStorage.setItem("chartConfigs", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
    alert("Chart deleted!");
  };

  const handleEdit = (stat: PlacementStat) => {
    setEditingStat(stat);
    setFormData({
      year: stat.year,
      total_students: stat.total_students.toString(),
      students_placed: stat.students_placed.toString(),
      highest_package: stat.highest_package.toString(),
      avg_package: stat.avg_package.toString(),
    });
    setShowModal(true);
  };

  const handleEditChart = (chart: ChartConfig) => {
    setEditingChart(chart);
    setChartFormData({
      title: chart.title,
      dataSource: chart.dataSource,
      enabled: chart.enabled,
      color: chart.color,
    });
    setShowChartModal(true);
  };

  const resetForm = () => {
    setFormData({
      year: new Date().getFullYear(),
      total_students: "",
      students_placed: "",
      highest_package: "",
      avg_package: "",
    });
    setEditingStat(null);
    setShowModal(false);
  };

  const resetChartForm = () => {
    setChartFormData({
      title: "",
      dataSource: "placement_rate",
      enabled: true,
      color: "#3b82f6",
    });
    setEditingChart(null);
    setShowChartModal(false);
  };

  const calculatePercentage = (placed: number, total: number) => {
    return total > 0 ? ((placed / total) * 100).toFixed(1) : "0";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Placement Statistics</h1>
            <p className="text-slate-600 mt-1">Manage placement data and configure pie charts</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-6 py-3 font-medium transition ${
              activeTab === "stats"
                ? "text-[#0b1c33] border-b-2 border-[#0b1c33]"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Placement Data
          </button>
          <button
            onClick={() => setActiveTab("charts")}
            className={`px-6 py-3 font-medium transition flex items-center gap-2 ${
              activeTab === "charts"
                ? "text-[#0b1c33] border-b-2 border-[#0b1c33]"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <BarChart3 size={18} /> Pie Charts
          </button>
        </div>

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowModal(true)}
                className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
              >
                <Plus size={18} /> Add Year
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Year</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Total Students</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Placed</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Placement %</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Highest Package</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Avg Package</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.length > 0 ? (
                    stats
                      .sort((a, b) => b.year - a.year)
                      .map((stat) => (
                        <tr key={stat.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-semibold text-gray-800">{stat.year}</td>
                          <td className="px-6 py-4 text-gray-600">{stat.total_students}</td>
                          <td className="px-6 py-4 text-gray-600">{stat.students_placed}</td>
                          <td className="px-6 py-4 text-[#d4a853] font-semibold">
                            {calculatePercentage(stat.students_placed, stat.total_students)}%
                          </td>
                          <td className="px-6 py-4 text-gray-600">₹{stat.highest_package} LPA</td>
                          <td className="px-6 py-4 text-gray-600">₹{stat.avg_package} LPA</td>
                          <td className="px-6 py-4 flex gap-3">
                            <button
                              onClick={() => handleEdit(stat)}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(stat.id)}
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No statistics yet. Click "Add Year" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Charts Tab */}
        {activeTab === "charts" && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setShowChartModal(true)}
                className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
              >
                <Plus size={18} /> Add Chart
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charts.map((chart) => (
                <div key={chart.id} className="bg-white rounded-xl shadow-md p-6 border-l-4" style={{ borderLeftColor: chart.color }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#0b1c33]">{chart.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Source: {chart.dataSource.replace(/_/g, " ")}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        chart.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {chart.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: chart.color }}
                    />
                    <span className="text-sm text-gray-600">Color: {chart.color}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditChart(chart)}
                      className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-sm font-medium"
                    >
                      <Pencil size={16} className="inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteChart(chart.id)}
                      className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition text-sm font-medium"
                    >
                      <Trash2 size={16} className="inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Configure which pie charts appear on the frontend Statistics page. Enable/disable charts and customize their appearance.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Stats Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0b1c33]">
                {editingStat ? "Edit Statistics" : "Add Statistics"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Students *
                  </label>
                  <input
                    type="number"
                    value={formData.total_students}
                    onChange={(e) => setFormData({ ...formData, total_students: e.target.value })}
                    placeholder="e.g., 2500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Students Placed *
                  </label>
                  <input
                    type="number"
                    value={formData.students_placed}
                    onChange={(e) => setFormData({ ...formData, students_placed: e.target.value })}
                    placeholder="e.g., 2400"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Highest Package (LPA) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.highest_package}
                    onChange={(e) => setFormData({ ...formData, highest_package: e.target.value })}
                    placeholder="e.g., 42"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Package (LPA) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.avg_package}
                    onChange={(e) => setFormData({ ...formData, avg_package: e.target.value })}
                    placeholder="e.g., 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Changes will appear instantly on the frontend Statistics page!
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 font-semibold transition"
                >
                  {loading ? "Saving..." : editingStat ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chart Modal */}
      {showChartModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0b1c33]">
                {editingChart ? "Edit Chart" : "Add Chart"}
              </h2>
              <button onClick={resetChartForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleChartSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chart Title *
                </label>
                <input
                  type="text"
                  value={chartFormData.title}
                  onChange={(e) => setChartFormData({ ...chartFormData, title: e.target.value })}
                  placeholder="e.g., Placement Rate Distribution"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Data Source *
                </label>
                <select
                  value={chartFormData.dataSource}
                  onChange={(e) => setChartFormData({ ...chartFormData, dataSource: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                >
                  <option value="placement_rate">Placement Rate (Placed vs Not Placed)</option>
                  <option value="package_distribution">Package Distribution (By Range)</option>
                  <option value="year_comparison">Year Comparison (Placement Trends)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chart Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={chartFormData.color}
                    onChange={(e) => setChartFormData({ ...chartFormData, color: e.target.value })}
                    className="w-12 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={chartFormData.color}
                    onChange={(e) => setChartFormData({ ...chartFormData, color: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-black"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chartFormData.enabled}
                    onChange={(e) => setChartFormData({ ...chartFormData, enabled: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-gray-700">Enable this chart on frontend</span>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Data Sources:</strong>
                  <br />• Placement Rate: Shows placed vs not placed students
                  <br />• Package Distribution: Breaks down salary ranges
                  <br />• Year Comparison: Compares placement trends across years
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] font-semibold transition"
                >
                  {editingChart ? "Update Chart" : "Create Chart"}
                </button>
                <button
                  type="button"
                  onClick={resetChartForm}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 font-semibold transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
