import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, BarChart3 } from "lucide-react";
import api from "../../api/axios";

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

interface DashboardStats {
  students_placed: number;
  companies_visited: number;
  highest_package: number;
  placement_percent: number;
}

export default function Statistics() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    students_placed: 0,
    companies_visited: 0,
    highest_package: 0,
    placement_percent: 0,
  });

  const [yearStats, setYearStats] = useState<YearStats[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDashboardModal, setShowDashboardModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [editingYear, setEditingYear] = useState<YearStats | null>(null);
  const [editingRecruiter, setEditingRecruiter] = useState<Recruiter | null>(null);

  const [dashboardForm, setDashboardForm] = useState(dashboardStats);
  const [yearForm, setYearForm] = useState<YearStats>({
    year: new Date().getFullYear(),
    total_students: 0,
    students_placed: 0,
    highest_package: 0,
    avg_package: 0,
  });
  const [recruiterForm, setRecruiterForm] = useState<Recruiter>({
    name: "",
    offers: 0,
    package: 0,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [statsRes, yearRes, recruitersRes] = await Promise.all([
        api.get("/placement-stats"),
        api.get("/year-stats"),
        api.get("/recruiters"),
      ]);

      setDashboardStats(statsRes.data);
      setDashboardForm(statsRes.data);
      setYearStats(yearRes.data);
      setRecruiters(recruitersRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch statistics");
    } finally {
      setLoading(false);
    }
  };

  // Dashboard Stats
  const handleDashboardSubmit = async () => {
    try {
      await api.put("/admin/placement-stats", dashboardForm);
      setDashboardStats(dashboardForm);
      setShowDashboardModal(false);
      alert("Dashboard statistics updated!");
    } catch (error) {
      console.error("Error updating stats:", error);
      alert("Failed to update statistics");
    }
  };

  // Year Stats
  const handleYearSubmit = async () => {
    try {
      if (editingYear) {
        await api.put(`/admin/year-stats/${editingYear.year}`, yearForm);
        alert("Year statistics updated!");
      } else {
        await api.post("/admin/year-stats", yearForm);
        alert("Year statistics added!");
      }
      fetchAllData();
      resetYearForm();
    } catch (error: any) {
      console.error("Error saving year stat:", error);
      alert(error.response?.data?.message || "Failed to save year statistics");
    }
  };

  const handleYearEdit = (year: YearStats) => {
    setEditingYear(year);
    setYearForm(year);
    setShowYearModal(true);
  };

  const handleYearDelete = async (year: number) => {
    if (!window.confirm("Delete this year's data?")) return;
    try {
      await api.delete(`/admin/year-stats/${year}`);
      fetchAllData();
      alert("Year statistics deleted!");
    } catch (error) {
      console.error("Error deleting year stat:", error);
      alert("Failed to delete year statistics");
    }
  };

  const resetYearForm = () => {
    setYearForm({
      year: new Date().getFullYear(),
      total_students: 0,
      students_placed: 0,
      highest_package: 0,
      avg_package: 0,
    });
    setEditingYear(null);
    setShowYearModal(false);
  };

  // Recruiters
  const handleRecruiterSubmit = async () => {
    try {
      if (editingRecruiter) {
        await api.put(`/admin/recruiters/${editingRecruiter.name}`, recruiterForm);
        alert("Recruiter updated!");
      } else {
        await api.post("/admin/recruiters", recruiterForm);
        alert("Recruiter added!");
      }
      fetchAllData();
      resetRecruiterForm();
    } catch (error: any) {
      console.error("Error saving recruiter:", error);
      alert(error.response?.data?.message || "Failed to save recruiter");
    }
  };

  const handleRecruiterEdit = (recruiter: Recruiter) => {
    setEditingRecruiter(recruiter);
    setRecruiterForm(recruiter);
    setShowRecruiterModal(true);
  };

  const handleRecruiterDelete = async (name: string) => {
    if (!window.confirm("Delete this recruiter?")) return;
    try {
      await api.delete(`/admin/recruiters/${name}`);
      fetchAllData();
      alert("Recruiter deleted!");
    } catch (error) {
      console.error("Error deleting recruiter:", error);
      alert("Failed to delete recruiter");
    }
  };

  const resetRecruiterForm = () => {
    setRecruiterForm({ name: "", offers: 0, package: 0 });
    setEditingRecruiter(null);
    setShowRecruiterModal(false);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b3a82] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#0b3a82]">Placement Statistics Management</h1>

      {/* Dashboard Stats */}
      <Section title="Dashboard Statistics" onAdd={() => setShowDashboardModal(true)}>
        <div className="grid md:grid-cols-4 gap-4">
          <StatBox label="Total Placed" value={dashboardStats.students_placed} />
          <StatBox label="Companies Visited" value={dashboardStats.companies_visited} />
          <StatBox label="Highest Package (LPA)" value={dashboardStats.highest_package} />
          <StatBox label="Placement %" value={dashboardStats.placement_percent} />
        </div>
      </Section>

      {/* Year-wise Stats */}
      <Section title="Year-wise Statistics" onAdd={() => { resetYearForm(); setShowYearModal(true); }}>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-gray-700">Year</th>
                <th className="p-3 text-left text-gray-700">Total Students</th>
                <th className="p-3 text-left text-gray-700">Placed</th>
                <th className="p-3 text-left text-gray-700">Placement %</th>
                <th className="p-3 text-left text-gray-700">Highest Package</th>
                <th className="p-3 text-left text-gray-700">Avg Package</th>
                <th className="p-3 text-center text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {yearStats.map((year) => (
                <tr key={year.year} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-black font-medium">{year.year}</td>
                  <td className="p-3 text-black">{year.total_students}</td>
                  <td className="p-3 text-black">{year.students_placed}</td>
                  <td className="p-3 text-black">
                    {((year.students_placed / year.total_students) * 100).toFixed(1)}%
                  </td>
                  <td className="p-3 text-black">₹{year.highest_package} LPA</td>
                  <td className="p-3 text-black">₹{year.avg_package} LPA</td>
                  <td className="p-3 flex justify-center gap-2">
                    <button
                      onClick={() => handleYearEdit(year)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleYearDelete(year.year)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Top Recruiters */}
      <Section title="Top Recruiters" onAdd={() => { resetRecruiterForm(); setShowRecruiterModal(true); }}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recruiters.map((recruiter) => (
            <div key={recruiter.name} className="p-4 bg-white rounded border border-gray-200 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-[#0b3a82]">{recruiter.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRecruiterEdit(recruiter)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleRecruiterDelete(recruiter.name)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">Offers: <span className="font-bold text-[#d4a853]">{recruiter.offers}</span></p>
                <p className="text-gray-600">Max Package: <span className="font-bold text-[#d4a853]">₹{recruiter.package} LPA</span></p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Dashboard Stats Modal */}
      {showDashboardModal && (
        <Modal title="Update Dashboard Statistics" onClose={() => setShowDashboardModal(false)}>
          <div className="space-y-4">
            <Input
              label="Total Students Placed"
              type="number"
              value={dashboardForm.students_placed}
              onChange={(val) => setDashboardForm({ ...dashboardForm, students_placed: Number(val) })}
            />
            <Input
              label="Companies Visited"
              type="number"
              value={dashboardForm.companies_visited}
              onChange={(val) => setDashboardForm({ ...dashboardForm, companies_visited: Number(val) })}
            />
            <Input
              label="Highest Package (LPA)"
              type="number"
              value={dashboardForm.highest_package}
              onChange={(val) => setDashboardForm({ ...dashboardForm, highest_package: Number(val) })}
            />
            <Input
              label="Placement Percentage"
              type="number"
              value={dashboardForm.placement_percent}
              onChange={(val) => setDashboardForm({ ...dashboardForm, placement_percent: Number(val) })}
            />
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleDashboardSubmit}
                className="flex-1 bg-[#0b3a82] text-white py-2 rounded hover:bg-[#0a2d6a]"
              >
                Update
              </button>
              <button
                onClick={() => setShowDashboardModal(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Year Stats Modal */}
      {showYearModal && (
        <Modal title={editingYear ? "Edit Year Statistics" : "Add Year Statistics"} onClose={resetYearForm}>
          <div className="space-y-4">
            <Input
              label="Year"
              type="number"
              value={yearForm.year}
              onChange={(val) => setYearForm({ ...yearForm, year: Number(val) })}
              disabled={!!editingYear}
            />
            <Input
              label="Total Students"
              type="number"
              value={yearForm.total_students}
              onChange={(val) => setYearForm({ ...yearForm, total_students: Number(val) })}
            />
            <Input
              label="Students Placed"
              type="number"
              value={yearForm.students_placed}
              onChange={(val) => setYearForm({ ...yearForm, students_placed: Number(val) })}
            />
            <Input
              label="Highest Package (LPA)"
              type="number"
              value={yearForm.highest_package}
              onChange={(val) => setYearForm({ ...yearForm, highest_package: Number(val) })}
            />
            <Input
              label="Average Package (LPA)"
              type="number"
              value={yearForm.avg_package}
              onChange={(val) => setYearForm({ ...yearForm, avg_package: Number(val) })}
            />
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleYearSubmit}
                className="flex-1 bg-[#0b3a82] text-white py-2 rounded hover:bg-[#0a2d6a]"
              >
                {editingYear ? "Update" : "Add"}
              </button>
              <button
                onClick={resetYearForm}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Recruiter Modal */}
      {showRecruiterModal && (
        <Modal title={editingRecruiter ? "Edit Recruiter" : "Add Recruiter"} onClose={resetRecruiterForm}>
          <div className="space-y-4">
            <Input
              label="Company Name"
              type="text"
              value={recruiterForm.name}
              onChange={(val) => setRecruiterForm({ ...recruiterForm, name: val })}
              disabled={!!editingRecruiter}
            />
            <Input
              label="Number of Offers"
              type="number"
              value={recruiterForm.offers}
              onChange={(val) => setRecruiterForm({ ...recruiterForm, offers: Number(val) })}
            />
            <Input
              label="Maximum Package (LPA)"
              type="number"
              value={recruiterForm.package}
              onChange={(val) => setRecruiterForm({ ...recruiterForm, package: Number(val) })}
            />
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleRecruiterSubmit}
                className="flex-1 bg-[#0b3a82] text-white py-2 rounded hover:bg-[#0a2d6a]"
              >
                {editingRecruiter ? "Update" : "Add"}
              </button>
              <button
                onClick={resetRecruiterForm}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Section({ title, children, onAdd }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-[#0b3a82] flex gap-2 items-center">
          <BarChart3 size={18} /> {title}
        </h2>
        <button
          onClick={onAdd}
          className="flex gap-2 items-center bg-[#0b3a82] text-white px-3 py-2 rounded hover:bg-[#0a2d6a]"
        >
          <Plus size={16} /> Add
        </button>
      </div>
      {children}
    </div>
  );
}

function StatBox({ label, value }: any) {
  return (
    <div className="p-4 bg-white rounded border border-gray-200">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-2xl font-bold text-[#0b3a82] mt-1">{value}</p>
    </div>
  );
}

function Input({ label, type = "text", value, onChange, disabled = false }: any) {
  return (
    <div>
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border rounded text-black bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#0b3a82] disabled:bg-gray-100"
      />
    </div>
  );
}

function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
