import * as XLSX from "xlsx";
import { Request } from "express";

export interface CompanyData {
  name: string;
  sector: string;
  location: string;
  logo_url?: string;
  registration_link?: string;
}

export const parseExcelFile = (file: Express.Multer.File): CompanyData[] => {
  try {
    const workbook = XLSX.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data.map((row: any) => ({
      name: row.Name || row.name || "",
      sector: row.Sector || row.sector || "",
      location: row.Location || row.location || "",
      logo_url: row["Logo URL"] || row.logo_url || null,
      registration_link: row["Registration Link"] || row.registration_link || null,
    })).filter(company => company.name && company.sector && company.location);
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    throw new Error("Failed to parse Excel file");
  }
};

export const validateCompanyData = (companies: CompanyData[]): { valid: CompanyData[], errors: string[] } => {
  const valid: CompanyData[] = [];
  const errors: string[] = [];

  companies.forEach((company, index) => {
    if (!company.name || !company.sector || !company.location) {
      errors.push(`Row ${index + 2}: Missing required fields (Name, Sector, Location)`);
    } else {
      valid.push(company);
    }
  });

  return { valid, errors };
};
