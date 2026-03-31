import React from "react";
import BlurCar from "../../assets/BlurCar.png";

const BookingCTA = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-20">
      <div className="bg-gradient-to-r from-lime-600 to-green-800 rounded-[32px] relative overflow-hidden flex flex-col md:flex-row items-center p-10 md:p-16">
        {/* Tire Track Texture Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none grayscale invert mix-blend-overlay"
          style={{
            backgroundImage: 'url("/tire-pattern.png")',
            backgroundSize: "cover",
          }}
        ></div>

        {/* Content Side */}
        <div className="relative z-10 w-full md:w-1/2 text-white flex flex-col items-start">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Looking for a car?
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-green-100 mb-4">
            +537 547-6401
          </p>
          <p className="text-green-50 text-sm max-w-xs mb-8 opacity-80">
            Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
            bibendum ullamcorper in...
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-200">
            Book now
          </button>
        </div>

        {/* Image Side (Blurred car effect) */}
        <div className="relative z-10  w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={BlurCar}
            alt="RentRide Car"
            className="w-full h-50 max-w-md transform md:scale-125 object-contain pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

export default BookingCTA;
