"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      if (data.session && data.user) {
        dispatch(
          login({
            token: data.session.access_token,
            user: {
              name: data.user.email ?? "", // fallback to empty string
            },
          })
        );
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Unexpected login error");
      console.error("Unexpected login error:", err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="mb-8 text-3xl font-bold text-blue-600">Auth Dashboard</h1>

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-xl font-semibold text-center text-gray-800">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 text-gray-900
                         focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-400 px-3 py-2 text-gray-900
                         focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Or{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            create an account
          </a>
        </p>
      </div>
    </div>
  );
}
