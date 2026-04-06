import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../UI/CarCard";

const FILTERS = ["all", "pending", "approved", "rejected"];
const BASE_URL = import.meta.env.VITE_API_URL;

const CarApprovalsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  // ─── Fetch Cars ─────────────────────────────
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${BASE_URL}dashboard/getCar`, {
        headers: { Authorization: token },
      });

      // ✅ FIXED RESPONSE
      setCars(res.data?.data?.cars || res.data?.cars || []);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // ─── Toggle Approve ─────────────────────────
  const handleToggleApprove = async (carId) => {
    try {
      await axios.patch(
        `${BASE_URL}dashboard/toggleApprovedCar/${carId}`,
        {},
        {
          headers: { Authorization: token },
        },
      );

      // ✅ OPTIMISTIC UPDATE
      setCars((prev) =>
        prev.map((c) =>
          c._id === carId
            ? {
                ...c,
                isApproved: !c.isApproved,
                isRejected: false, // optional
              }
            : c,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update car status.");
    }
  };

  // ─── Status mapping ─────────────────────────
  const getCarStatus = (car) => {
    if (car.isRejected) return "rejected";
    if (car.isApproved) return "approved";
    return "pending";
  };

  const filtered =
    filter === "all" ? cars : cars.filter((c) => getCarStatus(c) === filter);

  const countFor = (f) => cars.filter((c) => getCarStatus(c) === f).length;

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading car listings...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => {
          const count = f === "all" ? cars.length : countFor(f);

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${
                filter === f
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span
                className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  filter === f
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((car) => (
          <CarCard
            key={car._id}
            car={{
              id: car._id,
              name: car.carName,
              brand: car.brand,
              plate: car.plate_no,
              city: car.city,
              status: car.isApproved ? "active" : "inactive",
              firstname:car.ownerId.firstname,
              lastname:car.ownerId.lastname,
              price: car.pricePerDay,
              trips: car.totalTrips || 0,
              rating: car.rating || 4.5,
              date: car.createdAt,
              isApproved: car.isApproved,
              email:car.ownerId.email,
            }}
            onToggle={() => handleToggleApprove(car._id)}
          />
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-3xl mb-3">🚗</p>
            <p className="text-sm font-semibold text-gray-600">
              No cars found in this category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarApprovalsPage;
