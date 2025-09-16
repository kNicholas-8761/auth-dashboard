"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ProtectedRoute>
      <div style={{ padding: "2rem" }}>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.name || "Guest"} 🎉</p>
      </div>
    </ProtectedRoute>
  );
}
