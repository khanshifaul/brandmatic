"use client";

import { toggleCart } from "@/lib/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useTheme } from "@/lib/theme/ThemeContext";
import { CartItem } from "@/types/cart";
import Link from "next/link";
import { FiMoon, FiShoppingCart, FiSun } from "react-icons/fi";
import { Button } from "../atoms/button";

export function Navbar() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { theme, toggleTheme } = useTheme();
  const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
    <nav className='sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center'>
        <div className='mr-4 flex'>
          <Link href='/' className='mr-6 flex items-center space-x-2'>
            {" "}
            <FiShoppingCart className='h-6 w-6' />
            <span className='hidden font-bold sm:inline-block'>ChromaFlow</span>
          </Link>
          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link href='/products' className='transition-colors hover:text-foreground/80 text-foreground/60'>
              Products
            </Link>
            <Link href='/theme-settings' className='transition-colors hover:text-foreground/80 text-foreground/60'>
              Theme
            </Link>
          </nav>
        </div>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          <nav className='flex items-center space-x-2'>
            <Button variant='ghost' size='sm' className='w-9 px-0' onClick={toggleTheme}>
              {" "}
              <FiSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <FiMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
            </Button>
            <Button variant='ghost' size='sm' className='w-9 px-0' onClick={() => dispatch(toggleCart())}>
              {" "}
              <FiShoppingCart className='h-4 w-4' />
              {itemCount > 0 && (
                <span className='absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                  {itemCount}
                </span>
              )}
              <span className='sr-only'>Shopping cart</span>
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
}
