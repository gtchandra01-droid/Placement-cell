import { useEffect, useState } from "react";
import { Calendar, MapPin, Briefcase, ExternalLink } from "lucide-react";
import axios from "axios";

interface Drive {
  id: number;
  company_name: string;
  drive_date: string;
  package_lpa: number;
  role: string;
  location: string;
  eligibility?: string;
  description?: string;
  start_time?: string;
  registration_link?: string;
}

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Drives() {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);

  /* ================= FETCH FROM DATABASE ================= */

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/admin/drives`);

      const data = response.data?.data || response.data || [];

      setDrives(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error loading drives:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DATE FORMAT ================= */

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* ================= LOADING UI ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading drives...</p>
        </div>
      </div>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Placement Drives
          </h1>
          <p className="text-white/70 text-lg">
            Upcoming recruitment drives from top companies
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#faf8f3]">
        <div className="max-w-7xl mx-auto px-6">
          {drives.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {drives.map((drive) => (
                <div
                  key={drive.id}
                  onClick={() => setSelectedDrive(drive)}
                  className="bg-white rounded-2xl border-2 border-slate-100 p-6 shadow-md hover:shadow-xl hover:border-[#d4a853] transition-all duration-300 cursor-pointer"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#0b1c33] mb-2">
                      {drive.company_name}
                    </h3>
                    <p className="text-[#d4a853] font-semibold text-lg">
                      ₹{drive.package_lpa} LPA
                    </p>
                  </div>

                  <div className="space-y-3 mb-6 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#d4a853]" />
                      <span>{drive.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#d4a853]" />
                      <span>{formatDate(drive.drive_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#d4a853]" />
                      <span>{drive.location}</span>
                    </div>
                  </div>

                  {drive.registration_link && (
                    <a
                      href={drive.registration_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-[#0b1c33] text-white rounded-lg hover:bg-[#1a2b47] transition-colors font-semibold"
                    >
                      Register Now
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDrive(drive);
                    }}
                    className="w-full mt-3 px-4 py-2 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                No placement drives available yet
              </p>
              <p className="text-slate-500 text-sm mt-2">
                Check back soon for upcoming drives!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedDrive && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedDrive(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-[#0b1c33] mb-2">
                {selectedDrive.company_name}
              </h2>
              <p className="text-[#d4a853] font-semibold text-xl">
                ₹{selectedDrive.package_lpa} LPA
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm text-slate-600 font-semibold mb-1">
                  Position
                </p>
                <p className="text-lg text-[#0b1c33] font-semibold">
                  {selectedDrive.role}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 font-semibold mb-1">
                    Drive Date
                  </p>
                  <p className="text-lg text-[#0b1c33] font-semibold">
                    {formatDate(selectedDrive.drive_date)}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 font-semibold mb-1">
                    Location
                  </p>
                  <p className="text-lg text-[#0b1c33] font-semibold">
                    {selectedDrive.location}
                  </p>
                </div>
              </div>

              {selectedDrive.start_time && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-sm text-slate-600 font-semibold mb-1">
                    Start Time
                  </p>
                  <p className="text-lg text-[#0b1c33] font-semibold">
                    {selectedDrive.start_time}
                  </p>
                </div>
              )}

              {selectedDrive.eligibility && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-blue-900 font-semibold mb-2">
                    Eligibility Criteria
                  </p>
                  <p className="text-blue-800 whitespace-pre-wrap">
                    {selectedDrive.eligibility}
                  </p>
                </div>
              )}

              {selectedDrive.description && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-green-900 font-semibold mb-2">
                    About the Drive
                  </p>
                  <p className="text-green-800 whitespace-pre-wrap">
                    {selectedDrive.description}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {selectedDrive.registration_link && (
                <a
                  href={selectedDrive.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0b1c33] text-white rounded-lg hover:bg-[#1a2b47] transition-colors font-semibold text-lg"
                >
                  Register Now
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}

              <button
                onClick={() => setSelectedDrive(null)}
                className="w-full px-6 py-3 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
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