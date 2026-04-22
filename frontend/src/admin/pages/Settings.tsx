import { useState, useEffect } from "react";
import { Save, RotateCcw } from "lucide-react";

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialFacebook: string;
  socialTwitter: string;
  socialLinkedin: string;
  maintenanceMode: boolean;
}

const defaultSettings: Settings = {
  siteName: "JNTUK Placement Portal",
  siteDescription: "Official placement portal for JNTUK",
  contactEmail: "placement@jntuk.edu.in",
  contactPhone: "+91-XXXXXXXXXX",
  address: "Jawaharlal Nehru Technological University, Kakinada",
  socialFacebook: "https://facebook.com/jntuk",
  socialTwitter: "https://twitter.com/jntuk",
  socialLinkedin: "https://linkedin.com/company/jntuk",
  maintenanceMode: false,
};

export default function Settings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [saved, setSaved] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (field: keyof Settings, value: any) => {
    setSettings({ ...settings, [field]: value });
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    if (!window.confirm("Reset to default settings?")) return;
    setSettings(defaultSettings);
    localStorage.removeItem("settings");
    alert("Settings reset to default!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0b3a82] mb-2">Settings</h1>
          <p className="text-gray-600">Manage your placement portal settings</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✓ Settings saved successfully!
          </div>
        )}

        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">

          {/* Site Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-[#0b3a82] mb-4">
              Site Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange("siteName", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleChange("siteDescription", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-[#0b3a82] mb-4">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange("contactEmail", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleChange("contactPhone", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-semibold text-[#0b3a82] mb-4">
              Social Media Links
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={settings.socialFacebook}
                  onChange={(e) => handleChange("socialFacebook", e.target.value)}
                  placeholder="https://facebook.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Twitter URL
                </label>
                <input
                  type="url"
                  value={settings.socialTwitter}
                  onChange={(e) => handleChange("socialTwitter", e.target.value)}
                  placeholder="https://twitter.com/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={settings.socialLinkedin}
                  onChange={(e) => handleChange("socialLinkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b3a82]"
                />
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="pb-6">
            <h2 className="text-xl font-semibold text-[#0b3a82] mb-4">
              System Settings
            </h2>

            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="maintenance"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange("maintenanceMode", e.target.checked)}
                className="w-4 h-4 text-[#0b3a82] rounded"
              />
              <label htmlFor="maintenance" className="text-gray-700 font-medium">
                Enable Maintenance Mode
              </label>
              <span className="text-sm text-gray-500">
                (Hides the site from public view)
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-[#0b3a82] text-white rounded-lg hover:bg-[#0a2d6a] font-medium"
            >
              <Save size={18} />
              Save Settings
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
            >
              <RotateCcw size={18} />
              Reset to Default
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
