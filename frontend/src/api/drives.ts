import api from "./axios";

export const getDrives = async () => {
  const { data } = await api.get("/drives");
  return data;
};

export const getDriveById = async (id: number) => {
  const { data } = await api.get(`/drives/${id}`);
  return data;
};
