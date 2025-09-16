"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useRouter } from "next/navigation";

type Post = {
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch 5 posts
        const postsRes = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        const postsData = await postsRes.json();
        setPosts(postsData);

        // Fetch users
        const usersRes = await fetch(
          "https://jsonplaceholder.typicode.com/users?_limit=5"
        );
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    }
    fetchData();
  }, []);

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
        <main className="p-6 space-y-6">
          {/* Posts section */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Latest Posts
            </h2>
            <ul className="space-y-3">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="rounded border border-gray-200 p-3 hover:bg-gray-50"
                >
                  <h3 className="font-medium text-gray-800">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Users section */}
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Team Members
            </h2>
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <li key={user.id} className="py-3">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.company.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
