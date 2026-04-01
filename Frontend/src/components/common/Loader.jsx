import React from 'react';

const RentRideLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative w-24 h-24">
        {/* The "Car" - A stylized lime green block/icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-16 h-8 bg-lime-500 rounded-lg shadow-lg animate-bounce">
            {/* Windows */}
            <div className="absolute top-1 right-2 w-4 h-3 bg-white/30 rounded-sm"></div>
            {/* Wheels */}
            <div className="absolute -bottom-1 left-2 w-3 h-3 bg-slate-800 rounded-full border-2 border-white animate-spin"></div>
            <div className="absolute -bottom-1 right-2 w-3 h-3 bg-slate-800 rounded-full border-2 border-white animate-spin"></div>
          </div>
        </div>

        {/* The Road - Animated dashed lines */}
        <div className="absolute bottom-4 left-0 w-full h-1 bg-slate-100 overflow-hidden rounded-full">
          <div className="flex w-[200%] animate-[slide_1s_linear_infinite]">
            <div className="w-full h-full border-t-2 border-dashed border-lime-400"></div>
            <div className="w-full h-full border-t-2 border-dashed border-lime-400"></div>
          </div>
        </div>
      </div>

      {/* Brand Text */}
      <h2 className="mt-6 text-2xl font-bold tracking-tighter text-gray-500">
        Rent<span className="text-lime-500">Ride</span>
      </h2>
      
      {/* Loading Text */}
      <p className="mt-2 text-sm font-medium text-slate-400 animate-pulse">
       Please Wait it's Loading...
      </p>

      {/* Custom Keyframes for the road animation */}
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default RentRideLoader;