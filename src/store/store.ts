import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

// Create the store and register the "auth" slice
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Types for TypeScript
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
