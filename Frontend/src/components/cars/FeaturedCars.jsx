import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cars } from "../../queries/car.queries";

const categories = ["All", "Sedan", "SUV", "Luxury", "Hatchback"];

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const FeaturedCars = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const filtered =
    activeCategory === "All"
      ? cars
      : cars.filter((c) => c.category === activeCategory);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4 2xl:px-20 mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-lime-900 text-sm font-semibold tracking-widest uppercase mb-2">
              Our Fleet
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Featured Cars
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Handpicked rides for every occasion — from city commutes to
              weekend escapes.
            </p>
          </div>
          <button
            onClick={() => navigate("/explore")}
            className="text-lime-900 font-semibold border-b-2 border-lime-900 pb-0.5 hover:opacity-70 transition-opacity self-start sm:self-auto whitespace-nowrap"
          >
            View All Cars →
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-lime-900 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-lime-900 hover:text-lime-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badge */}
                <span className="absolute top-3 left-3 bg-lime-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {car.badge}
                </span>
                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(car.id)}
                  className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:scale-110 transition-transform"
                >
                  <svg
                    className={`w-4 h-4 ${wishlist.includes(car.id) ? "text-red-500" : "text-gray-400"}`}
                    fill={wishlist.includes(car.id) ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {car.category}
                    </p>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      {car.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-lime-900 font-bold text-lg">
                      ₹{car.price}
                    </p>
                    <p className="text-xs text-gray-400">/day</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={car.rating} />
                  <span className="text-xs text-gray-500">
                    {car.rating} ({car.reviews})
                  </span>
                </div>

                {/* Specs */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {car.seats}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                      />
                    </svg>
                    {car.transmission}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    {car.fuel}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="w-full bg-lime-900 text-white py-2.5 rounded-xl font-medium text-sm hover:bg-lime-800 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
