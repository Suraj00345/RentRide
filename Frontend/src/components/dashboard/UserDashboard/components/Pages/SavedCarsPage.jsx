import { savedCars } from "../../data";

const SavedCarCard = ({ car, onRemove }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl">
          {car.carImage}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{car.car}</h3>
          <p className="text-xs text-gray-400">{car.category} · {car.location}</p>
          <p className="text-xs text-gray-400">by {car.owner}</p>
        </div>
      </div>
      <button
        onClick={() => onRemove(car.id)}
        className="text-red-400 hover:text-red-600 transition text-lg leading-none"
        title="Remove from saved"
      >
        ♥
      </button>
    </div>

    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
      <div>
        <p className="text-[11px] text-gray-400 font-medium">Per Day</p>
        <p className="text-base font-bold text-gray-900">₹{car.price.toLocaleString()}</p>
      </div>
      <div className="text-right">
        <p className="text-[11px] text-gray-400 font-medium">Rating</p>
        <p className="text-sm font-bold text-green-600">⭐ {car.rating}</p>
      </div>
    </div>

    <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors">
      Book Now
    </button>
  </div>
);

const SavedCarsPage = ({ cars, onRemove }) => (
  <div>
    {cars.length === 0 ? (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
        <p className="text-3xl mb-3">♡</p>
        <p className="text-sm font-semibold text-gray-600">No saved cars yet</p>
        <p className="text-xs text-gray-400 mt-1">Browse and save cars you love</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cars.map((car) => (
          <SavedCarCard key={car.id} car={car} onRemove={onRemove} />
        ))}
      </div>
    )}
  </div>
);

export default SavedCarsPage;