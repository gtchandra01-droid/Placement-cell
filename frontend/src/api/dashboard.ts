import api from "./axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/dashboard/stats");
  return data as {
    studentsPlaced: number;
    companiesVisited: number;
    highestPackage: number;
    placementPercent: number;
  };
};

export const getRecentActivities = async () => {
  const { data } = await api.get("/dashboard/activities");
  return data as Array<{ id: number; description: string; created_at: string }>;
};

export const getUpcomingDrives = async () => {
  const { data } = await api.get("/dashboard/upcoming-drives");
  return data as Array<{
    id: number;
    company_id: number;
    drive_date: string;
    package_lpa: number;
    role: string;
  }>;
};
