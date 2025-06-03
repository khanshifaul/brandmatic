'use client';

import { ReduxProvider } from "@/lib/redux/provider";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import Navbar from '../Navbar';
import ShoppingCart from '../ShoppingCart';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <Navbar />
        <ShoppingCart />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
} 