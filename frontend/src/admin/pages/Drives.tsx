import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Calendar } from "lucide-react";
import axios from "axios";

type Drive = {
  id: number;
  company_name: string;
  drive_date: string;
  package_lpa: number;
  role: string;
  location: string;
  eligibility?: string;
  description?: string;
  start_time?: string;
  registration_link: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Drives() {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDrive, setEditingDrive] = useState<Drive | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    drive_date: "",
    package_lpa: "",
    role: "",
    location: "",
    eligibility: "",
    description: "",
    start_time: "",
    registration_link: "",
  });

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      console.log("Drives.tsx logging token:", token);
      try {
        const response = await axios.get(`${API_URL}/admin/drives`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data.data || [];
        setDrives(data);
        localStorage.setItem("drives", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      } catch (apiErr) {
        console.log("API failed, using localStorage");
        const saved = localStorage.getItem("drives");
        if (saved) setDrives(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name || !formData.drive_date || !formData.package_lpa || !formData.role) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const data = {
        company_name: formData.company_name,
        drive_date: formData.drive_date,
        package_lpa: parseFloat(formData.package_lpa),
        role: formData.role,
        location: formData.location,
        eligibility: formData.eligibility,
        description: formData.description,
        start_time: formData.start_time,
        registration_link: formData.registration_link,
      };

      if (editingDrive) {
        console.log("Updating drive:", editingDrive.id);

        try {
          await axios.put(`${API_URL}/admin/drives/${editingDrive.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("API update success");
        } catch (err) {
          console.error("API update failed:", err);
        }

        const updated = drives.map((d) =>
          Number(d.id) === Number(editingDrive.id)
            ? { ...d, ...data }
            : d
        );

        console.log("Updated drives:", updated);

        setDrives([...updated]);
        localStorage.setItem("drives", JSON.stringify(updated));

        alert("Drive updated!");
      } else {
        try {
          console.log("Creating drive with data:", data);
          const response = await axios.post(`${API_URL}/admin/drives`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newDrive = response.data;
          const updated = [...drives, newDrive];
          setDrives(updated);
          localStorage.setItem("drives", JSON.stringify(updated));
        } catch (apiErr) {
          console.log("API create failed in POST, using localStorage");
          const newDrive = { id: Date.now(), ...data };
          const updated = [...drives, newDrive];
          setDrives(updated);
          localStorage.setItem("drives", JSON.stringify(updated));
        }
        alert("Drive created!");
      }

      window.dispatchEvent(new Event("storage"));
      resetForm();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to save drive");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this drive?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");

      try {
        await axios.delete(`${API_URL}/admin/drives/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (apiErr) {
        console.log("API delete failed, using localStorage");
      }

      const updated = drives.filter((d) => d.id !== id);
      setDrives(updated);
      localStorage.setItem("drives", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      alert("Drive deleted!");
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to delete drive");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (drive: Drive) => {
    setEditingDrive(drive);
    setFormData({
      company_name: drive.company_name,
      drive_date: drive.drive_date,
      package_lpa: drive.package_lpa.toString(),
      role: drive.role,
      location: drive.location,
      eligibility: drive.eligibility || "",
      description: drive.description || "",
      start_time: drive.start_time || "",
      registration_link: drive.registration_link || "",
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      company_name: "",
      drive_date: "",
      package_lpa: "",
      role: "",
      location: "",
      eligibility: "",
      description: "",
      start_time: "",
      registration_link: "",
    });
    setEditingDrive(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Placement Drives</h1>
            <p className="text-slate-600 mt-1">Manage recruitment drives - Changes appear instantly on frontend</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
          >
            <Plus size={18} /> Add Drive
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Company</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Role</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Package (LPA)</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Registration Link</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {drives.length > 0 ? (
                drives.map((drive) => (
                  <tr key={drive.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{drive.company_name}</td>
                    <td className="px-6 py-4 text-gray-600">{drive.drive_date}</td>
                    <td className="px-6 py-4 text-gray-600">{drive.role}</td>
                    <td className="px-6 py-4 text-[#d4a853] font-semibold">₹{drive.package_lpa}</td>
                    <td className="px-6 py-4 text-gray-600">{drive.location}</td>
                    <td className="px-6 py-4">
                      {drive.registration_link ? (
                        <a
                          href={drive.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 truncate max-w-xs inline-block"
                          title={drive.registration_link}
                        >
                          View Form →
                        </a>
                      ) : (
                        <span className="text-gray-400">No link</span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(drive)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(drive.id)}
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
                    No drives yet. Click "Add Drive" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0b1c33]">
                {editingDrive ? "Edit Drive" : "Add Drive"}
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
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="e.g., TCS"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Drive Date *
                  </label>
                  <input
                    type="date"
                    value={formData.drive_date}
                    onChange={(e) => setFormData({ ...formData, drive_date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Software Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Package (LPA) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.package_lpa}
                    onChange={(e) => setFormData({ ...formData, package_lpa: e.target.value })}
                    placeholder="e.g., 12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Hyderabad"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Google Form / Registration Link *
                </label>
                <input
                  type="url"
                  value={formData.registration_link}
                  onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                  placeholder="https://forms.gle/xxxxx or https://your-form-link.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Paste your Google Form link or any registration form URL</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Eligibility
                </label>
                <textarea
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  placeholder="e.g., CGPA >= 7.0, No backlogs..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Drive description, job details, etc..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Changes will appear instantly on the frontend Drives page!
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 font-semibold transition"
                >
                  {loading ? "Saving..." : editingDrive ? "Update" : "Create"}
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
