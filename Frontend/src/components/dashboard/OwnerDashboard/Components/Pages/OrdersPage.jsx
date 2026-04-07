import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import OrderCard from "../UI/Ordercard";
import RentRideLoader from "../../../../../utils/Loader";
import { ORDER_FILTERS } from "../../Constant/index";

import VITE_API_URL from "../../../../../api";
const BASE_URL = VITE_API_URL;
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // --- 1. FETCH ORDERS (Bookings made on Owner's cars) ---
  const fetchOwnerOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/booking/owner`, {
        headers: { Authorization: token },
      });
      if (data.success) {
        setOrders(data.bookings);
        // console.log(data.bookings);
      }
    } catch (error) {
      toast.error("Failed to load rental requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerOrders();
  }, []);

  // --- 2. HANDLE ACTIONS (Accept/Cancel) ---
  const handleOrderAction = async (orderId, newStatus) => {
    const confirmMsg =
      newStatus === "confirm"
        ? "Accept this booking request?"
        : "Cancel this booking request?";

    if (!window.confirm(confirmMsg)) return;

    try {
      const { data } = await axios.patch(
        `${BASE_URL}booking/${orderId}/${newStatus}`,
        { status: newStatus },
        { headers: { Authorization: token } },
      );

      if (data.success) {
        toast.success(`Order ${newStatus} successfully!`);
        // Refresh list
        fetchOwnerOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Action failed");
    }
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  if (loading) return <RentRideLoader />;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {ORDER_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
              filter === f
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "pending" && pendingCount > 0 && (
              <span
                className={`ml-1.5 text-[10px] rounded-full px-1.5 py-0.5 ${
                  filter === "pending"
                    ? "bg-white/30 text-white"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {pendingCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Order cards */}
      <div className="space-y-3">
        {filtered.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            onAction={handleOrderAction}
          />
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-2">📋</p>
            <p className="text-sm font-semibold text-gray-600">
              No orders found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              New rental requests will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
