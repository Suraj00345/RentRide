import React from "react";
import { CheckCircle2 } from "lucide-react";
import SpecCard from "./SpecCard";

const VehicleSpecs = ({ car }) => {
  // Mock data if 'car' prop is empty
  const details = car || {
    name: "BMW",
    price: 25,
    specs: [
      { label: "Gear Box", value: "Automatic", icon: "⚙️" },
      { label: "Fuel", value: "Petrol", icon: "⛽" },
      { label: "Doors", value: "2", icon: "🚪" },
      { label: "Air Conditioner", value: "Yes", icon: "❄️" },
      { label: "Seats", value: "5", icon: "💺" },
      { label: "Distance", value: "500", icon: "🛣️" },
    ],
    features: ["ABS", "Air Bags", "Cruise Control", "Air Conditioner"],
  };

  return (
    <div className="w-screen mx-auto p-6 bg-white min-h-screen ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-23 max-w-6xl mx-auto">
        {/* Left Column: Visuals */}
        <div>
          <div className="mb-6">
            <h1 className="text-4xl font-black text-gray-900">
              {details.name}
            </h1>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${details.price}{" "}
              <span className="text-sm text-gray-400 font-normal">/ day</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 mb-6 flex justify-center">
            <img
              src="/bmw-main.png"
              alt="Car Preview"
              className="w-full object-contain"
            />
          </div>

          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-24 h-20 bg-gray-200 rounded-xl overflow-hidden cursor-pointer hover:ring-2 ring-green-500 transition-all"
              >
                <img
                  src={`/thumb-${i}.png`}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100"
                  alt="thumb"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col gap-8">
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Technical Specification
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {details.specs.map((spec, index) => (
                <SpecCard key={index} {...spec} />
              ))}
            </div>
          </section>

          <button className="w-full bg-lime-800 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98]">
            Rent the car
          </button>

          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Car Equipment
            </h3>
            <div className="grid grid-cols-2 gap-y-3">
              {details.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-500 text-sm font-medium"
                >
                  <CheckCircle2 size={18} className="text-green-500" />
                  {feature}
                </div>
              ))}
              {/* Duplicate for visual symmetry as per your image */}
              {details.features.map((feature, index) => (
                <div
                  key={`dup-${index}`}
                  className="flex items-center gap-2 text-gray-500 text-sm font-medium"
                >
                  <CheckCircle2 size={18} className="text-green-500" />
                  {feature}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;
