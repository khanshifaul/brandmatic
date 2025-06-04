import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type SidebarView = "default" | "cart" | "filters" | "menu" | "user";

export interface SidebarState {
  isOpen: boolean;
  currentView: SidebarView;
  isPinned: boolean;
  width: number;
  history: SidebarView[];
}

const initialState: SidebarState = {
  isOpen: false,
  currentView: "default",
  isPinned: false,
  width: 320, // default width in pixels
  history: [],
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    openSidebar: (state) => {
      state.isOpen = true;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
    setView: (state, action: PayloadAction<SidebarView>) => {
      if (state.currentView !== action.payload) {
        state.history.push(state.currentView);
        state.currentView = action.payload;
      }
      state.isOpen = true;
    },
    goBack: (state) => {
      const previousView = state.history.pop();
      if (previousView) {
        state.currentView = previousView;
      } else {
        state.isOpen = false;
      }
    },
    togglePin: (state) => {
      state.isPinned = !state.isPinned;
      if (state.isPinned) {
        state.isOpen = true;
      }
    },
    setWidth: (state, action: PayloadAction<number>) => {
      // Clamp width between 240 and 480 pixels
      state.width = Math.min(Math.max(action.payload, 240), 480);
    },
    resetSidebar: (state) => {
      return { ...initialState, isPinned: state.isPinned };
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  setView,
  goBack,
  togglePin,
  setWidth,
  resetSidebar,
} = sidebarSlice.actions;

// Selectors
export const selectIsSidebarOpen = (state: RootState) => state.sidebar.isOpen;
export const selectCurrentView = (state: RootState) => state.sidebar.currentView;
export const selectIsSidebarPinned = (state: RootState) => state.sidebar.isPinned;
export const selectSidebarWidth = (state: RootState) => state.sidebar.width;
export const selectHasHistory = (state: RootState) => state.sidebar.history.length > 0;
export const selectSidebar = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer; 