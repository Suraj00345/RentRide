import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Home, RotateCcw, Map } from "lucide-react";

const ErrorPage = ({ message = "We've hit a roadblock.", statusCode = "404" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Visual Element */}
      <div className="relative mb-8">
        <div className="text-[12rem] font-black text-gray-100 select-none leading-none">
          {statusCode}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-full shadow-2xl border-4 border-amber-500 animate-bounce">
            <AlertTriangle size={64} className="text-amber-500" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
          Looks like a Wrong Turn!
        </h2>
        <p className="text-gray-500 mb-8 font-medium">
          {message} The page you are looking for might have ran out of fuel or moved to a different garage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
          >
            <RotateCcw size={18} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-lime-800 text-white font-bold rounded-2xl hover:bg-lime-900 shadow-lg shadow-lime-200 transition-all active:scale-95"
          >
            <Home size={18} />
            Back to Showroom
          </button>
        </div>
      </div>

      {/* Decorative Road Lines */}
      <div className="mt-16 w-full max-w-lg flex justify-between px-10">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-2 w-12 bg-gray-200 rounded-full" />
        ))}
      </div>
    </div>
  );
};

export default ErrorPage;