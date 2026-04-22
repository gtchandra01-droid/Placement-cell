// Data service for localStorage operations
export const dataService = {
  // Companies
  getCompanies: () => {
    try {
      const data = localStorage.getItem("companies");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting companies:", error);
      return [];
    }
  },

  saveCompanies: (companies: any[]) => {
    try {
      localStorage.setItem("companies", JSON.stringify(companies));
    } catch (error) {
      console.error("Error saving companies:", error);
    }
  },

  // Notifications
  getNotifications: () => {
    try {
      const data = localStorage.getItem("notifications");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting notifications:", error);
      return [];
    }
  },

  saveNotifications: (notifications: any[]) => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  },

  // Pages
  getPages: () => {
    try {
      const data = localStorage.getItem("pages");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting pages:", error);
      return [];
    }
  },

  savePages: (pages: any[]) => {
    try {
      localStorage.setItem("pages", JSON.stringify(pages));
    } catch (error) {
      console.error("Error saving pages:", error);
    }
  },

  // Images
  getImages: () => {
    try {
      const data = localStorage.getItem("images");
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting images:", error);
      return [];
    }
  },

  saveImages: (images: any[]) => {
    try {
      localStorage.setItem("images", JSON.stringify(images));
    } catch (error) {
      console.error("Error saving images:", error);
    }
  },
};
