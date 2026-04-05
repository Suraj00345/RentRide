const VehicleCard = ({ car, onClick }) => {
  // 1. Extract the first image from the array or use a fallback
  const displayImage =
    car.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      {/* Image Container */}
      <div className="bg-gray-50 rounded-xl mb-4 flex justify-center p-4 h-40">
        <img
          src={displayImage}
          alt={car.carName}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {car.carName}
          </h3>
          <p className="text-sm text-gray-500 uppercase font-medium">
            {car.brand}
          </p>
        </div>
        <div className="text-right">
          <span className="text-green-600 font-bold text-xl">
            ₹{car.pricePerDay}
          </span>
          <p className="text-xs text-gray-400">/day</p>
        </div>
      </div>

      {/* Quick Specs - Using Optional Chaining to prevent crashes */}
      <div className="grid grid-cols-3 gap-1 mb-6 text-[9px] text-gray-600 uppercase font-bold">
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
          <span className="text-lg">⚙️</span>
          <span className="truncate w-full text-center">
            {car.description?.transmission || "Auto"}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
          <span className="text-lg">⛽</span>
          <span className="truncate w-full text-center">
            {car.description?.fuel || "Not mentioned"}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-lg">
          <span className="text-lg">❄️</span>
          <span className="truncate w-full text-center">
            {car.description?.Air_conditioner ? "AC" : "No AC"}
          </span>
        </div>
      </div>

      <button className="w-full bg-lime-800 hover:bg-lime-900 text-white font-semibold py-3 rounded-xl transition-all active:scale-95">
        View Details
      </button>
    </div>
  );
};

export default VehicleCard;
