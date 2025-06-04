'use client';

import { useEffect } from 'react';
import { useAppSelector } from '../store';
import { selectThemeMode } from '../features/theme/themeSlice';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(selectThemeMode) ?? 'system';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (mode === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(mode);
    }
  }, [mode]);

  return children;
} 