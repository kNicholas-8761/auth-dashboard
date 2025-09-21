import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

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

// Async thunk to restore Supabase session
export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      return {
        token: data.session.access_token,
        user: { name: data.session.user.email ?? "" },
      };
    }
    return null;
  }
);

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
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      } else {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      }
      state.initialized = true;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
