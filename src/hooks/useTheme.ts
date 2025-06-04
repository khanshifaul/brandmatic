'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import { 
  ThemeMode, 
  ThemeColor, 
  selectThemeMode, 
  selectThemeColor,
  setMode,
  setColor
} from '@/lib/features/theme/themeSlice';

export function useTheme() {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectThemeMode) ?? 'system';
  const color = useAppSelector(selectThemeColor) ?? 'neutral';

  const toggleMode = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const currentIndex = modes.indexOf(mode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    dispatch(setMode(nextMode));
  };

  const changeColor = (newColor: ThemeColor) => {
    dispatch(setColor(newColor));
  };

  return {
    mode,
    color,
    toggleMode,
    changeColor,
  };
}

