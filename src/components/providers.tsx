"use client";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { getStore } from "@/lib/store"; // Import getStore from lib/store
import { Provider as ReduxProvider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const store = getStore(); // Use getStore to get the store instance
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}
