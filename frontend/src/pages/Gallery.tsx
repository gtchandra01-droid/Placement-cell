import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  imageData: string; // Base64 encoded image
  caption?: string;
  section?: string;
  category?: string;
  uploadedAt?: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterSection, setFilterSection] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");

  useEffect(() => {
    loadImages();

    const handleStorageChange = () => {
      loadImages();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadImages = () => {
    try {
      const saved = localStorage.getItem("gallery");
      if (saved) {
        setImages(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading gallery:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const sections = Array.from(new Set(images.map((img) => img.section).filter(Boolean)));
  const categories = Array.from(new Set(images.map((img) => img.category).filter(Boolean)));

  const filteredImages = images.filter((img) => {
    if (filterSection && img.section !== filterSection) return false;
    if (filterCategory && img.category !== filterCategory) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Gallery</h1>
          <p className="text-white/70 text-lg">Placement events and campus moments</p>
        </div>
      </section>

      <section className="py-16 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Filters */}
          {(sections.length > 0 || categories.length > 0) && (
            <div className="mb-8 flex flex-wrap gap-4">
              {sections.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section
                  </label>
                  <select
                    value={filterSection}
                    onChange={(e) => setFilterSection(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  >
                    <option value="">All Sections</option>
                    {sections.map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {categories.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0b1c33] text-black"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(filterSection || filterCategory) && (
                <button
                  onClick={() => {
                    setFilterSection("");
                    setFilterCategory("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium self-end"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Gallery Grid */}
          {filteredImages && filteredImages.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 mb-6">
                Showing {filteredImages.length} of {images.length} images
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(img)}
                  >
                    <div className="relative bg-gray-200 h-64 overflow-hidden">
                      <img
                        src={img.imageData}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-end p-4">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-semibold text-lg">{img.title}</h3>
                        {img.caption && (
                          <p className="text-sm text-gray-200 line-clamp-2">{img.caption}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                {images.length === 0
                  ? "No images available"
                  : "No images match your filters"}
              </p>
              <p className="text-slate-500 text-sm mt-2">
                {images.length === 0
                  ? "Check back later for placement gallery updates."
                  : "Try adjusting your filters."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 bg-white rounded-full p-2 hover:bg-gray-100 z-10 shadow-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            <div className="relative bg-gray-200 h-96 overflow-hidden">
              <img
                src={selectedImage.imageData}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <h2 className="text-3xl font-bold text-[#0b1c33] mb-3">
                {selectedImage.title}
              </h2>

              {selectedImage.caption && (
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  {selectedImage.caption}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mb-6">
                {selectedImage.section && (
                  <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {selectedImage.section}
                  </span>
                )}
                {selectedImage.category && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {selectedImage.category}
                  </span>
                )}
              </div>

              {selectedImage.uploadedAt && (
                <p className="text-xs text-gray-500 mb-6">
                  Uploaded: {new Date(selectedImage.uploadedAt).toLocaleDateString()}
                </p>
              )}

              <button
                onClick={() => setSelectedImage(null)}
                className="w-full px-6 py-3 bg-[#0b1c33] text-white rounded-lg hover:bg-[#1a2b47] transition-colors font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
