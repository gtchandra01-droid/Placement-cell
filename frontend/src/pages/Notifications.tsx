import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { dataService } from "../lib/dataService";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "alert" | "success" | "info";
  date: string;
  file?: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
    // Listen for storage changes from other tabs/windows
    window.addEventListener("storage", loadNotifications);
    return () => window.removeEventListener("storage", loadNotifications);
  }, []);

  const loadNotifications = () => {
    try {
      const data = dataService.getNotifications();
      
      if (data && data.length > 0) {
        const sorted = data.sort((a: Notification, b: Notification) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setNotifications(sorted);
      } else {
        // Initialize with default notifications
        const defaultNotifications: Notification[] = [
          {
            id: 1,
            title: "Placement Drive - Infosys",
            message: "Infosys is conducting a campus placement drive. Eligible students can register on the portal. Last date: 15th December 2024.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 2,
            title: "Important: Document Submission",
            message: "All students must submit their updated resume and certificates by 10th December 2024. Incomplete submissions will not be considered.",
            type: "alert",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 3,
            title: "TCS Recruitment Process",
            message: "TCS will conduct online assessments on 20th December 2024. Selected candidates will be called for interviews. Check your email for login credentials.",
            type: "info",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 4,
            title: "Placement Statistics Updated",
            message: "This year's placement statistics have been updated. 95% of eligible students have been placed with an average package of 6.5 LPA.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 5,
            title: "Placement Drive - Infosys",
            message: "Infosys is conducting a campus placement drive. Eligible students can register on the portal. Last date: 15th December 2024.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 6,
            title: "Important: Document Submission",
            message: "All students must submit their updated resume and certificates by 10th December 2024. Incomplete submissions will not be considered.",
            type: "alert",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 7,
            title: "TCS Recruitment Process",
            message: "TCS will conduct online assessments on 20th December 2024. Selected candidates will be called for interviews. Check your email for login credentials.",
            type: "info",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 8,
            title: "Placement Statistics Updated",
            message: "This year's placement statistics have been updated. 95% of eligible students have been placed with an average package of 6.5 LPA.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 9,
            title: "Wipro Campus Recruitment",
            message: "Wipro is hiring for various positions. Registration opens on 5th January 2025. Minimum CGPA requirement: 6.5.",
            type: "info",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 10,
            title: "Interview Schedule Released",
            message: "Interview schedules for Accenture have been released. Check your registered email for interview timings and venue details.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 11,
            title: "Urgent: Deadline Extension",
            message: "The deadline for HCL Technologies registration has been extended to 25th December 2024. Hurry up and register now!",
            type: "alert",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 12,
            title: "Cognizant Results Announced",
            message: "Results for Cognizant written test have been announced. Selected candidates will be notified via email within 24 hours.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
        ];
        
        setNotifications(defaultNotifications);
        dataService.saveNotifications(defaultNotifications);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0b1c33] mx-auto mb-4"></div>
          <p className="text-slate-600">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-[#0b1c33] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Notifications</h1>
          <p className="text-white/70 text-lg">Stay updated with latest placement news</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          {notifications && notifications.length > 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              {/* Header with count */}
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <p className="text-sm font-medium text-slate-700">
                  {notifications.length} Notification{notifications.length !== 1 ? "s" : ""}
                </p>
              </div>

              {/* Scrollable container */}
              <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                <div className="divide-y divide-slate-200">
                  {notifications.map((n) => {
                    let Icon = Info;
                    let bgColor = "bg-blue-50";
                    let borderColor = "border-l-4 border-blue-400";
                    let iconColor = "text-blue-600";

                    if (n.type === "alert") {
                      Icon = AlertCircle;
                      bgColor = "bg-red-50";
                      borderColor = "border-l-4 border-red-400";
                      iconColor = "text-red-600";
                    } else if (n.type === "success") {
                      Icon = CheckCircle;
                      bgColor = "bg-emerald-50";
                      borderColor = "border-l-4 border-emerald-400";
                      iconColor = "text-emerald-600";
                    }

                    return (
                      <div
                        key={n.id}
                        className={`p-5 ${bgColor} ${borderColor} hover:bg-opacity-75 transition-colors duration-200 flex gap-4`}
                      >
                        <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#0b1c33] break-words">{n.title}</h3>
                          <p className="text-slate-600 text-sm mt-1 break-words">{n.message}</p>
                          <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                            <p className="text-xs text-slate-500">
                              {new Date(n.date).toLocaleDateString()}
                            </p>
                            {n.file && (
                              <a
                                href={n.file}
                                download
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline"
                              >
                                Download Attachment
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-600 text-lg">No notifications available</p>
              <p className="text-slate-500 text-sm mt-2">
                Check back later for placement updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
