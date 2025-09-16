import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { name: string } | null;
  initialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; user: { name: string } }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth");
      }
    },
    loadAuth: (state) => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("auth");
        if (saved) {
          const parsed = JSON.parse(saved) as AuthState;
          state.isAuthenticated = parsed.isAuthenticated;
          state.token = parsed.token;
          state.user = parsed.user;
        }
      }
      state.initialized = true;
    },
  },
});

export const { login, logout, loadAuth } = authSlice.actions;
export default authSlice.reducer;
