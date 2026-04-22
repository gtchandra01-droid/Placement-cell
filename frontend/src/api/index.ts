import api from "./axios";

// Dashboard Stats
export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

// Placement Stats
export const getPlacementStats = async () => {
  const { data } = await api.get("/stats");
  return data;
};

// Activities
export const getActivities = async () => {
  const { data } = await api.get("/dashboard/activities");
  return data;
};

// Upcoming Drives
export const getUpcomingDrives = async () => {
  const { data } = await api.get("/dashboard/upcoming-drives");
  return data;
};

// All Drives
export const getAllDrives = async () => {
  const { data } = await api.get("/drives");
  return data;
};

export const getDriveById = async (id: number) => {
  const { data } = await api.get(`/drives/${id}`);
  return data;
};

// All Companies
export const getAllCompanies = async () => {
  const { data } = await api.get("/admin/companies");
  return data;
};

export const getCompanyById = async (id: number) => {
  const { data } = await api.get(`/admin/companies/${id}`);
  return data;
};

// Notifications
export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

// Menus
export const getMenus = async () => {
  const { data } = await api.get("/menus");
  return data;
};

// Images
export const getImages = async () => {
  const { data } = await api.get("/images");
  return data;
};

// Contact Form
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const { data } = await api.post("/contact", formData);
  return data;
};
