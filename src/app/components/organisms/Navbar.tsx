'use client';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/store';
import { toggleCart } from '@/lib/redux/features/cart/cartSlice';
import { useTheme } from '@/lib/theme/ThemeContext';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const { theme, toggleTheme } = useTheme();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-background border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-foreground">
              ChromaFlow
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/products"
                className="text-foreground-muted hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                Products
              </Link>
              <Link
                href="/theme-settings"
                className="text-foreground-muted hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                Theme
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-foreground-muted hover:text-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => dispatch(toggleCart())}
              className="relative p-2 text-foreground-muted hover:text-foreground"
            >
              🛒
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 