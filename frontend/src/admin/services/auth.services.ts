import { loginAdmin, getProfile, type LoginPayload } from "../../api/auth";
import { sanitizeForLogging, sanitizeInput, validateEmail } from "../../lib/security";

export const authService = {
  async login(payload: LoginPayload) {
    // Validate input
    if (!payload.email || !payload.password) {
      throw new Error("Email and password are required");
    }

    if (!validateEmail(payload.email)) {
      throw new Error("Invalid email format");
    }

    // Sanitize for logging
    const sanitizedEmail = sanitizeForLogging(payload.email);
    console.log(`Login attempt for: ${sanitizedEmail}`);

    try {
      const data = await loginAdmin(payload);
      
      // Sanitize before storing
      const sanitizedUser = {
        ...data.admin,
        email: sanitizeInput(data.admin.email),
        name: sanitizeInput(data.admin.name),
      };

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(sanitizedUser));
      
      console.log(`Login successful for: ${sanitizedEmail}`);
      return data;
    } catch (error) {
      console.error(`Login failed for: ${sanitizedEmail}`);
      throw error;
    }
  },

  logout() {
    const user = this.getUser();
    if (user) {
      console.log(`Logout for: ${sanitizeForLogging(user.email)}`);
    }
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  },

  getToken(): string | null {
    return localStorage.getItem("admin_token");
  },

  getUser() {
    const user = localStorage.getItem("admin_user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("admin_token");
  },

  async fetchProfile() {
    return getProfile();
  },
};
