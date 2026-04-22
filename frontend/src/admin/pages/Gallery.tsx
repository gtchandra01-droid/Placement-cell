import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import axios from "axios";

type GalleryImage = {
  id: number;
  title: string;
  imageData: string; // Base64 encoded image
  caption?: string;
  section?: string;
  category?: string;
  uploadedAt?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    caption: "",
    section: "",
    category: "",
  });

  useEffect(() => {
    fetchImages();

    const handleStorageChange = () => {
      fetchImages();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${API_URL}/admin/gallery`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data || [];
        setImages(data);
        localStorage.setItem("gallery", JSON.stringify(data));
        window.dispatchEvent(new Event("storage"));
      } catch (apiErr) {
        console.log("API failed, using localStorage");
        const saved = localStorage.getItem("gallery");
        if (saved) setImages(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 5MB");
      return;
    }

    setImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Please enter image title");
      return;
    }

    if (!editingImage && !imageFile) {
      alert("Please select an image file");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      let imageData = editingImage?.imageData || "";

      // Convert new file to base64 if provided
      if (imageFile) {
        imageData = await convertFileToBase64(imageFile);
      }

      const data = {
        title: formData.title,
        imageData,
        caption: formData.caption,
        section: formData.section,
        category: formData.category,
        uploadedAt: new Date().toISOString(),
      };

      if (editingImage) {
        try {
          await axios.put(`${API_URL}/admin/gallery/${editingImage.id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (apiErr) {
          console.log("API update failed, using localStorage");
        }

        const updated = images.map((img) =>
          img.id === editingImage.id ? { ...img, ...data } : img
        );
        setImages(updated);
        localStorage.setItem("gallery", JSON.stringify(updated));
        alert("Image updated!");
      } else {
        try {
          const response = await axios.post(`${API_URL}/admin/gallery`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const newImage = response.data;
          const updated = [...images, newImage];
          setImages(updated);
          localStorage.setItem("gallery", JSON.stringify(updated));
        } catch (apiErr) {
          console.log("API create failed, using localStorage");
          const newImage = { id: Date.now(), ...data };
          const updated = [...images, newImage];
          setImages(updated);
          localStorage.setItem("gallery", JSON.stringify(updated));
        }
        alert("Image uploaded successfully!");
      }

      window.dispatchEvent(new Event("storage"));
      resetForm();
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to save image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${API_URL}/admin/gallery/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (apiErr) {
        console.log("API delete failed, using localStorage");
      }

      const updated = images.filter((img) => img.id !== id);
      setImages(updated);
      localStorage.setItem("gallery", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
      alert("Image deleted!");
    } catch (err: any) {
      console.error("Error:", err);
      alert("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      caption: image.caption || "",
      section: image.section || "",
      category: image.category || "",
    });
    setPreviewImage(image.imageData);
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      caption: "",
      section: "",
      category: "",
    });
    setEditingImage(null);
    setImageFile(null);
    setPreviewImage("");
    setShowModal(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1c33]">Gallery</h1>
            <p className="text-slate-600 mt-1">Upload and manage gallery images locally</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex gap-2 items-center bg-[#0b1c33] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b47] transition font-medium"
          >
            <Plus size={18} /> Upload Image
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.length > 0 ? (
            images.map((image) => (
              <div key={image.id} className="group relative">
                <div className="relative bg-gray-200 rounded-lg overflow-hidden h-48">
                  <img
                    src={image.imageData}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-gray-800 truncate">{image.title}</p>
                {image.section && (
                  <p className="text-xs text-gray-500">{image.section}</p>
                )}

                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(image)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No images yet. Click "Upload Image" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0b1c33]">
                {editingImage ? "Edit Image" : "Upload Image"}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {editingImage ? "Change Image (Optional)" : "Select Image *"}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="image-input"
                    disabled={editingImage ? false : false}
                  />
                  <label
                    htmlFor="image-input"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0b1c33] hover:bg-blue-50 transition"
                  >
                    <Upload size={20} className="text-gray-600" />
                    <span className="text-gray-600">
                      {imageFile ? imageFile.name : "Click to upload or drag and drop"}
                    </span>
                  </label>
                </div>
                {imageFile && (
                  <p className="text-xs text-gray-500 mt-1">
                    File size: {formatFileSize(imageFile.size)}
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {previewImage && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-40 object-contain rounded-lg border border-gray-200"
                    />
                    <p className="text-xs text-gray-500 text-center mt-2">Preview</p>
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Campus Event 2024"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  placeholder="Image description..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                />
              </div>

              {/* Section and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    placeholder="e.g., Events, Campus"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Placement, Workshop"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>Note:</strong> Images are stored locally on your system. Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading || (!editingImage && !imageFile)}
                  className="flex-1 bg-[#0b1c33] text-white py-2 rounded-lg hover:bg-[#1a2b47] disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                >
                  {loading ? "Saving..." : editingImage ? "Update Image" : "Upload Image"}
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
