import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";

type Page = {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_description?: string;
  is_published: boolean;
  created_at?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Pages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    meta_description: "",
    is_published: true,
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/admin/pages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPages(response.data || []);
      localStorage.setItem("pages", JSON.stringify(response.data || []));
    } catch (err) {
      console.log("Using localStorage");
      const saved = localStorage.getItem("pages");
      if (saved) setPages(JSON.parse(saved));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (editingPage) {
        await axios.put(`${API_URL}/admin/pages/${editingPage.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Page updated!");
      } else {
        await axios.post(`${API_URL}/admin/pages`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Page created!");
      }

      await fetchPages();
      resetForm();
    } catch (err: any) {
      console.log("Saving to localStorage");
      if (editingPage) {
        const updated = pages.map((p) =>
          p.id === editingPage.id ? { ...p, ...formData } : p
        );
        setPages(updated);
        localStorage.setItem("pages", JSON.stringify(updated));
      } else {
        const newPage = { id: Date.now(), ...formData };
        const updated = [...pages, newPage];
        setPages(updated);
        localStorage.setItem("pages", JSON.stringify(updated));
      }
      alert(editingPage ? "Page updated!" : "Page created!");
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this page?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/admin/pages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Page deleted!");
    } catch (err) {
      console.log("Deleting from localStorage");
    }
    const updated = pages.filter((p) => p.id !== id);
    setPages(updated);
    localStorage.setItem("pages", JSON.stringify(updated));
    setLoading(false);
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      meta_description: page.meta_description || "",
      is_published: page.is_published,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      content: "",
      meta_description: "",
      is_published: true,
    });
    setEditingPage(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Pages</h1>
            <p className="text-slate-600 mt-1">Manage website pages</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
          >
            <Plus size={18} /> Add Page
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Slug</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.length > 0 ? (
                pages.map((page) => (
                  <tr key={page.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800">{page.title}</td>
                    <td className="px-6 py-4 text-gray-600">{page.slug}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          page.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {page.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(page)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(page.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No pages yet. Click "Add Page" to create one.
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
                {editingPage ? "Edit Page" : "Add Page"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Page Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., About Us"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., about-us"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Description
                </label>
                <input
                  type="text"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="SEO description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Page content..."
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Publish this page
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 font-semibold"
                >
                  {loading ? "Saving..." : editingPage ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 font-semibold"
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
