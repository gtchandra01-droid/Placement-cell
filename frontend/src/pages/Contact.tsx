import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Contact Us</h1>
          <p className="text-white/70 text-lg">Get in touch with the Placement Cell</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-display font-bold text-[#0b1c33] mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-[#d4a853] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#0b1c33] mb-1">Address</h3>
                    <p className="text-slate-600">Humanities & Sciences Block (HSB), Ground Floor<br />JNTUK, Kakinada – 533003<br />Andhra Pradesh, India</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-[#d4a853] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#0b1c33] mb-1">Phone</h3>
                    <p className="text-slate-600">+91-884-2300900</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-[#d4a853] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#0b1c33] mb-1">Email</h3>
                    <p className="text-slate-600">placements@jntuk.edu.in</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-6 h-6 text-[#d4a853] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#0b1c33] mb-1">Office Hours</h3>
                    <p className="text-slate-600">Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 10:00 AM - 2:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#0b1c33] mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0b1c33] mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0b1c33] mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#0b1c33] mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-[#d4a853] focus:ring-2 focus:ring-[#d4a853]/20 outline-none transition resize-none"
                    required
                  />
                </div>

                {submitted && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-[#0b1c33] text-white font-medium hover:bg-[#142a4d] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
