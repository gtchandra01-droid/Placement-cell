import api from "./axios";

export const getCompanies = async () => {
  const { data } = await api.get("/admin/companies");
  return data;
};

export const getCompanyById = async (id: number) => {
  const { data } = await api.get(`/admin/companies/${id}`);
  return data;
};

export const createCompany = async (companyData: {
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
}) => {
  const { data } = await api.post("/admin/companies", companyData);
  return data;
};

export const updateCompany = async (id: number, companyData: {
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
}) => {
  const { data } = await api.put(`/admin/companies/${id}`, companyData);
  return data;
};

export const deleteCompany = async (id: number) => {
  const { data } = await api.delete(`/admin/companies/${id}`);
  return data;
};

export const getPublicCompanies = async () => {
  const { data } = await api.get("/companies");
  return data;
};
