import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import GuardRoute from "../guards/GuardRoute";

import Images from "../pages/Gallery";
import PlacementStats from "../pages/PlacementStats";
import BranchPlacements from "../pages/BranchPlacements";
import Login from "../pages/Login";
import Companies from "../pages/Companies";
import Dashboard from "../pages/Dashboard";
import Notifications from "../pages/Notifications";
import Menus from "../pages/Menus";
import Pages from "../pages/Pages";
import Admins from "../pages/Admin";
import Settings from "../pages/Settings";
import Drives from "../pages/Drives";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<Login />} />

      {/* Protected */}
      <Route element={<GuardRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menus" element={<Menus />} />
          <Route path="pages" element={<Pages />} />
          <Route path="images" element={<Images />} />
          <Route path="companies" element={<Companies />} />
          <Route path="drives" element={<Drives />} />
          <Route path="placementstats" element={<PlacementStats />} />
          <Route path="branch-placements" element={<BranchPlacements />} />
          <Route path="admins" element={<Admins />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

/* ---------------- PLACEHOLDER ---------------- */

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-3xl font-display text-navy mb-4">
          {title}
        </h1>
        <p className="text-slate-500">
          This page is under construction.
        </p>
      </div>
    </div>
  );
}
