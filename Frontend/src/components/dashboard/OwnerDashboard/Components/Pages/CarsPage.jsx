import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddCarModal from "../UI/AddCarModal";
import EditCarModal from "../UI/EditCarModal";
import CarCard from "../UI/CarCard";
import Loader from "../../../../../utils/Loader";

import VITE_API_URL from "../../../../../api"
const BASE_URL = VITE_API_URL;

const authHeader = () => ({
  Authorization: localStorage.getItem("token"),
});

const normalizeCar = (car) => ({
  id: car._id,
  name: car.carName,
  brand: car.brand,
  plate: car.plate_no,
  category: car.category,
  city: car.city,
  status: car.isAvailable ? "active" : "inactive",
  price: car.pricePerDay,
  trips: car.totalTrips ?? 0,
  rating: car.rating ?? 4.5,

  isAvailable: car.isAvailable,
  _raw: car,
});

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null); // stores raw API car
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState(null); // track which card is toggling
  const [deletingId, setDeletingId] = useState(null); // track which card is deleting

  // ─── Fetch ──────────────────────────────────────────────
  const fetchOwnerCars = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}car/ownerCars`, {
        headers: authHeader(),
      });
      if (data.success) {
        setCars(data.cars.map(normalizeCar));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load your vehicles");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOwnerCars();
  }, [fetchOwnerCars]);

  //Add car
  const handleAddCar = async (carData) => {
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${BASE_URL}car/addCar`, carData, {
        headers: authHeader(),
      });
      if (data.success) {
        toast.success("Car added successfully!");
        setIsModalOpen(false);
        fetchOwnerCars();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add car");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete car
  const handleDeleteCar = async (carId) => {
    if (!window.confirm("Are you sure you want to remove this vehicle?"))
      return;

    setDeletingId(carId);
    try {
      const { data } = await axios.delete(`${BASE_URL}car/deleteCar/${carId}`, {
        headers: authHeader(),
      });
      if (data.success) {
        toast.success("Vehicle removed successfully");
        // Remove instantly — no refetch needed
        setCars((prev) => prev.filter((c) => c.id !== carId));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete car");
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle status
  const handleToggleStatus = async (carId, currentIsAvailable) => {
    try {
      const { data } = await axios.patch(
        `${BASE_URL}car/updateStatus/${carId}`,
        { isAvailable: !currentIsAvailable },
        { headers: authHeader() },
      );

      console.log(data);

      if (data.success) {
        try {
          setIsLoading(true);
          fetchOwnerCars();
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Edit car
  const handleEditCar = async (updatedData) => {
    // Capture ID synchronously before any await
    const carId = selectedCar?._id;
    if (!carId) {
      toast.error("No car selected for editing");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        // ← changed post → put
        `${BASE_URL}car/updateCar/${carId}`,
        updatedData,
        { headers: authHeader() },
      );

      if (data.success) {
        toast.success("Car updated successfully!");
        setIsEditModalOpen(false);
        setSelectedCar(null); // ← clear after close

        // Update the car in local state directly — no full refetch
        const updated = normalizeCar(
          data.car ?? { ...selectedCar._raw, ...updatedData },
        );
        setCars((prev) => prev.map((c) => (c.id === carId ? updated : c)));
      }
    } catch (error) {
      console.error("Edit error:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit modal
  const openEditModal = (car) => {
    // Pass the raw API object so EditCarModal gets all original fields
    setSelectedCar(car._raw ?? car);
    setIsEditModalOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onDelete={() => handleDeleteCar(car.id)}
            onToggle={() => handleToggleStatus(car.id, car.isAvailable)} // ← pass boolean flag
            onEdit={() => openEditModal(car)}
            isDeleting={deletingId === car.id}
            isToggling={togglingId === car.id}
          />
        ))}

        {/* Add car card */}
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

      {/* Modals */}
      <AddCarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCar}
        isLoading={isSubmitting}
      />

      {selectedCar && (
        <EditCarModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCar(null); // ← always clear on close
          }}
          onSubmit={handleEditCar}
          initialData={selectedCar} // ← raw API object for form prefill
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default CarsPage;
