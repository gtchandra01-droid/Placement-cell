import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/auth.services";

interface RoleRouteProps {
  allowedRole: string;
}

export default function RoleRoute({ allowedRole }: RoleRouteProps) {
  const user = authService.getUser();
  return user?.role === allowedRole ? <Outlet /> : <Navigate to="/admin" replace />;
}
