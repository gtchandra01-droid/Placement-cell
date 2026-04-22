import { MapPin, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { encodeHTML } from "../lib/security";
import api from "../api/axios";

interface Company {
  id: number;
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
}

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const response = await api.get("/companies");
      setCompanies(response.data || []);
    } catch (error) {
      console.error("Error loading companies:", error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Recruiting Companies</h1>
          <p className="text-white/70 text-lg">Top organizations that recruit from JNTUK</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {companies && companies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((c) => (
                <div key={c.id} className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-xl border-2 border-slate-100 bg-slate-50 p-2 shadow-sm">
                      <img 
                        src={c.logo_url || `https://via.placeholder.com/80x80?text=${c.name.substring(0, 3)}`} 
                        alt={encodeHTML(c.name)}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = `https://via.placeholder.com/80x80?text=${c.name.substring(0, 3)}`;
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[#0b1c33]">{encodeHTML(c.name)}</h3>
                    <p className="text-sm text-[#d4a853] font-medium">{encodeHTML(c.sector)}</p>
                  </div>

                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="w-4 h-4 text-[#d4a853]" />
                      {encodeHTML(c.location)}
                    </div>
                  </div>

                  {c.registration_link && (
                    <div className="text-center">
                      <a
                        href={c.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#0b1c33] text-white rounded-lg hover:bg-[#1a2b47] transition-colors text-sm font-medium"
                      >
                        Register Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No companies available</p>
              <p className="text-slate-500 text-sm mt-2">
                Add companies in the admin panel to display them here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
