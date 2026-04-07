import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BookingCard from "../UI/BookingCard";
import RentRideLoader from "../../../../../utils/Loader";
import { BOOKING_FILTERS } from "../../constants/index";
import VITE_API_URL from "../../../../../api";
const BASE_URL = VITE_API_URL;

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getHeaders = () => ({
    headers: { Authorization: token },
  });

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      // FIXED: Use the helper to ensure Bearer token is sent
      const { data } = await axios.get(`${BASE_URL}booking/user`, getHeaders());
      if (data.success) {
        setBookings(data.bookings);
        // console.log(data.bookings);
      }
    } catch (error) {
      toast.error("Failed to load your bookings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMyBookings();
  }, []);

  // --- ACTIONS ---

  const handleRate = async (bookingId, rating) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}booking/rate/${bookingId}`,
        { rating },
        getHeaders(), // Consistent header usage
      );
      if (data.success) {
        toast.success("Thank you for your rating!");
        fetchMyBookings();
      }
    } catch (error) {
      toast.error("Failed to submit rating");
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;
    try {
      const { data } = await axios.patch(
        `${BASE_URL}booking/${bookingId}/cancel`,
        { status: "cancelled" },
        getHeaders(),
      );
      if (data.success) {
        toast.success("Booking cancelled successfully");
        fetchMyBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const handleComplete = async (bookingId) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}booking/${bookingId}/complete`,
        { status: "completed" },
        getHeaders(),
      );
      if (data.success) {
        toast.success("Booking cancelled successfully");
        fetchMyBookings();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to complete booking",
      );
    }
  };

  // --- FILTERING LOGIC ---
  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const countFor = (f) => bookings.filter((b) => b.status === f).length;

  if (loading) return <RentRideLoader />;

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {BOOKING_FILTERS.map((f) => {
          const count = f === "all" ? bookings.length : countFor(f);
          return (
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
              <span
                className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  filter === f
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Booking cards */}
      <div className="space-y-4">
        {filtered.map((b) => (
          <BookingCard
            key={b._id}
            booking={b}
            onRate={handleRate}
            onCancel={() => handleCancel(b._id)}
            onComplete={() => handleComplete(b._id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-3">🚗</p>
            <p className="text-sm font-semibold text-gray-600">
              No bookings found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Try a different filter or book a car
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
