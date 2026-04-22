import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function Admins() {
  const [admins, setAdmins] = useState([
    {
      name: "Admin User",
      email: "admin@jntuk.edu.in",
      role: "Super Admin",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    role: "Admin",
    status: "Active",
  });

  // Add Admin
  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return;

    setAdmins([...admins, newAdmin]);

    setNewAdmin({
      name: "",
      email: "",
      role: "Admin",
      status: "Active",
    });

    setShowForm(false);
  };

  // Delete Admin
  const handleDelete = (index) => {
    const updated = admins.filter((_, i) => i !== index);
    setAdmins(updated);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admins</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#d4a853] px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Admin
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, name: e.target.value })
            }
            className="border p-2 rounded text-black bg-white placeholder-gray-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, email: e.target.value })
            }
            className="border p-2 rounded text-black bg-white placeholder-gray-500"
          />

          <select
            value={newAdmin.role}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, role: e.target.value })
            }
            className="border p-2 rounded text-black bg-white"
          >
            <option>Super Admin</option>
            <option>Admin</option>
            <option>Editor</option>
          </select>

          <select
            value={newAdmin.status}
            onChange={(e) =>
              setNewAdmin({ ...newAdmin, status: e.target.value })
            }
            className="border p-2 rounded text-black bg-white"
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            onClick={handleAddAdmin}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{admin.name}</td>
                <td className="p-3">{admin.email}</td>
                <td className="p-3">{admin.role}</td>

                <td
                  className={`p-3 ${
                    admin.status === "Active"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {admin.status}
                </td>

                <td className="p-3 flex gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {admins.length === 0 && (
          <p className="text-center p-4 text-gray-500">
            No admins available
          </p>
        )}
      </div>
    </div>
  );
}