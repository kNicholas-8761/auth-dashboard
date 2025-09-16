"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../store/authSlice";

export default function Home() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Auth Test</h1>
      <p>Logged in: {auth.isAuthenticated ? "✅ Yes" : "❌ No"}</p>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() =>
            dispatch(login({ token: "abc123", user: { name: "Kevin" } }))
          }
          style={{ marginRight: "1rem" }}
        >
          Login
        </button>

        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
}
