import { Trash2, Edit3, MapPin, Car } from "lucide-react";
import { carStatusConfig } from "../../Constant/index";

const CarCard = ({
  car,
  onDelete,
  onToggle,
  onEdit,
  isDeleting,
  isToggling,
}) => {
  const currentStatus = car.isAvailable ? "active" : "maintenance";

  const statusCfg =
    carStatusConfig[currentStatus] ?? carStatusConfig[currentStatus];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-all duration-200 group">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Car icon / image */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform duration-200">
            {car.image || "🚗"}
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate">
              {car.name}
            </h3>
            {car.brand && (
              <p className="text-xs text-gray-500 font-medium">{car.brand}</p>
            )}
            <div className="flex items-center gap-1 mt-0.5">
              <Car size={10} className="text-gray-300 shrink-0" />
              <p className="text-xs text-gray-400 truncate">{car.plate}</p>
            </div>
            {car.city && (
              <div className="flex items-center gap-1">
                <MapPin size={10} className="text-gray-300 shrink-0" />
                <p className="text-xs text-gray-400 truncate">{car.city}</p>
              </div>
            )}
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${statusCfg.bg} ${statusCfg.text}`}
        >
          {statusCfg.label}
        </span>
      </div>

      {/* ── Stats row ───────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-50">
        <div className="text-center">
          <p className="text-[11px] text-gray-400 font-medium">Rate/Day</p>
          <p className="text-sm font-bold text-gray-900">
            ₹{car.price?.toLocaleString() ?? "—"}
          </p>
        </div>
        <div className="text-center border-x border-gray-100">
          <p className="text-[11px] text-gray-400 font-medium">Trips</p>
          <p className="text-sm font-bold text-gray-900">{car.trips ?? 0}</p>
        </div>
        <div className="text-center">
          <p className="text-[11px] text-gray-400 font-medium">Rating</p>
          <p className="text-sm font-bold text-amber-500">
            ⭐ {car.rating ?? "—"}
          </p>
        </div>
      </div>

      {/* ── Actions ─────────────────────────────────── */}
      <div className="flex gap-2 mt-4">
        {/* Edit */}
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-150"
        >
          <Edit3 size={13} />
          Edit
        </button>

        {/* Toggle availability */}
        <button
          onClick={onToggle}
          disabled={isToggling}
          className={`flex-[2] text-xs font-semibold py-2.5 rounded-xl transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed ${
            car.status === "active"
              ? "bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
              : "bg-amber-100 text-amber-700 hover:bg-amber-200 active:bg-amber-300"
          }`}
        >
          {isToggling ? (
            <span className="flex items-center justify-center gap-1.5">
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Updating…
            </span>
          ) : car.status === "active" ? (
            "Mark Unavailable"
          ) : (
            "Mark Available"
          )}
        </button>

        {/* Delete */}
        <button
          onClick={onDelete}
          disabled={isDeleting}
          title="Delete vehicle"
          className="flex-1 px-3 py-2.5 rounded-xl border border-red-100 text-red-400 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all duration-150 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isDeleting ? (
            <span className="w-4 h-4 border-2 border-red-300 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>
    </div>
  );
};

export default CarCard;
