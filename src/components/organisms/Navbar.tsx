"use client";

import { selectCartItemCount } from "@/lib/features/cart/cartSlice";
import { useAppSelector } from "@/lib/store";

import { useTheme } from "@/hooks/useTheme";
import { useToggle } from "@/hooks/useToggle";
import { cn } from "@/utils/cn";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiShoppingCart } from "react-icons/fi";
import { Button } from "../atoms/button";

import { MobileNav } from "../molecules/mobile-nav";
import { NavLinks } from "../molecules/nav-links";
// import ThemePicker from "../molecules/theme-picker";
import { UnifiedCart } from "./unified-cart";
import ThemeToggler from "../molecules/themeToggler";
import Logo from "../atoms/logo";
import { CommandMenu } from "../molecules/command-menu";

export default function Navbar() {
  const cartItemCount = useAppSelector(selectCartItemCount);
  const pathname = usePathname();
  const { mode } = useTheme();
  const [isCartOpen, toggleCart] = useToggle();
  const [isMobileNavOpen, toggleMobileNav] = useToggle();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    toggleMobileNav(false);
  }, [pathname, toggleMobileNav]);

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        mode === "dark" ? "border-slate-50/[0.06]" : "border-slate-900/10"
      )}
    >
      <div className='container mx-auto px-4 md:p-0 flex h-14 items-center'>
        <Button
          title='Toggle Menu'
          variant='ghost'
          className='mr-3 h-8 w-8 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
          onClick={() => toggleMobileNav()}
        >
          <FiMenu className='h-5 w-5' />
       
        </Button>
        <Logo />
        <div className='mr-4 hidden md:flex'>
          <NavLinks />
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            <CommandMenu />
          </div>
          <div className='flex items-center gap-2'>
            <ThemeToggler />
            {/* <ThemePicker /> */}

            <Button
              title='Toggle Cart'
              variant='ghost'
              className='relative h-8 w-8 px-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0'
              onClick={() => toggleCart()}
            >
              <FiShoppingCart className='h-5 w-5' />
              {mounted && cartItemCount > 0 && (
                <span className='absolute right-0 top-0 -mr-1 -mt-1 h-4 w-4 rounded-full bg-red-600 text-[11px] font-medium text-white flex items-center justify-center'>
                  {cartItemCount}
                </span>
              )}
              
            </Button>
          </div>
        </div>
      </div>
      <UnifiedCart mode="sheet" isOpen={isCartOpen} onClose={() => toggleCart(false)} />
      <MobileNav open={isMobileNavOpen} onOpenChange={toggleMobileNav} />
    </div>
  );
}
