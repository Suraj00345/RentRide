// src/api/adminApi.js
import api from "./axiosInstance";

// Owners
export const fetchPendingOwners = () =>
  api.get("/admin/owners/pending").then((r) => r.data);
export const approveOwner = (ownerId) =>
  api.patch(`/admin/owners/${ownerId}/approve`).then((r) => r.data);
export const rejectOwner = (ownerId) =>
  api.patch(`/admin/owners/${ownerId}/reject`).then((r) => r.data);

// Cars
export const fetchPendingCars = () =>
  api.get("/admin/cars/pending").then((r) => r.data);
export const approveCar = (carId) =>
  api.patch(`/admin/cars/${carId}/approve`).then((r) => r.data);
export const rejectCar = (carId) =>
  api.patch(`/admin/cars/${carId}/reject`).then((r) => r.data);

// Users
export const fetchAllUsers = (params) =>
  api.get("/admin/users", { params }).then((r) => r.data);
export const banUser = (userId) =>
  api.patch(`/admin/users/${userId}/ban`).then((r) => r.data);
export const unbanUser = (userId) =>
  api.patch(`/admin/users/${userId}/unban`).then((r) => r.data);

// Revenue
export const fetchRevenue = (params) =>
  api.get("/admin/revenue", { params }).then((r) => r.data);
export const fetchTransactions = (params) =>
  api.get("/admin/transactions", { params }).then((r) => r.data);
