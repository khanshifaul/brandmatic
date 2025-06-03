'use client';

import { ReduxProvider } from "@/lib/redux/provider";
import Navbar from './Navbar';
import ShoppingCart from './ShoppingCart';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Navbar />
      <ShoppingCart />
      {children}
    </ReduxProvider>
  );
} 