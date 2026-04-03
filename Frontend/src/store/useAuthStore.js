// src/store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user:  localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      role:  localStorage.getItem("role"), // "admin" | "owner" | "user"

      login: (userData, token) =>
        set({ user: userData, token, role: userData.role }),

      logout: () =>
        set({ user: null, token: null, role: null }),

      updateUser: (updates) =>
        set((state) => ({ user: { ...state.user, ...updates } })),
    }),
    { name: "auth-storage" } // persists to localStorage
  )
);