import api from "./axios";

export const getPlacements = async () => {
  const { data } = await api.get("/admin/placements");
  return data;
};

export const getPlacementById = async (id: number) => {
  const { data } = await api.get(`/admin/placements/${id}`);
  return data;
};

export const createPlacement = async (placementData: {
  student_id: number;
  company_id: number;
  drive_id?: number;
  status?: string;
}) => {
  const { data } = await api.post("/admin/placements", placementData);
  return data;
};

export const updatePlacement = async (id: number, placementData: {
  student_id: number;
  company_id: number;
  drive_id?: number;
  status?: string;
}) => {
  const { data } = await api.put(`/admin/placements/${id}`, placementData);
  return data;
};

export const deletePlacement = async (id: number) => {
  const { data } = await api.delete(`/admin/placements/${id}`);
  return data;
};

export const getPlacementStats = async () => {
  const { data } = await api.get("/placements/stats");
  return data;
};