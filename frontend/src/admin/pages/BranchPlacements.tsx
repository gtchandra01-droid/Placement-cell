import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import api from "../../api/axios";

interface BranchPlacement {
  id: number;
  branch_name: string;
  total_students: number;
  students_placed: number;
  highest_package: number;
  avg_package: number;
  placement_percent: number;
}

export default function BranchPlacements() {
  const [branches, setBranches] = useState<BranchPlacement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    branch_name: "",
    total_students: 0,
    students_placed: 0,
    highest_package: 0,
    avg_package: 0,
    placement_percent: 0,
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await api.get("branch-placements");
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching branches:", error);
      alert("Failed to fetch branch placements");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.branch_name) {
      alert("Please enter branch name");
      return;
    }

    try {
      if (editingId) {
        await api.put(`admin/branch-placements/${editingId}`, formData);
        alert("Branch updated successfully!");
      } else {
        await api.post("admin/branch-placements", formData);
        alert("Branch added successfully!");
      }
      fetchBranches();
      resetForm();
    } catch (error: any) {
      console.error("Error saving branch:", error);
      alert(error.response?.data?.message || "Failed to save branch");
    }
  };

  const handleEdit = (branch: BranchPlacement) => {
    setFormData(branch);
    setEditingId(branch.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;

    try {
      await api.delete(`admin/branch-placements/${id}`);
      fetchBranches();
      alert("Branch deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting branch:", error);
      alert(error.response?.data?.message || "Failed to delete branch");
    }
  };

  const resetForm = () => {
    setFormData({
      branch_name: "",
      total_students: 0,
      students_placed: 0,
      highest_package: 0,
      avg_package: 0,
      placement_percent: 0,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b3a82] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading branches...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-black">Branch-wise Placements</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#d4a853] text-black hover:opacity-90"
        >
          <Plus className="w-4 h-4" />
          Add Branch
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-6 rounded shadow space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Branch Name</label>
              <input
                type="text"
                value={formData.branch_name}
                onChange={(e) => setFormData({ ...formData, branch_name: e.target.value })}
                className="w-full border p-2 rounded text-black bg-white"
                placeholder="e.g., Computer Science & Engineering"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Total Students</label>
              <input
                type="number"
                value={formData.total_students}
                onChange={(e) => setFormData({ ...formData, total_students: parseInt(e.target.value) })}
                className="w-full border p-2 rounded text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Students Placed</label>
              <input
                type="number"
                value={formData.students_placed}
                onChange={(e) => setFormData({ ...formData, students_placed: parseInt(e.target.value) })}
                className="w-full border p-2 rounded text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Highest Package (LPA)</label>
              <input
                type="number"
                step="0.1"
                value={formData.highest_package}
                onChange={(e) => setFormData({ ...formData, highest_package: parseFloat(e.target.value) })}
                className="w-full border p-2 rounded text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Average Package (LPA)</label>
              <input
                type="number"
                step="0.1"
                value={formData.avg_package}
                onChange={(e) => setFormData({ ...formData, avg_package: parseFloat(e.target.value) })}
                className="w-full border p-2 rounded text-black bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Placement Percentage (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.placement_percent}
                onChange={(e) => setFormData({ ...formData, placement_percent: parseFloat(e.target.value) })}
                className="w-full border p-2 rounded text-black bg-white"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            >
              {editingId ? "Update" : "Add"} Branch
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 font-semibold text-black">Branch Name</th>
              <th className="text-center py-3 px-4 font-semibold text-black">Total Students</th>
              <th className="text-center py-3 px-4 font-semibold text-black">Placed</th>
              <th className="text-center py-3 px-4 font-semibold text-black">Placement %</th>
              <th className="text-center py-3 px-4 font-semibold text-black">Highest LPA</th>
              <th className="text-center py-3 px-4 font-semibold text-black">Avg LPA</th>
              <th className="text-center py-3 px-4 font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-black font-medium">{branch.branch_name}</td>
                <td className="text-center py-3 px-4 text-gray-600">{branch.total_students}</td>
                <td className="text-center py-3 px-4 text-gray-600">{branch.students_placed}</td>
                <td className="text-center py-3 px-4 text-[#d4a853] font-semibold">{branch.placement_percent.toFixed(2)}%</td>
                <td className="text-center py-3 px-4 text-gray-600">₹{branch.highest_package}</td>
                <td className="text-center py-3 px-4 text-gray-600">₹{branch.avg_package}</td>
                <td className="text-center py-3 px-4 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(branch)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(branch.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {branches.length === 0 && (
        <div className="text-center py-12 bg-white rounded">
          <p className="text-gray-500">No branches added yet</p>
        </div>
      )}
    </div>
  );
}
