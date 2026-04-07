import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import SpecCard from "./SpecCard";
import RentRideLoader from "../../utils/Loader";
import ErrorPage from "../../utils/ErrorPage";
import BookingModal from "../common/BookingModal";
import VITE_API_URL from "../../api"
const BASE_URL = VITE_API_URL;

const VehicleSpecs = () => {
  const { id } = useParams(); // Get ID from URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${BASE_URL}car/${id}`);
        if (data.success) {
          setCar(data.car);
          setMainImage(data.car.images?.[0] || "");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load vehicle");
      } finally {
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [id, BASE_URL]);

  if (loading) return <RentRideLoader />;
  if (error || !car) return <ErrorPage message={error} />;

  // Mapping your DB 'description' object to your existing 'specs' UI array
  const specs = [
    {
      label: "Gear Box",
      value: car.description?.transmission || "N/A",
      icon: "⚙️",
    },
    { label: "Fuel", value: car.description?.fuel || "N/A", icon: "⛽" },
    { label: "Seats", value: car.description?.seats || "N/A", icon: "💺" },
    {
      label: "AC",
      value: car.description?.Air_conditioner ? "Yes" : "No",
      icon: "❄️",
    },
    {
      label: "Air Bags",
      value: car.description?.Air_Bags || "N/A",
      icon: "🛡️",
    },
    { label: "ABS", value: car.description?.ABS ? "Yes" : "No", icon: "🛑" },
  ];

  // Features list for the checkboxes
  const features = [
    ...(car.description?.ABS ? ["ABS"] : []),
    ...(car.description?.Air_conditioner ? ["Air Conditioner"] : []),
    ...(car.description?.Cruise_Control ? ["Cruise Control"] : []),
    ...(car.description?.Automatic_window ? ["Automatic Window"] : []),
  ];

  return (
    <div className="w-screen mx-auto p-13 bg-white min-h-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-23 max-w-7xl mx-auto">
        {/* Left Column: Visuals */}
        <div>
          <div className="mb-6">
            <h1 className="text-4xl font-black text-gray-900 uppercase">
              {car.carName}
            </h1>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ₹{car.pricePerDay.toLocaleString()}{" "}
              <span className="text-sm text-gray-400 font-normal">/ day</span>
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 mb-6 h-[400px] flex items-center justify-center border border-gray-100">
            <img
              src={
                mainImage || "https://via.placeholder.com/600x400?text=No+Image"
              }
              alt="Car Preview"
              className="max-h-full object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {car.images?.map((img, i) => (
              <div
                key={i}
                onClick={() => setMainImage(img)}
                className={`w-24 h-20 bg-gray-50 rounded-xl overflow-hidden cursor-pointer border-2 transition-all shrink-0 ${
                  mainImage === img
                    ? "border-green-500 scale-95"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover"
                  alt={`thumb-${i}`}
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
              {specs.map((spec, index) => (
                <SpecCard key={index} {...spec} />
              ))}
            </div>
          </section>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-lime-800 hover:bg-lime-900 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 transition-all active:scale-[0.98]"
          >
            Rent the car
          </button>

          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Car Equipment
            </h3>
            <div className="grid grid-cols-2 gap-y-3">
              {features.length > 0 ? (
                features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-500 text-sm font-medium"
                  >
                    <CheckCircle2 size={18} className="text-green-500" />
                    {feature}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">
                  Standard features included
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
      {/* Booking Modal */}
      {isModalOpen && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          carId={id}
          pricePerDay={car.pricePerDay}
        />
      )}
    </div>
  );
};

export default VehicleSpecs;
