"use client";

import { useToggle } from "@/hooks/useToggle";
import { CartDrawer } from "../molecules/cart-drawer";
import { MobileNav } from "../molecules/mobile-nav";
import Navbar from "./Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isCartOpen, toggleCart] = useToggle();
  const [isMobileNavOpen, toggleMobileNav] = useToggle();

  return (
    <>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
      <MobileNav open={isMobileNavOpen} onOpenChange={toggleMobileNav} />
    </>
  );
}
