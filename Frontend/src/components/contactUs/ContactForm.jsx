import React from "react";
import { Calendar, ChevronDown } from "lucide-react";

const InputField = ({ label, icon: Icon, isSelect = false }) => (
  <div className="relative mb-3">
    <div className="flex items-center justify-between w-full bg-green-500/30 border border-green-400/20 text-white rounded-xl px-4 py-3 text-sm cursor-pointer hover:bg-green-500/40 transition-colors">
      <span className="opacity-80">{label}</span>
      {Icon && <Icon size={18} className="opacity-80" />}
    </div>
  </div>
);

const ContactForm = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Card */}
        <div className="bg-green-600 rounded-[32px] p-8 shadow-xl shadow-green-100 flex flex-col justify-center">
          <h2 className="text-2xl font-black text-white text-center mb-8">
            Book your car
          </h2>

          <div className="space-y-4">
            <InputField label="Car type" icon={ChevronDown} />
            <InputField label="Place of rental" icon={ChevronDown} />
            <InputField label="Place of return" icon={ChevronDown} />
            <InputField label="Rental date" icon={Calendar} />
            <InputField label="Return date" icon={Calendar} />
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl mt-6 transition-all shadow-lg shadow-orange-900/20 active:scale-95">
            Book now
          </button>
        </div>

        {/* Map / Image Side */}
        <div className="lg:col-span-2">
          <div className="h-full min-h-[400px] w-full bg-gray-100 rounded-[32px] overflow-hidden border border-gray-100 shadow-inner">
            <img
              src="/map-placeholder.jpg"
              className="w-full h-full object-cover blur-[1px] opacity-80"
              alt="Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
