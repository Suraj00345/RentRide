import { useState } from "react";
import { X, Car, IndianRupee, Hash, MapPin, Loader2, Tag } from "lucide-react";
import RentRideLoader from "../../../../../utils/Loader";

const AddCarModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const initialState = {
    carName: "",
    brand: "",
    plate_no: "",
    category: "Sedan",
    city: "",
    pricePerDay: "",
  };

  const [formData, setFormData] = useState(initialState);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Passing the updated fields back to CarsPage
    onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl font-bold text-gray-900">Add New Vehicle</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Car Name */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Car Name
              </label>
              <div className="relative mt-1">
                <Car
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  name="carName"
                  value={formData.carName}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Toyota Camry"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Brand
              </label>
              <div className="relative mt-1">
                <Tag
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. Toyota"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Plate Number */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Plate Number
              </label>
              <div className="relative mt-1">
                <Hash
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  name="plate_no"
                  value={formData.plate_no || ""}
                  onChange={handleChange}
                  type="text"
                  placeholder="ABC-1234"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm appearance-none cursor-pointer"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                City
              </label>
              <div className="relative mt-1">
                <MapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. New York"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Price Per Day */}
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">
                Price Per Day
              </label>
              <div className="relative mt-1">
                <IndianRupee
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  required
                  name="pricePerDay"
                  value={formData.pricePerDay}
                  onChange={handleChange}
                  type="number"
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm font-bold"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:bg-green-400 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Adding...
                </>
              ) : (
                "List Car"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal;
