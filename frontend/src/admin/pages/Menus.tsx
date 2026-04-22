import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";

type Menu = {
  id: number;
  label: string;
  href: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Menus() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    label: "",
    href: "",
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${API_URL}/admin/menus`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data || [];
        setMenus(data);
        localStorage.setItem("menus", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      } catch (apiErr) {
        console.log("API failed, using localStorage");
        const saved = localStorage.getItem("menus");
        if (saved) setMenus(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.label || !formData.href) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = {
        label: formData.label,
        href: formData.href,
      };

      if (editingMenu) {
        try {
          await axios.put(`${API_URL}/admin/menus/${editingMenu.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (apiErr) {
          console.log("API update failed, using localStorage");
        }

        const updated = menus.map((m) =>
          m.id === editingMenu.id ? { ...m, ...data } : m
        );
        setMenus(updated);
        localStorage.setItem("menus", JSON.stringify(updated));
        alert("Menu updated!");
      } else {
        try {
          const response = await axios.post(`${API_URL}/admin/menus`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newMenu = response.data;
          const updated = [...menus, newMenu];
          setMenus(updated);
          localStorage.setItem("menus", JSON.stringify(updated));
        } catch (apiErr) {
          console.log("API create failed, using localStorage");
          const newMenu = { id: Date.now(), ...data };
          const updated = [...menus, newMenu];
          setMenus(updated);
          localStorage.setItem("menus", JSON.stringify(updated));
        }
        alert("Menu created!");
      }

      window.dispatchEvent(new Event("storage"));
      resetForm();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to save menu");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this menu?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${API_URL}/admin/menus/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (apiErr) {
        console.log("API delete failed, using localStorage");
      }

      const updated = menus.filter((m) => m.id !== id);
      setMenus(updated);
      localStorage.setItem("menus", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      alert("Menu deleted!");
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to delete menu");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setFormData({
      label: menu.label,
      href: menu.href,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      label: "",
      href: "",
    });
    setEditingMenu(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Navigation Menus</h1>
            <p className="text-slate-600 mt-1">Manage navbar menus - Changes appear instantly on frontend</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
          >
            <Plus size={18} /> Add Menu
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Menu Label</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">URL/Path</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.length > 0 ? (
                menus.map((menu) => (
                  <tr key={menu.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{menu.label}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-sm">{menu.href}</td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(menu)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(menu.id)}
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
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No menus yet. Click "Add Menu" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">📝 How to Add Menus:</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>✅ <strong>Menu Label:</strong> The text that appears in navbar (e.g., "Home", "About", "Drives")</li>
            <li>✅ <strong>URL/Path:</strong> The route path (e.g., "/", "/about", "/drives", "/companies")</li>
            <li>✅ <strong>Custom Pages:</strong> Link to custom pages created in Pages section (e.g., "/pages/about-us")</li>
            <li>✅ <strong>External Links:</strong> Use full URLs for external sites (e.g., "https://example.com")</li>
            <li>✅ <strong>Real-Time Updates:</strong> Changes appear instantly in navbar!</li>
          </ul>
        </div>

        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">🔗 Common Routes:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-800">
            <div>
              <p className="font-semibold mb-2">Built-in Pages:</p>
              <ul className="space-y-1 font-mono text-xs">
                <li>/ - Home</li>
                <li>/about - About</li>
                <li>/drives - Placement Drives</li>
                <li>/companies - Companies</li>
                <li>/gallery - Gallery</li>
                <li>/statistics - Statistics</li>
                <li>/help - Help & Support</li>
                <li>/contact - Contact</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Custom Pages:</p>
              <ul className="space-y-1 font-mono text-xs">
                <li>/pages/about-us</li>
                <li>/pages/privacy-policy</li>
                <li>/pages/terms</li>
                <li>/pages/faq</li>
                <li>Or any slug you create</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0b1c33]">
                {editingMenu ? "Edit Menu" : "Add Menu"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Menu Label *
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., About Us"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL / Path *
                </label>
                <input
                  type="text"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  placeholder="e.g., /about or /pages/about-us"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
                <p className="text-xs text-gray-500 mt-1">Use / for home, /about for about page, /pages/slug for custom pages</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Changes will appear instantly in the navbar!
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 font-semibold transition"
                >
                  {loading ? "Saving..." : editingMenu ? "Update" : "Create"}
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
