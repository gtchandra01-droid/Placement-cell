import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Building2, ExternalLink } from "lucide-react";
import api from "../../api/axios";

type Company = {
  id: number;
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
};

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

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

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      alert("Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sector || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      if (editingCompany) {
        // Update existing company
        await api.put(`/admin/companies/${editingCompany.id}`, formData);
        alert("Company updated successfully!");
      } else {
        // Add new company
        await api.post("/admin/companies", formData);
        alert("Company added successfully!");
      }
      fetchCompanies();
      resetForm();
    } catch (error: any) {
      console.error("Error saving company:", error);
      alert(error.response?.data?.message || "Failed to save company");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;
    
    try {
      await api.delete(`/admin/companies/${id}`);
      alert("Company deleted successfully!");
      fetchCompanies();
    } catch (error: any) {
      console.error("Error deleting company:", error);
      alert(error.response?.data?.message || "Failed to delete company");
    }
  };

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

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b3a82] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading companies...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#0b3a82]">
        Recruiting Companies
      </h1>

      {/* TABLE */}
      <Section title="Company List" onAdd={() => setShowModal(true)}>
        <Table
          headers={[
            "S.No",
            "Logo",
            "Company",
            "Sector",
            "Location",
            "Registration",
            "Actions",
          ]}
        >
          {companies.map((c, i) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <Td>{i + 1}</Td>

              <Td>
                <img
                  src={
                    c.logo_url ||
                    `https://via.placeholder.com/40?text=${c.name[0]}`
                  }
                  className="w-10 h-10 rounded"
                  alt={c.name}
                />
              </Td>

              <Td className="font-medium text-black">{c.name}</Td>
              <Td className="text-black">{c.sector}</Td>
              <Td className="text-black">{c.location}</Td>

              <Td>
                {c.registration_link ? (
                  <a
                    href={c.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <ExternalLink size={14} /> Link
                  </a>
                ) : (
                  <span className="text-gray-400">No link</span>
                )}
              </Td>

              <Actions
                onEdit={() => handleEdit(c)}
                onDelete={() => handleDelete(c.id)}
              />
            </tr>
          ))}
        </Table>
      </Section>

      {/* MODAL */}
      {showModal && (
        <Modal
          title={editingCompany ? "Edit Company" : "Add Company"}
          onClose={resetForm}
        >
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <Input
              label="Company Name *"
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              placeholder="Enter company name"
            />

            {/* Sector */}
            <Input
              label="Sector *"
              value={formData.sector}
              onChange={(val) => setFormData({ ...formData, sector: val })}
              placeholder="e.g., IT Services, Consulting"
            />

            {/* Location */}
            <Input
              label="Location *"
              value={formData.location}
              onChange={(val) => setFormData({ ...formData, location: val })}
              placeholder="e.g., Hyderabad, Bangalore"
            />

            {/* Logo */}
            <Input
              label="Logo URL"
              value={formData.logo_url}
              onChange={(val) => setFormData({ ...formData, logo_url: val })}
              placeholder="https://example.com/logo.png"
            />

            {/* Registration */}
            <Input
              label="Registration Link"
              value={formData.registration_link}
              onChange={(val) =>
                setFormData({ ...formData, registration_link: val })
              }
              placeholder="https://example.com/register"
            />

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-[#0b3a82] text-white py-2 rounded hover:bg-[#0a2d6a]"
              >
                {editingCompany ? "Update" : "Create"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* SMALL COMPONENTS */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded text-black bg-white placeholder-gray-500 focus:ring-2 focus:ring-[#0b3a82]"
      />
    </div>
  );
}

function Section({
  title,
  children,
  onAdd,
}: any) {
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#0b3a82] flex gap-2 items-center">
          <Building2 size={18} /> {title}
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

function Table({ headers, children }: any) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h: string) => (
            <th key={h} className="p-3 text-left text-gray-700 font-medium">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function Td({ children, className = "" }: any) {
  return <td className={`p-3 border-t ${className}`}>{children}</td>;
}

function Actions({ onEdit, onDelete }: any) {
  return (
    <Td>
      <div className="flex gap-3">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
          <Pencil size={16} />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          <Trash2 size={16} />
        </button>
      </div>
    </Td>
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
