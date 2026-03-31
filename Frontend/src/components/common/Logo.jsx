import React from "react";
import { Car } from "lucide-react"; // Using lucide-react for the icon
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate(); // ✅ Hook called at the top level
  return (
    <div onClick={()=>{navigate("/")}} className="flex items-center gap-2 group cursor-pointer">
      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-12 h-12 bg-lime-700 rounded-xl transition-all duration-300 group-hover:bg-emerald-700 shadow-lg border-2 border-amber-100">
        <Car className="text-white w-7 h-7" />
      </div>

      {/* Text Brand */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-2xl font-black tracking-tighter italic">
          <span className="text-gray-600">RENT</span>
          <span className="text-lime-700"> RIDE</span>
        </h1>
        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400">
          Car Rental Made Easy
        </p>
      </div>
    </div>
  );
};

export default Logo;
