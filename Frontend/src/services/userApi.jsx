// src/api/userApi.js
import api from "./axiosInstance";

export const fetchMyBookings = () =>
  api.get("/user/bookings").then((r) => r.data);
export const fetchSavedCars = () =>
  api.get("/user/saved-cars").then((r) => r.data);
export const fetchUserProfile = () =>
  api.get("/user/profile").then((r) => r.data);
export const rateBooking = (id, data) =>
  api.patch(`/user/bookings/${id}/rate`, data).then((r) => r.data);
export const removeSavedCar = (carId) =>
  api.delete(`/user/saved-cars/${carId}`).then((r) => r.data);
export const cancelBooking = (id) =>
  api.patch(`/user/bookings/${id}/cancel`).then((r) => r.data);
