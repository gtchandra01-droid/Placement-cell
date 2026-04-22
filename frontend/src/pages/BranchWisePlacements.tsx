import { useEffect, useState } from "react";
import api from "../api/axios";

interface BranchPlacement {
  id: number;
  branch_name: string;
  total_students: number;
  students_placed: number;
  highest_package: number;
  avg_package: number;
  placement_percent: number;
}

export default function BranchWisePlacements() {
  const [branches, setBranches] = useState<BranchPlacement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const response = await api.get("branch-placements");
      setBranches(response.data || []);
    } catch (error) {
      console.error("Error loading branches:", error);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading branch placements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Branch-wise Placements</h1>
          <p className="text-white/70 text-lg">Placement statistics by engineering branch</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {branches && branches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0b1c33] to-[#1a2b47] text-white">
                    <th className="text-left py-4 px-6 font-semibold">Branch Name</th>
                    <th className="text-center py-4 px-6 font-semibold">Total Students</th>
                    <th className="text-center py-4 px-6 font-semibold">Placed</th>
                    <th className="text-center py-4 px-6 font-semibold">Placement %</th>
                    <th className="text-center py-4 px-6 font-semibold">Highest Package</th>
                    <th className="text-center py-4 px-6 font-semibold">Average Package</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch, index) => (
                    <tr
                      key={branch.id}
                      className={`border-b transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      } hover:bg-orange-50`}
                    >
                      <td className="py-4 px-6 font-semibold text-[#0b1c33]">{branch.branch_name}</td>
                      <td className="text-center py-4 px-6 text-slate-600">{branch.total_students}</td>
                      <td className="text-center py-4 px-6 text-slate-600">{branch.students_placed}</td>
                      <td className="text-center py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                          {branch.placement_percent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="text-center py-4 px-6 text-slate-600 font-medium">
                        ₹{branch.highest_package} LPA
                      </td>
                      <td className="text-center py-4 px-6 text-slate-600 font-medium">
                        ₹{branch.avg_package} LPA
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No branch placement data available</p>
            </div>
          )}
        </div>
      </section>

      {/* Summary Cards */}
      {branches && branches.length > 0 && (
        <section className="py-16 bg-[#faf8f3]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-display font-bold text-[#0b1c33] mb-8 text-center">
              Overall Statistics
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-white border border-slate-100 text-center hover:shadow-lg transition-shadow">
                <p className="text-4xl font-display font-bold text-[#0b1c33]">
                  {branches.reduce((sum, b) => sum + b.total_students, 0)}
                </p>
                <p className="text-slate-600 text-sm mt-2">Total Students</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-100 text-center hover:shadow-lg transition-shadow">
                <p className="text-4xl font-display font-bold text-green-600">
                  {branches.reduce((sum, b) => sum + b.students_placed, 0)}
                </p>
                <p className="text-slate-600 text-sm mt-2">Students Placed</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-100 text-center hover:shadow-lg transition-shadow">
                <p className="text-4xl font-display font-bold text-orange-600">
                  ₹{Math.max(...branches.map(b => b.highest_package)).toFixed(1)}
                </p>
                <p className="text-slate-600 text-sm mt-2">Highest Package</p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-slate-100 text-center hover:shadow-lg transition-shadow">
                <p className="text-4xl font-display font-bold text-blue-600">
                  {(branches.reduce((sum, b) => sum + b.placement_percent, 0) / branches.length).toFixed(1)}%
                </p>
                <p className="text-slate-600 text-sm mt-2">Avg Placement %</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
