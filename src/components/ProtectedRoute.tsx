"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.initialized && !auth.isAuthenticated) {
      router.push("/login");
    }
  }, [auth.isAuthenticated, auth.initialized, router]);

  if (!auth.initialized) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  if (!auth.isAuthenticated) {
    return <p style={{ padding: "2rem" }}>Redirecting to login...</p>;
  }

  return <>{children}</>;
}
