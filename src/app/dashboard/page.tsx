"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useRouter } from "next/navigation";

// ✅ Define types
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

  // ✅ Typed state
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const postsRes = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        const postsData: Post[] = await postsRes.json();
        setPosts(postsData);

        const usersRes = await fetch(
          "https://jsonplaceholder.typicode.com/users?_limit=5"
        );
        const usersData: User[] = await usersRes.json();
        setUsers(usersData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
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
        <header
          className="flex items-center justify-between bg-white px-6 py-4 shadow"
          role="banner"
        >
          <h1 className="text-sm md:text-xl font-bold text-gray-800">
            Auth Dashboard
          </h1>
          <div className="flex items-center gap-4">
            {/* Welcome + Email */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-1">
              <span className="text-xs sm:text-sm text-gray-600">Welcome,</span>
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                {user?.name}
              </p>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-red-700"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6 grid gap-6 md:grid-cols-2" role="main">
          {/* Posts section */}
          <section
            aria-labelledby="posts-heading"
            className="rounded-lg bg-white p-6 shadow"
          >
            <h2
              id="posts-heading"
              className="mb-4 text-lg font-semibold text-gray-800"
            >
              Latest Posts
            </h2>

            {loading ? (
              <p className="text-sm text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
              <p className="text-sm text-gray-500">No posts available.</p>
            ) : (
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
            )}
          </section>

          {/* Users section */}
          <section
            aria-labelledby="users-heading"
            className="rounded-lg bg-white p-6 shadow"
          >
            <h2
              id="users-heading"
              className="mb-4 text-lg font-semibold text-gray-800"
            >
              Team Members
            </h2>

            {loading ? (
              <p className="text-sm text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-sm text-gray-500">No users available.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {users.map((member) => (
                  <li key={member.id} className="py-3">
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.email}</p>
                    <p className="text-xs text-gray-500">
                      {member.company.name}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
