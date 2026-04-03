import React from "react";
import { CAR_DATA } from "./SelectVehicle";
import VehicleCard from "./VehicleCard";
import { ArrowRight } from "lucide-react"; // For the View All icon

const OtherCars = () => {
  // We take the first 6 cars as recommendations
  const recommendedCars = CAR_DATA.slice(0, 6);

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-black text-gray-900">Other cars</h2>
          <button className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-green-600 transition-colors group">
            View All
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Modular Grid using our existing VehicleCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherCars;
