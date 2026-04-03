import { Trash2 } from "lucide-react";
import { carStatusConfig } from "../../Constant/index";

const CarCard = ({ car, onDelete, onToggle }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl">
          {car.image || "🚗"}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">{car.name}</h3>
          <p className="text-xs text-gray-400">{car.plate}</p>
          <p className="text-xs text-gray-400">{car.category}</p>
        </div>
      </div>
      <span
        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${carStatusConfig[car.status].bg} ${carStatusConfig[car.status].text}`}
      >
        {carStatusConfig[car.status].label}
      </span>
    </div>

    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-50">
      <div className="text-center">
        <p className="text-[11px] text-gray-400 font-medium">Rate/Day</p>
        <p className="text-sm font-bold text-gray-900">
          ₹{car.price.toLocaleString()}
        </p>
      </div>
      <div className="text-center border-x border-gray-100">
        <p className="text-[11px] text-gray-400 font-medium">Trips</p>
        <p className="text-sm font-bold text-gray-900">{car.trips}</p>
      </div>
      <div className="text-center">
        <p className="text-[11px] text-gray-400 font-medium">Rating</p>
        <p className="text-sm font-bold text-green-600">⭐ {car.rating}</p>
      </div>
    </div>

    <div className="flex gap-2 mt-4">
      <button className="flex-1 text-xs font-semibold py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
        Edit
      </button>
      <button
        onClick={onToggle}
        className={`flex-[2] text-xs font-semibold py-2 rounded-xl transition ${car.status === "active" ? "bg-green-600 text-white hover:bg-green-700" : "bg-amber-100 text-amber-700 hover:bg-amber-200"}`}
      >
        {car.status === "active" ? "Mark Unavailable" : "Mark Available"}
      </button>
      <button
        onClick={onDelete}
        title="Delete Vehicle"
        className="flex-1 px-3 py-2 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition flex items-center justify-center"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
);

export default CarCard;
