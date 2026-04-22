import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.services";

export default function GuardRoute() {
  return authService.isAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
