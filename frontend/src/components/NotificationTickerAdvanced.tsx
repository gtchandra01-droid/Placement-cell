import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";
import { dataService } from "../lib/dataService";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "alert" | "success" | "info";
  date: string;
}

export default function NotificationTickerAdvanced() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    // Combine all notifications into one continuous text
    const combinedText = notifications
      .map((n) => `${n.title}: ${n.message}`)
      .join(" • ");

    setDisplayText(combinedText + " • " + combinedText); // Duplicate for seamless loop
  }, [notifications]);

  const loadNotifications = () => {
    try {
      const data = dataService.getNotifications();
      if (data && data.length > 0) {
        setNotifications(data);
      } else {
        const defaultNotifications: Notification[] = [
          {
            id: 1,
            title: "📢 Infosys Drive",
            message: "Infosys is conducting a campus placement drive. Register now!",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 2,
            title: "⚠️ Document Submission",
            message: "Submit your resume and certificates by 10th December 2024.",
            type: "alert",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 3,
            title: "📝 TCS Assessment",
            message: "TCS online assessments on 20th December. Check your email for details.",
            type: "info",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 4,
            title: "✅ Statistics Updated",
            message: "95% placement rate achieved. Average package: 6.5 LPA.",
            type: "success",
            date: new Date().toISOString().split("T")[0],
          },
          {
            id: 5,
            title: "🎯 Wipro Recruitment",
            message: "Wipro hiring for multiple positions. Registration opens 5th January.",
            type: "info",
            date: new Date().toISOString().split("T")[0],
          },
        ];
        setNotifications(defaultNotifications);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  // Get the type of first notification for color
  const firstNotification = notifications[0];
  let bgColor = "bg-blue-600";

  if (firstNotification.type === "alert") {
    bgColor = "bg-red-600";
  } else if (firstNotification.type === "success") {
    bgColor = "bg-green-600";
  }

  return (
    <div className={`${bgColor} text-white py-2.5 px-6 shadow-md overflow-hidden`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Bell Icon */}
          <div className="flex-shrink-0">
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-lg animate-bounce">🔔</span>
            </div>
          </div>

          {/* Scrolling Text */}
          <div className="flex-1 overflow-hidden">
            <div className="whitespace-nowrap animate-scroll-continuous text-sm font-medium">
              {displayText}
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll-continuous {
          animation: scroll-continuous 30s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-scroll-continuous {
            animation: scroll-continuous 20s linear infinite;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
