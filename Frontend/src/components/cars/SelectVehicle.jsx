import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import axios from "axios";
import RentRideLoader from "../../utils/Loader";
import ErrorPage from "../../utils/ErrorPage";
import VITE_API_URL from "../../api"
const BASE_URL = VITE_API_URL;

console.log(BASE_URL);


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

// Standard categories to match your UI tabs
const categories = [
  "All vehicles",
  "Luxury",
  "Sedan",
  "Hatchback",
  "SUV",
  "Pickup",
  "Minivan",
];
const SelectVehicle = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All vehicles");
  const [cars, setCars] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/car`);

        if (response.data && response.data.cars) {
          setCars(response.data.cars);
          
        } else {
          setCars(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);

  // Handle Filtering
  const filteredCars =
    activeTab === "All vehicles"
      ? cars
      : cars.filter((car) => car.category === activeTab);

  if (loading) return <RentRideLoader />;
  if (error) return <ErrorPage />;

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
                  ? "bg-lime-800 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-green-50 border border-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Display */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <VehicleCard
                key={car._id}
                
                onClick={() => navigate(`/carDetails/${car._id}`)}
                car={{
                  ...car,
                  id: car._id,
                  name: car.carName,
                  image: car.images?.[0] || "https://via.placeholder.com/300x200?text=No+Image",
                  price: car.pricePerDay,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-medium">
            No vehicles found in the "{activeTab}" category.
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectVehicle;
