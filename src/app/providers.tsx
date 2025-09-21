"use client";

import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "../store/store";
import { useEffect } from "react";
import { restoreSession } from "../store/authSlice";

function AuthLoader({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthLoader>{children}</AuthLoader>
    </Provider>
  );
}
