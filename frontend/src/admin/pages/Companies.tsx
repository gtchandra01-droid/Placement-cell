import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Building2, ExternalLink, X } from "lucide-react";
import axios from "axios";

type Company = {
  id: number;
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    sector: "",
    location: "",
    logo_url: "",
    registration_link: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  /* ================= FETCH FROM DATABASE ================= */

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("admin_token");

      const response = await axios.get(`${API_URL}/admin/companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data || response.data || [];

      setCompanies(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Error fetching companies:", err);
      setError(err.response?.data?.message || "Failed to fetch companies");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE / UPDATE ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.sector || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("admin_token");

      if (editingCompany) {
        // UPDATE
        await axios.put(
          `${API_URL}/admin/companies/${editingCompany.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Company updated successfully!");
      } else {
        // CREATE
        await axios.post(`${API_URL}/admin/companies`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        alert("Company added successfully!");
      }

      resetForm();
      fetchCompanies(); // 🔥 Always refresh from DB
    } catch (err: any) {
      console.error("Error saving company:", err);
      const errorMsg = err.response?.data?.message || "Failed to save company";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("admin_token");

      await axios.delete(`${API_URL}/admin/companies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Company deleted successfully!");
      fetchCompanies(); // 🔥 Always fetch fresh data
    } catch (err: any) {
      console.error("Error deleting company:", err);
      const errorMsg = err.response?.data?.message || "Failed to delete company";
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      sector: company.sector,
      location: company.location,
      logo_url: company.logo_url || "",
      registration_link: company.registration_link || "",
    });
    setShowModal(true);
  };

  /* ================= RESET ================= */

  const resetForm = () => {
    setFormData({
      name: "",
      sector: "",
      location: "",
      logo_url: "",
      registration_link: "",
    });
    setEditingCompany(null);
    setShowModal(false);
  };

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Recruiting Companies</h1>
            <p className="text-slate-600 mt-1">Manage companies - Data stored in database</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
          >
            <Plus size={18} /> Add Company
          </button>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {loading && !companies.length ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
            <p className="text-slate-600">Loading companies...</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">S.No</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Logo</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Company Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Sector</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Location</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Registration</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.length > 0 ? (
                  companies.map((company, index) => (
                    <tr key={company.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4">
                        <img
                          src={
                            company.logo_url ||
                            `https://via.placeholder.com/40?text=${company.name[0]}`
                          }
                          className="w-10 h-10 rounded object-cover"
                          alt={company.name}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">{company.name}</td>
                      <td className="px-6 py-4 text-gray-600">{company.sector}</td>
                      <td className="px-6 py-4 text-gray-600">{company.location}</td>
                      <td className="px-6 py-4">
                        {company.registration_link ? (
                          <a
                            href={company.registration_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <ExternalLink size={14} /> Link
                          </a>
                        ) : (
                          <span className="text-gray-400">No link</span>
                        )}
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(company)}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(company.id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No companies yet. Click "Add Company" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal remains EXACT SAME */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0b1c33]">
                {editingCompany ? "Edit Company" : "Add New Company"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Google"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sector *
                  </label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    placeholder="e.g., IT Services"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Bangalore"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    value={formData.registration_link}
                    onChange={(e) =>
                      setFormData({ ...formData, registration_link: e.target.value })
                    }
                    placeholder="https://example.com/register"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 font-semibold transition"
                >
                  {loading ? "Saving..." : editingCompany ? "Update" : "Create"}
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
    </div>
  );
}