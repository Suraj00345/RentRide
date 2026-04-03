import React, { useState } from "react";
import VehicleCard from "./VehicleCard";

export const CAR_DATA = [
  {
    id: 1,
    name: "Mercedes",
    type: "Sedan",
    price: 25,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-mercedes-1.png", // Replace with your actual asset paths
  },
  {
    id: 2,
    name: "Mercedes",
    type: "Sport",
    price: 50,
    transmission: "Manual",
    fuel: "PB 95",
    ac: true,
    category: "Cabriolet",
    image: "https://placeholder.com/car-mercedes-2.png",
  },
  {
    id: 3,
    name: "Mercedes",
    type: "Sedan",
    price: 45,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-mercedes-3.png",
  },
  {
    id: 4,
    name: "Porsche",
    type: "SUV",
    price: 40,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "SUV",
    image: "https://placeholder.com/car-porsche-1.png",
  },
  {
    id: 5,
    name: "Toyota",
    type: "Sedan",
    price: 35,
    transmission: "Manual",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-toyota-1.png",
  },
  {
    id: 6,
    name: "Porsche",
    type: "SUV",
    price: 50,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "SUV",
    image: "https://placeholder.com/car-porsche-2.png",
  },
  {
    id: 7,
    name: "Mercedes",
    type: "Van",
    price: 50,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Minivan",
    image: "https://placeholder.com/car-mercedes-van.png",
  },
  {
    id: 8,
    name: "Toyota",
    type: "Sport",
    price: 60,
    transmission: "Manual",
    fuel: "PB 95",
    ac: true,
    category: "Cabriolet",
    image: "https://placeholder.com/car-toyota-sport.png",
  },
  {
    id: 9,
    name: "Maybach",
    type: "Sedan",
    price: 70,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-maybach.png",
  },
  {
    id: 10,
    name: "Maybach",
    type: "Sedan",
    price: 70,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-maybach.png",
  },
  {
    id: 11,
    name: "Maybach",
    type: "Sedan",
    price: 70,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-maybach.png",
  },
  {
    id: 12,
    name: "Maybach",
    type: "Sedan",
    price: 70,
    transmission: "Automat",
    fuel: "PB 95",
    ac: true,
    category: "Sedan",
    image: "https://placeholder.com/car-maybach.png",
  },
];

const categories = [
  "All vehicles",
  "Sedan",
  "Cabriolet",
  "Pickup",
  "SUV",
  "Minivan",
];

const SelectVehicle = () => {
  const [activeTab, setActiveTab] = useState("All vehicles");

  const filteredCars =
    activeTab === "All vehicles"
      ? CAR_DATA
      : CAR_DATA.filter((car) => car.category === activeTab);

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-8xl mx-auto mt-15">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Select a vehicle group
        </h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === cat
                  ? "bg-lime-800 text-white shadow-lg shadow-green-200"
                  : "bg-white text-gray-600 hover:bg-green-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectVehicle;
