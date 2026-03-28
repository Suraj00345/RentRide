// src/store/useUIStore.js
import { create } from "zustand";

export const useUIStore = create((set) => ({
  activeNav:   "overview",
  sidebarOpen: false,

  setActiveNav:   (nav)  => set({ activeNav: nav }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar:  ()     => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));