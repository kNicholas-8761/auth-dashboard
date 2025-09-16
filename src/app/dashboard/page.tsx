"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push("/login");
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
          <h1 className="text-xl font-bold text-gray-800">Auth Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-gray-800">
              Dashboard Content
            </h2>
            <p className="mt-2 text-gray-600">fetch real data here 🚀</p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
