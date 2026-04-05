import React, { useState } from "react";
import { X, Calendar, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const BookingModal = ({ isOpen, onClose, carId, pricePerDay }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Assumes you use JWT

    if (!token) {
      return toast.error("Please login to book a car");
    }

    try {
      setIsSubmitting(true);
      const BASE_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${BASE_URL}booking`,
        { carId, startDate, endDate },
        { headers: { Authorization: token } },
      );

      if (response.data.success) {
        toast.success("Booking successful!");
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900">Book Your Ride</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-lime-700" /> Start Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Calendar size={16} className="text-lime-700" /> End Date
              </label>
              <input
                type="date"
                required
                min={startDate || new Date().toISOString().split("T")[0]}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-lime-500 outline-none"
              />
            </div>
          </div>

          <div className="bg-lime-50 p-4 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Rate:</span>
              <span className="font-bold text-gray-900">
                ₹{pricePerDay} / day
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-lime-800 hover:bg-lime-900 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Confirm Booking"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
