import React from "react";
import AppleAPPStore from "../../assets/AppleAppStore.png";
import GAppStore from "../../assets/GAppStore.png";
import Phone from "../../assets/googleAppstorePhone.png";
import Vector from "../../assets/Vector.png";


const StatCard = ({ icon: Icon, value, label }) => (
  <div className="bg-white rounded-xl p-4 flex items-center gap-4 min-w-[200px] shadow-lg">
    <div className="bg-yellow-500 p-3 rounded-lg text-white">
      {/* Icon Placeholder - Replace with Lucide or Heroicons */}
      <div className="w-6 h-6 flex items-center justify-center">{Icon}</div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-gray-900 leading-tight">
        {value}
      </span>
      <span className="text-sm text-gray-500 font-medium">{label}</span>
    </div>
  </div>
);

const stats = [
  { value: "540+", label: "Cars", icon: "🚗" },
  { value: "20k+", label: "Customers", icon: "👤" },
  { value: "25+", label: "Years", icon: "📅" },
  { value: "20m+", label: "Miles", icon: "⏱️" },
];

const FeatureCardBelow = () => {
  return (
    <div>
      <section className="p-10 flex items-center justify-center">
        <div className="relative w-full max-w-7xl bg-lime-800 rounded-[2rem] p-12 overflow-hidden text-center">
          {/* Subtle Background Decoration (Simplified tire track effect) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute -bottom-10 -left-10 w-64 h-64 border-[20px] border-white rounded-full border-dashed rotate-12" />
          </div>
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Facts In Numbers
            </h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-12 text-sm md:text-base leading-relaxed">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
              bibendum ullamcorper in. Diam tincidunt tincidunt erat at semper
              fermentum.
            </p>

            {/* Cards Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- Download Section --- */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Download <br /> mobile app
          </h1>
          <p className="text-gray-500 max-w-md leading-relaxed">
            Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor cursus
            turpis nibh placerat massa. Fermentum urna ut at et in. Turpis
            aliquet cras hendrerit enim condimentum. Condimentum interdum risus
            bibendum urna.
          </p>
          <div className="flex gap-4">
            {/* Mock App Store Buttons */}
            <img src={AppleAPPStore} alt="" />
            <img src={GAppStore} alt="" />
          </div>
        </div>

        {/* Device Mockups */}
        <div className="flex mt-2">
          <img
            className="h-120 w-60 rounded-4xl animate-bounce"
            src={Phone}
            alt=""
          />
        </div>
      </section>

      {/* --- Hero / Search Section --- */}
      <section className="max-w-7xl mb-10 mx-auto bg-lime-800 rounded-3xl p-12 relative overflow-hidden">
        {/* Decorative Tire Tracks (Simulated) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 w-full h-full rotate-12 scale-150 border-y-[40px] border-dashed border-black" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1 space-y-8">
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              Enjoy every mile with <br /> adorable companionship.
            </h2>
            <p className="text-indigo-100 max-w-sm">
              Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
              bibendum ullamcorper in. Diam tincidunt tincidunt erat.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-2 rounded-full flex items-center max-w-md shadow-lg">
              <input
                type="text"
                placeholder="City"
                className="flex-grow px-6 py-2 outline-none text-gray-700 rounded-full"
              />
              <button className="bg-[#FFA500] hover:bg-orange-500 text-white px-8 py-3 rounded-full font-semibold transition">
                Search
              </button>
            </div>
          </div>

          {/* Car Illustration Placeholder */}
          <div className="flex flex-col gap-4 opacity-70">
            <div className="flex flex-col leading-tight">
              <h1 className="text-5xl font-black tracking-tighter italic">
                <span className="text-gray-500">RENT</span>
                <span className="text-lime-700"> RIDE</span>
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
                Car Rental Made Easy
              </p>
            </div>
            <img src={Vector} alt="" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureCardBelow;
