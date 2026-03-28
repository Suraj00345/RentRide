// src/hooks/useUserQueries.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userApi from "../Api/userApi";

// ─────────────────────────────────────────────
// QUERIES (GET)
// ─────────────────────────────────────────────

export const useMyBookings = (params) =>
  useQuery({
    queryKey: ["user", "bookings", params],
    queryFn:  () => userApi.fetchMyBookings(params),
    staleTime: 30_000,
  });

export const useSavedCars = () =>
  useQuery({
    queryKey: ["user", "saved-cars"],
    queryFn:  userApi.fetchSavedCars,
    staleTime: 60_000,
  });

export const useUserProfile = () =>
  useQuery({
    queryKey: ["user", "profile"],
    queryFn:  userApi.fetchUserProfile,
    staleTime: 5 * 60_000, // profile changes rarely, 5 min
  });

export const useBookingById = (bookingId) =>
  useQuery({
    queryKey: ["user", "bookings", bookingId],
    queryFn:  () => userApi.fetchBookingById(bookingId),
    enabled:  !!bookingId, // only runs if bookingId exists
  });

// ─────────────────────────────────────────────
// MUTATIONS (PATCH / POST / DELETE)
// ─────────────────────────────────────────────

export const useRateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, rating, review }) =>
      userApi.rateBooking(bookingId, { rating, review }),

    // Optimistic update — star rating reflects immediately
    onMutate: async ({ bookingId, rating }) => {
      // Cancel any in-flight refetches for this query
      await queryClient.cancelQueries({ queryKey: ["user", "bookings"] });

      // Snapshot previous value for rollback
      const previous = queryClient.getQueryData(["user", "bookings"]);

      // Apply optimistic update
      queryClient.setQueryData(["user", "bookings"], (old) =>
        old?.map((b) =>
          b.id === bookingId ? { ...b, rating } : b
        )
      );

      return { previous }; // returned as context
    },

    onError: (_err, _vars, context) => {
      // Rollback to snapshot on failure
      if (context?.previous) {
        queryClient.setQueryData(["user", "bookings"], context.previous);
      }
    },

    onSettled: () => {
      // Always refetch after mutation settles (success or error)
      queryClient.invalidateQueries({ queryKey: ["user", "bookings"] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookingId) => userApi.cancelBooking(bookingId),

    onMutate: async (bookingId) => {
      await queryClient.cancelQueries({ queryKey: ["user", "bookings"] });
      const previous = queryClient.getQueryData(["user", "bookings"]);

      queryClient.setQueryData(["user", "bookings"], (old) =>
        old?.map((b) =>
          b.id === bookingId ? { ...b, status: "cancelled" } : b
        )
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user", "bookings"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "bookings"] });
    },
  });
};

export const useRemoveSavedCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId) => userApi.removeSavedCar(carId),

    onMutate: async (carId) => {
      await queryClient.cancelQueries({ queryKey: ["user", "saved-cars"] });
      const previous = queryClient.getQueryData(["user", "saved-cars"]);

      // Instantly remove from list
      queryClient.setQueryData(["user", "saved-cars"], (old) =>
        old?.filter((c) => c.id !== carId)
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user", "saved-cars"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "saved-cars"] });
    },
  });
};

export const useSaveCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (carId) => userApi.saveCar(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "saved-cars"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileData) => userApi.updateUserProfile(profileData),

    onMutate: async (profileData) => {
      await queryClient.cancelQueries({ queryKey: ["user", "profile"] });
      const previous = queryClient.getQueryData(["user", "profile"]);

      queryClient.setQueryData(["user", "profile"], (old) => ({
        ...old,
        ...profileData,
      }));

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["user", "profile"], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};

export const useUploadLicence = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => userApi.uploadLicence(formData), // FormData with file
    onSuccess: () => {
      // Refetch profile so licence status updates
      queryClient.invalidateQueries({ queryKey: ["user", "profile"] });
    },
  });
};