// src/hooks/useAdminQueries.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminStore } from "../store/useAdminStore";
import * as adminApi from "../Api/adminApi";

// ── Queries (GET) ─────────────────────────────────────────

export const usePendingOwners = () =>
  useQuery({
    queryKey: ["admin", "owners", "pending"],
    queryFn: adminApi.fetchPendingOwners,
    staleTime: 30_000, // 30s before background refetch
  });

export const usePendingCars = () =>
  useQuery({
    queryKey: ["admin", "cars", "pending"],
    queryFn: adminApi.fetchPendingCars,
    staleTime: 30_000,
  });

export const useAllUsers = (params) =>
  useQuery({
    queryKey: ["admin", "users", params],
    queryFn: () => adminApi.fetchAllUsers(params),
  });

export const useRevenue = (params) =>
  useQuery({
    queryKey: ["admin", "revenue", params],
    queryFn: () => adminApi.fetchRevenue(params),
    staleTime: 60_000,
  });

export const useTransactions = (params) =>
  useQuery({
    queryKey: ["admin", "transactions", params],
    queryFn: () => adminApi.fetchTransactions(params),
  });

// ── Mutations (PATCH/POST) ────────────────────────────────

export const useApproveOwner = () => {
  const queryClient = useQueryClient();
  const setOwnerStatus = useAdminStore((s) => s.setOwnerStatus);

  return useMutation({
    mutationFn: adminApi.approveOwner,
    onMutate: (ownerId) => {
      // Optimistic update — UI reflects immediately
      setOwnerStatus(ownerId, "approved");
    },
    onSuccess: () => {
      // Refetch the list so badge counts update
      queryClient.invalidateQueries({ queryKey: ["admin", "owners"] });
    },
    onError: (_, ownerId) => {
      // Rollback optimistic update on failure
      setOwnerStatus(ownerId, "pending");
    },
  });
};

export const useRejectOwner = () => {
  const queryClient = useQueryClient();
  const setOwnerStatus = useAdminStore((s) => s.setOwnerStatus);

  return useMutation({
    mutationFn: adminApi.rejectOwner,
    onMutate: (id) => setOwnerStatus(id, "rejected"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin", "owners"] }),
    onError: (_, id) => setOwnerStatus(id, "pending"),
  });
};

export const useApproveCar = () => {
  const queryClient = useQueryClient();
  const setCarStatus = useAdminStore((s) => s.setCarStatus);

  return useMutation({
    mutationFn: adminApi.approveCar,
    onMutate: (id) => setCarStatus(id, "approved"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin", "cars"] }),
    onError: (_, id) => setCarStatus(id, "pending"),
  });
};

export const useRejectCar = () => {
  const queryClient = useQueryClient();
  const setCarStatus = useAdminStore((s) => s.setCarStatus);

  return useMutation({
    mutationFn: adminApi.rejectCar,
    onMutate: (id) => setCarStatus(id, "rejected"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin", "cars"] }),
    onError: (_, id) => setCarStatus(id, "pending"),
  });
};

export const useToggleBan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, isBanned }) =>
      isBanned ? adminApi.unbanUser(userId) : adminApi.banUser(userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });
};
