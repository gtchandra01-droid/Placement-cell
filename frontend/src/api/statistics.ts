import api from "./axios";

export const getPlacementStats = async () => {
  const { data } = await api.get("/stats");
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data;
};

export const getRecentActivities = async () => {
  const { data } = await api.get("/dashboard/activities");
  return data;
};

export const getUpcomingDrives = async () => {
  const { data } = await api.get("/dashboard/upcoming-drives");
  return data;
};
