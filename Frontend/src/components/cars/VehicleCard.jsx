const VehicleCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="bg-gray-50 rounded-xl mb-4 flex justify-center p-4">
        <img src={car.image} alt={car.name} className="h-32 object-contain" />
      </div>

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
          <p className="text-sm text-gray-500">{car.type}</p>
        </div>
        <div className="text-right">
          <span className="text-green-600 font-bold text-xl">${car.price}</span>
          <p className="text-xs text-gray-400">per day</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-[10px] text-gray-600 uppercase font-semibold">
        <div className="flex items-center gap-1">
          <span className="p-1 bg-green-50 rounded text-green-700">⚙️</span>{" "}
          {car.transmission}
        </div>
        <div className="flex items-center gap-1">
          <span className="p-1 bg-green-50 rounded text-green-700">⛽</span>{" "}
          {car.fuel}
        </div>
        <div className="flex items-center gap-1">
          <span className="p-1 bg-green-50 rounded text-green-700">❄️</span> AC
        </div>
      </div>

      <button className="w-full bg-lime-800 hover:bg-green-700 text-white font-medium py-2.5 rounded-xl transition-colors">
        View Details
      </button>
    </div>
  );
};

export default VehicleCard;
