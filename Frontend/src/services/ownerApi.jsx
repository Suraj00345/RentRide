// src/api/ownerApi.js
import api from "./axiosInstance";

export const fetchOwnerCars = () => api.get("/owner/cars").then((r) => r.data);
export const fetchOwnerOrders = () =>
  api.get("/owner/orders").then((r) => r.data);
export const fetchOwnerEarnings = () =>
  api.get("/owner/earnings").then((r) => r.data);
export const confirmOrder = (orderId) =>
  api.patch(`/owner/orders/${orderId}/confirm`).then((r) => r.data);
export const cancelOrder = (orderId) =>
  api.patch(`/owner/orders/${orderId}/cancel`).then((r) => r.data);
export const addCar = (data) =>
  api.post("/owner/cars", data).then((r) => r.data);
export const updateCar = (id, data) =>
  api.put(`/owner/cars/${id}`, data).then((r) => r.data);
