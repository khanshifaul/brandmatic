'use client';

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });
const ShoppingCart = dynamic(() => import('./ShoppingCart'), { ssr: false });

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
      <ShoppingCart />
    </div>
  );
} 