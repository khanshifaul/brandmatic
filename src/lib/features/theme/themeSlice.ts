import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";

export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'zinc' | 'slate' | 'stone' | 'gray' | 'neutral';
export type ThemeSize = 'default' | 'sm' | 'lg';

export interface ThemeState {
  mode: ThemeMode;
  color: ThemeColor;
  size: ThemeSize;
  isReducedMotion: boolean;
}

const initialState: ThemeState = {
  mode: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  color: 'neutral',
  size: 'default',
  isReducedMotion: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
    setColor: (state, action: PayloadAction<ThemeColor>) => {
      state.color = action.payload;
    },
    setSize: (state, action: PayloadAction<ThemeSize>) => {
      state.size = action.payload;
    },
    setReducedMotion: (state, action: PayloadAction<boolean>) => {
      state.isReducedMotion = action.payload;
    },
  },
});

export const { setMode, setColor, setSize, setReducedMotion } = themeSlice.actions;

// Selectors
export const selectThemeMode = (state: RootState) => state.theme?.mode || initialState.mode;
export const selectThemeColor = (state: RootState) => state.theme?.color || initialState.color;
export const selectThemeSize = (state: RootState) => state.theme?.size || initialState.size;
export const selectIsReducedMotion = (state: RootState) => state.theme?.isReducedMotion || initialState.isReducedMotion;

export default themeSlice.reducer; 