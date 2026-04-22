import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "alert" | "success" | "info";
  date: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNotif, setEditingNotif] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as "alert" | "success" | "info",
  });

  useEffect(() => {
    fetchNotifications();

    const handleStorageChange = () => {
      fetchNotifications();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${API_URL}/admin/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data || [];
        setNotifications(data);
        localStorage.setItem("notifications", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      } catch (apiErr) {
        console.log("API failed, using localStorage");
        const saved = localStorage.getItem("notifications");
        if (saved) setNotifications(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const data = {
        title: formData.title,
        message: formData.message,
        type: formData.type,
        date: new Date().toISOString().split("T")[0],
      };

      if (editingNotif) {
        try {
          await axios.put(`${API_URL}/admin/notifications/${editingNotif.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (apiErr) {
          console.log("API update failed, using localStorage");
        }

        const updated = notifications.map((n) =>
          n.id === editingNotif.id ? { ...n, ...data } : n
        );
        setNotifications(updated);
        localStorage.setItem("notifications", JSON.stringify(updated));
        alert("Notification updated!");
      } else {
        try {
          const response = await axios.post(`${API_URL}/admin/notifications`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newNotif = response.data;
          const updated = [...notifications, newNotif];
          setNotifications(updated);
          localStorage.setItem("notifications", JSON.stringify(updated));
        } catch (apiErr) {
          console.log("API create failed, using localStorage");
          const newNotif = { id: Date.now(), ...data };
          const updated = [...notifications, newNotif];
          setNotifications(updated);
          localStorage.setItem("notifications", JSON.stringify(updated));
        }
        alert("Notification created!");
      }

      window.dispatchEvent(new Event("storage"));
      resetForm();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to save notification");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this notification?")) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${API_URL}/admin/notifications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (apiErr) {
        console.log("API delete failed, using localStorage");
      }

      const updated = notifications.filter((n) => n.id !== id);
      setNotifications(updated);
      localStorage.setItem("notifications", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      alert("Notification deleted!");
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to delete notification");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (notif: Notification) => {
    setEditingNotif(notif);
    setFormData({
      title: notif.title,
      message: notif.message,
      type: notif.type,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      type: "info",
    });
    setEditingNotif(null);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Notifications</h1>
            <p className="text-slate-600 mt-1">Manage placement notifications - Updates appear instantly on notification ticker</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
          >
            <Plus size={18} /> Add Notification
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Message</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Type</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.length > 0 ? (
                notifications
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((notif) => (
                    <tr key={notif.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">{notif.title}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{notif.message}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            notif.type === "alert"
                              ? "bg-red-100 text-red-700"
                              : notif.type === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {notif.type.charAt(0).toUpperCase() + notif.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{new Date(notif.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(notif)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(notif.id)}
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
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No notifications yet. Click "Add Notification" to create one.
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
                {editingNotif ? "Edit Notification" : "Add Notification"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Infosys Placement Drive"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter notification message..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "alert" | "success" | "info" })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                >
                  <option value="info">Info</option>
                  <option value="success">Success</option>
                  <option value="alert">Alert</option>
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Changes will appear instantly on the notification ticker!
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 font-semibold transition"
                >
                  {loading ? "Saving..." : editingNotif ? "Update" : "Create"}
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
