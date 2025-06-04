"use client";

import { Footer } from "@/components/organisms/footer";
import Navbar from "@/components/organisms/Navbar";
import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn(inter.className, "min-h-screen bg-background antialiased")}>
      
        <div className='relative flex min-h-screen flex-col'>
          <Navbar />
          <main className='flex-1'>{children}</main>
          <Footer />
          <Toaster position='top-center' />
        </div>
      
    </div>
  );
} 