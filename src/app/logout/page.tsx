"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Clear auth state + localStorage
    dispatch(logout());

    // Redirect to login
    router.push("/login");
  }, [dispatch, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <p className="text-gray-700">Logging out...</p>
    </div>
  );
}
