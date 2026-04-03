import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddCarModal from "../UI/AddCarModal";
import CarCard from "../UI/CarCard";
import Loader from "../../../../../utils/Loader";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use Vite's env helper or fallback to localhost
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  // --- 1. FETCH DATA FUNCTION ---
  const fetchOwnerCars = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}car/ownerCars`, {
        headers: { Authorization: token },
      });

      if (data.success) {
        setCars(data.cars);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load your vehicles");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  // --- 2. HANDLE ADD CAR (Updated to receive data from Modal) ---
  const handleAddCar = async (carData) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${BASE_URL}car/addCar`, carData, {
        headers: { Authorization: token },
      });

      if (data.success) {
        toast.success("Car added successfully!");
        setIsModalOpen(false);
        fetchOwnerCars(); // Refresh the list
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add car";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 3. DELETE THE CAR ---
  const handleDeleteCar = async (carId) => {
    // Confirm before deleting
    if (!window.confirm("Are you sure you want to remove this vehicle?"))
      return;

    try {
      const { data } = await axios.delete(`${BASE_URL}car/deleteCar/${carId}`, {
        headers: { Authorization: token },
      });

      if (data.success) {
        toast.success("Vehicle deleted successfully");
        // Update local state directly for instant UI response
        setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete car");
    }
  };

  // --- 4. TOGGLE CAR STATUS (Availability) ---
  const handleToggleStatus = async (carId, currentStatus) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}car/updateStatus/${carId}`,
        { isAvailable: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        toast.success("Status updated");
        fetchOwnerCars();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    <Loader />;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            car={{
              id: car._id,
              name: car.carName,
              brand: car.brand,
              category: car.category,
              plate: car.plate_no,
              category: car.city,
              status: car.isAvailable ? "active" : "inactive",
              price: car.pricePerDay,
              trips: car.totalTrips || 0,
              rating: car.rating || 4.5,
            }}
            onDelete={() => handleDeleteCar(car._id)}
            onToggle={() => handleToggleStatus(car._id, car.isAvailable)}
          />
        ))}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white rounded-2xl border-2 border-dashed border-green-200 p-5 flex flex-col items-center justify-center gap-3 hover:border-green-400 hover:bg-green-50/50 transition-all group min-h-[220px]"
        >
          <div className="w-14 h-14 rounded-2xl bg-green-100 group-hover:bg-green-200 flex items-center justify-center text-2xl transition">
            +
          </div>
          <div className="text-center">
            <p className="font-bold text-green-700 text-sm">Add New Car</p>
            <p className="text-xs text-gray-400 mt-0.5">
              List a new vehicle for rental
            </p>
          </div>
        </button>
      </div>

      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCar}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default CarsPage;
