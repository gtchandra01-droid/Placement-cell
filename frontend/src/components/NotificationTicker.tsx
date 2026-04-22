import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: "alert" | "success" | "info";
  date: string;
}

export default function NotificationTicker() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadNotifications();

    const handleStorageChange = () => {
      loadNotifications();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (notifications.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const loadNotifications = () => {
    try {
      const saved = localStorage.getItem("notifications");
      if (saved) {
        const data = JSON.parse(saved);
        setNotifications(data);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const handleTickerClick = () => {
    if (notifications.length > 0) {
      setSelectedNotification(notifications[currentIndex]);
      setShowModal(true);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedNotification(null);
  };

  if (notifications.length === 0) {
    return null;
  }

  const currentNotification = notifications[currentIndex];
  let Icon = Info;
  let bgColor = "bg-blue-600";
  let textColor = "text-blue-100";

  if (currentNotification.type === "alert") {
    Icon = AlertCircle;
    bgColor = "bg-red-600";
    textColor = "text-red-100";
  } else if (currentNotification.type === "success") {
    Icon = CheckCircle;
    bgColor = "bg-green-600";
    textColor = "text-green-100";
  }

  return (
    <>
      {/* Notification Ticker */}
      <div
        onClick={handleTickerClick}
        className={`${bgColor} text-white py-3 px-6 shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <Icon className="w-5 h-5 animate-pulse" />
            </div>

            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-8 animate-scroll">
                <div className="flex-shrink-0 whitespace-nowrap">
                  <p className="font-semibold text-sm">{currentNotification.title}</p>
                  <p className={`text-xs ${textColor} truncate`}>
                    {currentNotification.message}
                  </p>
                </div>

                <div className="flex-shrink-0 whitespace-nowrap">
                  <p className="font-semibold text-sm">{currentNotification.title}</p>
                  <p className={`text-xs ${textColor} truncate`}>
                    {currentNotification.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 text-xs font-medium">
              {currentIndex + 1} / {notifications.length}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 15s linear infinite;
          }

          @media (max-width: 768px) {
            .animate-scroll {
              animation: scroll 10s linear infinite;
            }
          }
        `}</style>
      </div>

      {/* Notification Details Modal */}
      {showModal && selectedNotification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`${bgColor} text-white p-6 flex items-start justify-between`}>
              <div className="flex items-start gap-4 flex-1">
                <Icon className="w-6 h-6 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{selectedNotification.title}</h2>
                  <p className="text-sm opacity-90 mt-1">
                    {new Date(selectedNotification.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    selectedNotification.type === "alert"
                      ? "bg-red-100 text-red-700"
                      : selectedNotification.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {selectedNotification.type.charAt(0).toUpperCase() + selectedNotification.type.slice(1)}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Details</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {selectedNotification.message}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Notification ID:</span>
                  <span className="text-sm text-gray-800">#{selectedNotification.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Date:</span>
                  <span className="text-sm text-gray-800">
                    {new Date(selectedNotification.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Type:</span>
                  <span className="text-sm text-gray-800 capitalize">
                    {selectedNotification.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const nextIndex = (currentIndex + 1) % notifications.length;
                  setCurrentIndex(nextIndex);
                  setSelectedNotification(notifications[nextIndex]);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Next Notification
              </button>
            </div>

            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">All Notifications</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((notif, index) => (
                  <button
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedNotification.id === notif.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${
                          notif.type === "alert"
                            ? "bg-red-600"
                            : notif.type === "success"
                            ? "bg-green-600"
                            : "bg-blue-600"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{notif.title}</p>
                        <p className="text-sm text-gray-600 truncate">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notif.date).toLocaleDateString()}
                        </p>
                      </div>
                      {index === currentIndex && (
                        <span className="text-xs font-bold text-blue-600 flex-shrink-0">
                          CURRENT
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
