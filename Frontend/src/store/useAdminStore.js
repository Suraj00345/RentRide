// src/store/useAdminStore.js
import { create } from "zustand";

export const useAdminStore = create((set) => ({
  // optimistic status overrides before server confirms
  ownerStatuses: {}, // { [ownerId]: "approved" | "rejected" }
  carStatuses: {}, // { [carId]:   "approved" | "rejected" }

  setOwnerStatus: (id, status) =>
    set((state) => ({
      ownerStatuses: { ...state.ownerStatuses, [id]: status },
    })),

  setCarStatus: (id, status) =>
    set((state) => ({
      carStatuses: { ...state.carStatuses, [id]: status },
    })),
}));
