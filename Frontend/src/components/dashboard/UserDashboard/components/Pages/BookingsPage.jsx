import { useState } from "react";
import StatusBadge from "../UI/StatusBadge";
import StarRating  from "../UI/StarRatting";
import { BOOKING_FILTERS } from "../../constants";

const BookingCard = ({ booking, onRate }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex flex-wrap items-start justify-between gap-4">
      {/* Car info */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
          {booking.carImage}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-bold text-gray-900">{booking.car}</h3>
            <span className="text-[11px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {booking.category}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">Owned by {booking.owner}</p>
          <p className="text-xs text-gray-400">{booking.plate} · {booking.location}</p>
        </div>
      </div>

      {/* Status */}
      <StatusBadge status={booking.status} withDot />
    </div>

    {/* Date + amount row */}
    <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-3">
      <div>
        <p className="text-[11px] text-gray-400 font-medium">From</p>
        <p className="text-xs font-semibold text-gray-900 mt-0.5">{booking.from}</p>
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-medium">To</p>
        <p className="text-xs font-semibold text-gray-900 mt-0.5">{booking.to}</p>
      </div>
      <div>
        <p className="text-[11px] text-gray-400 font-medium">Duration</p>
        <p className="text-xs font-semibold text-gray-900 mt-0.5">{booking.days} days</p>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
      <div>
        <p className="text-[11px] text-gray-400 font-medium">Total Paid</p>
        <p className="text-lg font-bold text-gray-900">₹{booking.amount.toLocaleString()}</p>
      </div>

      {/* Rating or actions */}
      {booking.status === "completed" && (
        <div className="flex items-center gap-3">
          {booking.rating ? (
            <div className="flex flex-col items-end gap-1">
              <p className="text-[11px] text-gray-400">Your rating</p>
              <StarRating value={booking.rating} readonly />
            </div>
          ) : (
            <div className="flex flex-col items-end gap-1">
              <p className="text-[11px] text-gray-400">Rate this trip</p>
              <StarRating value={0} onChange={(val) => onRate(booking.id, val)} />
            </div>
          )}
        </div>
      )}

      {booking.status === "upcoming" && (
        <div className="flex gap-2">
          <button className="text-xs font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
            View Details
          </button>
          <button className="text-xs font-semibold px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition">
            Cancel
          </button>
        </div>
      )}

      {booking.status === "cancelled" && (
        <button className="text-xs font-semibold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition">
          Book Again
        </button>
      )}
    </div>
  </div>
);

const BookingsPage = ({ bookings, onRate }) => {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  const countFor = (f) => bookings.filter((b) => b.status === f).length;

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
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                filter === f ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Booking cards */}
      <div className="space-y-4">
        {filtered.map((b) => (
          <BookingCard key={b.id} booking={b} onRate={onRate} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-3">🚗</p>
            <p className="text-sm font-semibold text-gray-600">No bookings found</p>
            <p className="text-xs text-gray-400 mt-1">Try a different filter or book a car</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;