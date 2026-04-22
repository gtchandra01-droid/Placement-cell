import { useState } from "react";
import { MessageSquare, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { validateForm, sanitizeInput, encodeHTML } from "../lib/security";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I register for a placement drive?",
    answer: "You can register for placement drives through the Companies page. Click on the 'Register Now' button on any company's card to proceed with registration.",
  },
  {
    id: 2,
    question: "What documents do I need for placement?",
    answer: "You will typically need your resume, academic transcripts, ID proof, and any relevant certificates. Check the specific requirements for each company on their registration page.",
  },
  {
    id: 3,
    question: "How can I check my placement status?",
    answer: "You can check your placement status by visiting the Notifications page or contacting the placement cell directly. We send updates via notifications.",
  },
  {
    id: 4,
    question: "What is the eligibility criteria for placements?",
    answer: "Eligibility criteria varies by company. Generally, students should have a minimum CGPA as specified by each company. Check individual company requirements on their registration page.",
  },
  {
    id: 5,
    question: "How do I contact the placement cell?",
    answer: "You can contact the placement cell using the contact form below or reach out directly using the phone number and email provided in the Contact section.",
  },
  {
    id: 6,
    question: "Can I apply for multiple companies?",
    answer: "Yes, you can apply for multiple companies. However, ensure you meet the eligibility criteria for each company before applying.",
  },
];

export default function HelpSupport() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validationRules = {
    name: ["required", "min:2", "max:100"],
    email: ["required", "email", "max:100"],
    subject: ["required", "min:5", "max:200"],
    message: ["required", "min:10", "max:1000"],
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      id: Date.now(),
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message),
      date: new Date().toISOString(),
    };

    // Save to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem("supportMessages") || "[]");
      messages.push(sanitizedData);
      localStorage.setItem("supportMessages", JSON.stringify(messages));
      
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error saving message:", error);
      setErrors({ submit: "Failed to send message. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Help & Support</h1>
          <p className="text-white/70 text-lg">Get answers to your questions and reach out to us</p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Email */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0b1c33] mb-2">Email</h3>
              <p className="text-slate-600">placement@jntuk.edu.in</p>
              <p className="text-sm text-slate-500 mt-2">We'll respond within 24 hours</p>
            </div>

            {/* Phone */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0b1c33] mb-2">Phone</h3>
              <p className="text-slate-600">+91-XXXXXXXXXX</p>
              <p className="text-sm text-slate-500 mt-2">Mon-Fri, 9 AM - 5 PM</p>
            </div>

            {/* Location */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-[#0b1c33] mb-2">Location</h3>
              <p className="text-slate-600 text-sm">JNTUK Campus, Kakinada</p>
              <p className="text-sm text-slate-500 mt-2">Andhra Pradesh, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-[#0b1c33] mb-8 text-center">Send us a Message</h2>
          
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✓ Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              ✗ {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="Your name"
                  className={`w-full px-4 py-2 border rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b1c33] ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-2 border rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b1c33] ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleFormChange("subject", e.target.value)}
                placeholder="What is this about?"
                className={`w-full px-4 py-2 border rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b1c33] ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.subject && <p className="text-red-600 text-sm mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleFormChange("message", e.target.value)}
                placeholder="Tell us how we can help..."
                rows={5}
                className={`w-full px-4 py-2 border rounded-lg text-black bg-white focus:ring-2 focus:ring-[#0b1c33] ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#0b1c33] text-white rounded-lg hover:bg-[#1a2b47] font-medium transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-[#0b1c33] mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg border border-slate-100 shadow-sm">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[#0b1c33] text-left">{encodeHTML(faq.question)}</h3>
                  {expandedFAQ === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-[#0b1c33] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#0b1c33] flex-shrink-0" />
                  )}
                </button>

                {expandedFAQ === faq.id && (
                  <div className="px-6 py-4 border-t border-slate-100 bg-gray-50">
                    <p className="text-slate-600">{encodeHTML(faq.answer)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
