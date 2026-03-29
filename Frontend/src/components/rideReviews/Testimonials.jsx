import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    trip: "Goa Weekend Trip",
    text: "Absolutely seamless experience. Booked a Honda CR-V for our Goa trip and the car was spotless. Pickup was on time and the staff was super helpful. Will definitely use RentRide again!",
  },
  {
    id: 2,
    name: "Priya Sharma",
    location: "Bangalore",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    trip: "Corporate Travel",
    text: "Used RentRide for a week-long business trip. The BMW was in pristine condition and made every meeting feel premium. The app is clean and booking took under 2 minutes.",
  },
  {
    id: 3,
    name: "Rohit Das",
    location: "Delhi",
    avatar: "https://i.pravatar.cc/150?img=15",
    rating: 4,
    trip: "Family Road Trip",
    text: "Rented the Toyota Innova for a hill station drive with family. Spacious, comfortable, and fuel-efficient. Great value for money compared to other services I have tried.",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    location: "Chennai",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    trip: "Airport Transfer",
    text: "Quick, reliable, and affordable. I use RentRide every time I travel for work. The no-surprise pricing is what keeps me coming back. Highly recommend!",
  },
  {
    id: 5,
    name: "Vikram Nair",
    location: "Pune",
    avatar: "https://i.pravatar.cc/150?img=18",
    rating: 5,
    trip: "Weekend Getaway",
    text: "The entire experience was fantastic from start to finish. Returning the car was just as easy as picking it up. RentRide has completely changed how I think about car rentals.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-4 h-4 ${s <= rating ? "text-yellow-400" : "text-gray-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-slide every 4s unless hovered
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((i) => (i + 1) % testimonials.length);

  // Show 3 cards on desktop centered on active
  const getVisible = () => {
    const indices = [];
    for (let offset = -1; offset <= 1; offset++) {
      indices.push(
        (active + offset + testimonials.length) % testimonials.length,
      );
    }
    return indices;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 2xl:px-20 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-lime-900 text-sm font-semibold tracking-widest uppercase mb-2">
            What Drivers Say
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Real Reviews from Real Riders
          </h2>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Thousands of happy customers across India trust RentRide for every
            journey.
          </p>

          {/* Stats row */}
          <div className="flex justify-center gap-10 mt-8">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "4.8★", label: "Average Rating" },
              { value: "500+", label: "Cars Available" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-lime-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-card carousel */}
        <div
          className="hidden md:flex items-center gap-6 justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Prev */}
          <button
            onClick={prev}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-lime-900 hover:text-lime-900 transition-colors"
          >
            ←
          </button>

          <div className="flex gap-5 overflow-hidden">
            {getVisible().map((idx, pos) => {
              const t = testimonials[idx];
              const isCenter = pos === 1;
              return (
                <div
                  key={t.id}
                  onClick={() => setActive(idx)}
                  className={`cursor-pointer rounded-2xl p-6 transition-all duration-500 flex-shrink-0 w-72 ${
                    isCenter
                      ? "bg-lime-900 text-white shadow-xl scale-105"
                      : "bg-gray-50 text-gray-700 opacity-70 hover:opacity-90"
                  }`}
                >
                  <StarRating rating={t.rating} />
                  <p
                    className={`mt-4 text-sm leading-relaxed line-clamp-4 ${isCenter ? "text-lime-100" : "text-gray-600"}`}
                  >
                    "{t.text}"
                  </p>
                  <div className="flex items-center gap-3 mt-5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p
                        className={`font-semibold text-sm ${isCenter ? "text-white" : "text-gray-800"}`}
                      >
                        {t.name}
                      </p>
                      <p
                        className={`text-xs ${isCenter ? "text-lime-300" : "text-gray-400"}`}
                      >
                        {t.location} · {t.trip}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="flex-shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-lime-900 hover:text-lime-900 transition-colors"
          >
            →
          </button>
        </div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <div className="bg-lime-900 text-white rounded-2xl p-6 shadow-lg">
            <StarRating rating={testimonials[active].rating} />
            <p className="mt-4 text-sm text-lime-100 leading-relaxed">
              "{testimonials[active].text}"
            </p>
            <div className="flex items-center gap-3 mt-5">
              <img
                src={testimonials[active].avatar}
                alt={testimonials[active].name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-sm text-white">
                  {testimonials[active].name}
                </p>
                <p className="text-xs text-lime-300">
                  {testimonials[active].location} · {testimonials[active].trip}
                </p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-6 h-2 bg-lime-900" : "w-2 h-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dots (desktop) */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? "w-6 h-2 bg-lime-900" : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
