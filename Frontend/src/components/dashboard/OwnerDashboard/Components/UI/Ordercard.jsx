import React from "react";
import StatusBadge from "./StatusBadge";
import { Check, X, Calendar, MapPin, Clock, IndianRupee } from "lucide-react";

const OrderCard = ({ order, onAction, isActioning }) => {
  const car = order.carId || {};
  const customer = order.userId || {};

  const initials =
    `${customer.firstname?.[0] ?? ""}${customer.lastname?.[0] ?? ""}`.toUpperCase() ||
    "?";

  const fullName =
    [customer.firstname, customer.lastname].filter(Boolean).join(" ") ||
    "Unknown User";

  const carLabel =
    [car.brand, car.carName, car.plate_no].filter(Boolean).join(" • ") || "—";

  // Format dates nicely if they're ISO strings
  const fmt = (d) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return d;
    }
  };

  // 3. Calculate duration if not provided by backend
  const calculateDays = (start, end) => {
    const diffTime = Math.abs(new Date(end) - new Date(start));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };
  const duration = calculateDays(order.startDate, order.endDate);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
      {/* ── Top row ─────────────────────────────────── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        {/* Avatar + identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full bg-green-100 text-green-700 font-bold text-sm flex items-center justify-center shrink-0 select-none">
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-gray-900 truncate">
                {fullName}
              </p>
              <span className="text-[11px] text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded"></span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">{carLabel}</p>
          </div>
        </div>

        {/* Status badge */}
        <StatusBadge status={order.status} withDot />
      </div>

      {/* ── Meta row ────────────────────────────────── */}
      <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-3 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
            <Calendar size={10} /> Pickup
          </span>
          <p className="text-xs font-semibold text-gray-800">
            {fmt(order.startDate)}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
            <Calendar size={10} /> Return
          </span>
          <p className="text-xs font-semibold text-gray-800">
            {fmt(order.endDate)}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
            <Clock size={10} /> Duration
          </span>
          <p className="text-xs font-semibold text-gray-800">
            {duration} {duration === 1 ? "day" : "days"}
          </p>
        </div>
      </div>

      {/* ── Footer: amount + actions ─────────────────── */}
      <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
        {/* Total */}
        <div className="flex items-baseline gap-1">
          <IndianRupee size={14} className="text-gray-500 mb-0.5" />
          <p className="text-xl font-black text-green-700">
            {order.totalPrice?.toLocaleString("en-IN") ?? "—"}
          </p>
          <span className="text-xs text-gray-400 font-medium">total</span>
        </div>

        {/* Action buttons — only for pending */}
        {order.status === "pending" && (
          <div className="flex gap-2">
            <button
              onClick={() => onAction(order._id, "confirm")}
              disabled={isActioning}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 active:bg-green-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isActioning === "confirm" ? (
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Check size={13} />
              )}
              Confirm
            </button>

            <button
              onClick={() => onAction(order._id, "cancel")}
              disabled={isActioning}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isActioning === "cancel" ? (
                <span className="w-3 h-3 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
              ) : (
                <X size={13} />
              )}
              Cancel
            </button>
          </div>
        )}

        {/* Completed / cancelled label */}
        {order.status === "completed" && (
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
            <Check size={13} /> Completed
          </span>
        )}
        {order.status === "cancelled" && (
          <span className="flex items-center gap-1 text-xs font-semibold text-red-400">
            <X size={13} /> Cancelled
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
