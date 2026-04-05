import React from "react";
import StatusBadge from "../UI/StatusBadge";
import StarRating from "../UI/StarRatting";

const BookingCard = ({ booking, onRate, onCancel, onComplete }) => {
  // Extraction from populated backend response
  const carData = booking.carId || {};
  const ownerData = booking.ownerId || {};

  // console.log(booking.carId);
  

  // Helper to format dates (e.g., "Apr 4, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate duration if not provided by backend
  const calculateDays = (start, end) => {
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Car info */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center overflow-hidden shrink-0">
            {carData.images && carData.images.length > 0 ? (
              <img
                src={carData.images[0]}
                alt={carData.carName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl">🚗</span>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-gray-900">
                {carData.carName}
              </h3>
              <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full uppercase">
                {carData.brand}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Owned by {ownerData.firstname} {ownerData.lastname}
            </p>
            <p className="text-xs text-gray-400 font-medium">
              {carData.plate_no} ·{" "}
              <span className="capitalize">{carData.city}</span>
            </p>
          </div>
        </div>

        {/* Status */}
        <StatusBadge status={booking.status} withDot />
      </div>

      {/* Date + amount row */}
      <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">From</p>
          <p className="text-xs font-semibold text-gray-900 mt-0.5">
            {formatDate(booking.startDate)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium">To</p>
          <p className="text-xs font-semibold text-gray-900 mt-0.5">
            {formatDate(booking.endDate)}
          </p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Duration</p>
          <p className="text-xs font-semibold text-gray-900 mt-0.5">
            {calculateDays(booking.startDate, booking.endDate)} Days
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">Total Paid</p>
          <p className="text-lg font-bold text-green-700">
            ₹{booking.totalPrice?.toLocaleString() || "0"}
          </p>
        </div>

        {/* Rating or actions */}
        <div className="flex items-center gap-3">
          {booking.status === "completed" && (
            <>
              {booking.rating ? (
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[11px] text-gray-400">Your rating</p>
                  <StarRating value={booking.rating} readonly />
                </div>
              ) : (
                <div className="flex flex-col items-end gap-1">
                  <p className="text-[11px] text-gray-400">Rate this trip</p>
                  <StarRating
                    value={0}
                    onChange={(val) => onRate(booking._id, val)}
                  />
                </div>
              )}
            </>
          )}
          {booking.status === "pending" && (
            <button
              onClick={onCancel}
              className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition"
            >
              Cancel
            </button>
          )}
          {booking.status === "confirmed" && (
            <div className="flex gap-2">
              <button
                onClick={onCancel}
                className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition"
              >
                Cancel
              </button>
              <button
                title="Mark as Completed"
                onClick={onComplete}
                className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-100 text-blue-500 hover:bg-green-50 transition"
              >
                Complete
              </button>
            </div>
          )}

          {booking.status === "cancelled" && (
            <button className="text-xs font-semibold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-sm">
              Book Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
