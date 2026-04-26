import { TrendingUp, Users, Award, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";

interface DashboardStats {
  students_placed: number;
  companies_visited: number;
  highest_package: number;
  placement_percent: number;
}

interface YearStats {
  year: number;
  total_students: number;
  students_placed: number;
  highest_package: number;
  avg_package: number;
}

interface Recruiter {
  name: string;
  offers: number;
  package: number;
}

interface BranchPlacement {
  id: number;
  branch_name: string;
  total_students: number;
  students_placed: number;
  highest_package: number;
  avg_package: number;
  placement_percent: number;
}

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function Statistics() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    students_placed: 0,
    companies_visited: 0,
    highest_package: 0,
    placement_percent: 0,
  });

  const [yearStats, setYearStats] = useState<YearStats[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [branches, setBranches] = useState<BranchPlacement[]>([]);
  const [sectorData, setSectorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setError(null);
      console.log("Loading statistics data...");
      
      const statsRes = await api.get("placement/stats/placement-stats").catch(e => {
        console.error("placement-stats error:", e);
        return { data: {} };
      });
      
      const yearRes = await api.get("placement/stats/year-stats").catch(e => {
        console.error("year-stats error:", e);
        return { data: [] };
      });
      
      const recruitersRes = await api.get("recruiters").catch(e => {
        console.error("recruiters error:", e);
        return { data: [] };
      });
      
      const companiesRes = await api.get("companies").catch(e => {
        console.error("companies error:", e);
        return { data: [] };
      });
      
      const branchesRes = await api.get("branch-placements").catch(e => {
        console.error("branch-placements error:", e);
        return { data: [] };
      });

      console.log("Stats response:", statsRes.data);
      console.log("Year stats response:", yearRes.data);
      console.log("Recruiters response:", recruitersRes.data);
      console.log("Branches response:", branchesRes.data);

      setDashboardStats(statsRes.data || {});
      setYearStats(yearRes.data || []);
      setRecruiters(recruitersRes.data || []);
      setBranches(branchesRes.data || []);

      // Calculate sector distribution
      const companies = companiesRes.data || [];
      const sectorCount = {};
      companies.forEach((company: any) => {
        const sector = company.sector || "Other";
        sectorCount[sector] = (sectorCount[sector] || 0) + 1;
      });

      const data = Object.entries(sectorCount).map(([name, value]) => ({
        name,
        value,
      }));
      setSectorData(data);
    } catch (error) {
      console.error("Error loading statistics:", error);
      setError("Failed to load statistics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const SimplePieChart = ({ data, showLabels = true }) => {
    if (!data || data.length === 0) return null;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
      <div className="flex flex-col items-center gap-6">
        <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
          {data.map((item, index) => {
            const sliceAngle = (item.value / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + sliceAngle;

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = 150 + 100 * Math.cos(startRad);
            const y1 = 150 + 100 * Math.sin(startRad);
            const x2 = 150 + 100 * Math.cos(endRad);
            const y2 = 150 + 100 * Math.sin(endRad);

            const largeArc = sliceAngle > 180 ? 1 : 0;

            const pathData = [
              `M 150 150`,
              `L ${x1} ${y1}`,
              `A 100 100 0 ${largeArc} 1 ${x2} ${y2}`,
              `Z`,
            ].join(" ");

            const midAngle = (startAngle + endAngle) / 2;
            const midRad = (midAngle * Math.PI) / 180;
            const labelX = 150 + 65 * Math.cos(midRad);
            const labelY = 150 + 65 * Math.sin(midRad);

            currentAngle = endAngle;

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={COLORS[index % COLORS.length]}
                  stroke="white"
                  strokeWidth="2"
                />
                {showLabels && sliceAngle > 30 && (
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {((item.value / total) * 100).toFixed(0)}%
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-slate-600">
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading statistics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Placement Statistics</h1>
          <p className="text-white/70 text-lg">Comprehensive placement data and top recruiters</p>
        </div>
      </section>

      {error && (
        <section className="py-8 bg-red-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          </div>
        </section>
      )}

      {/* Key Stats */}
      <section className="py-16 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: "Total Placed", value: dashboardStats.students_placed, color: "text-blue-600" },
              { icon: TrendingUp, label: "Placement Rate", value: `${dashboardStats.placement_percent}%`, color: "text-green-600" },
              { icon: Award, label: "Highest Package", value: `₹${dashboardStats.highest_package} LPA`, color: "text-orange-600" },
              { icon: Building2, label: "Companies", value: dashboardStats.companies_visited, color: "text-purple-600" },
            ].map((s) => (
              <div key={s.label} className="p-6 rounded-xl bg-white border border-slate-100 text-center hover:shadow-lg transition-shadow">
                <s.icon className={`w-8 h-8 ${s.color} mx-auto mb-3`} />
                <p className="text-3xl font-display font-bold text-[#0b1c33]">{s.value}</p>
                <p className="text-slate-600 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Branch-wise Placements */}
      {branches.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-[#0b1c33] mb-8 text-center">
              Branch-wise Placement Details
            </h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="bg-[#faf8f3] p-8 rounded-xl border border-slate-100">
                  <SimplePieChart data={branches.map(b => ({ name: b.branch_name, value: b.students_placed }))} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#faf8f3] rounded-xl border border-slate-100 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="text-left py-3 px-4 font-semibold text-[#0b1c33]">Branch</th>
                        <th className="text-center py-3 px-4 font-semibold text-[#0b1c33]">Total</th>
                        <th className="text-center py-3 px-4 font-semibold text-[#0b1c33]">Placed</th>
                        <th className="text-center py-3 px-4 font-semibold text-[#0b1c33]">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.map((branch, index) => (
                        <tr key={branch.id} className="border-b border-slate-100 hover:bg-white transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></div>
                              <span className="font-medium text-[#0b1c33] text-xs">{branch.branch_name}</span>
                            </div>
                          </td>
                          <td className="text-center py-3 px-4 text-slate-600">{branch.total_students}</td>
                          <td className="text-center py-3 px-4 text-[#d4a853] font-bold">{branch.students_placed}</td>
                          <td className="text-center py-3 px-4 text-green-600 font-semibold">{Number(branch.placement_percent).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-semibold">Total Students:</span> {branches.reduce((sum, b) => sum + b.total_students, 0)}
                  </p>
                  <p className="text-sm text-blue-900 mt-1">
                    <span className="font-semibold">Total Placed:</span> {branches.reduce((sum, b) => sum + b.students_placed, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Year-wise Data */}
      {yearStats.length > 0 && (
        <section className="py-16 bg-[#faf8f3]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-[#0b1c33] mb-8">Year-wise Placement Data</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-xl shadow-sm">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-100">
                    <th className="text-left py-4 px-6 font-semibold text-[#0b1c33]">Year</th>
                    <th className="text-left py-4 px-6 font-semibold text-[#0b1c33]">Total Students</th>
                    <th className="text-left py-4 px-6 font-semibold text-[#0b1c33]">Placed</th>
                    <th className="text-left py-4 px-6 font-semibold text-[#0b1c33]">Placement %</th>
                    <th className="text-left py-4 px-6 font-semibold text-[#0b1c33]">Highest Package</th>
                    <th className="text-left py-4 px-6 font-semibold text-[#0b1c33]">Average Package</th>
                  </tr>
                </thead>
                <tbody>
                  {yearStats.map((s) => (
                    <tr key={s.year} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-[#0b1c33]">{s.year}</td>
                      <td className="py-4 px-6 text-slate-600">{s.total_students}</td>
                      <td className="py-4 px-6 text-slate-600">{s.students_placed}</td>
                      <td className="py-4 px-6 text-[#d4a853] font-semibold">
                        {((s.students_placed / s.total_students) * 100).toFixed(1)}%
                      </td>
                      <td className="py-4 px-6 text-slate-600">₹{s.highest_package} LPA</td>
                      <td className="py-4 px-6 text-slate-600">₹{s.avg_package} LPA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
