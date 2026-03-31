import { Star, CheckCircle2, Quote } from "lucide-react";
import React from "react";
import Logo from "../common/Logo";

const AuthContent = () => {
  return (
    <div className="hidden lg:flex relative w-[70%] h-screen overflow-hidden bg-slate-950 p-16 flex-col justify-between">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* 1. Top Section: Logo */}
      <div className="relative z-10">
        <Logo className="h-8" />
      </div>

      {/* 2. Middle Section: Hero Text */}
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Over 10,000+ rides booked this month
        </div>

        <h2 className="text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Rent your next ride, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            entirely hassle-free.
          </span>
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Choose from thousands of premium cars. Book in under 60 seconds and hit the road with 24/7 concierge support.
        </p>

        {/* Feature List */}
        <ul className="space-y-4">
          {["Easy instant booking", "Zero hidden maintenance fees", "Flexible free cancellation"].map((item) => (
            <li key={item} className="flex items-center gap-3 text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Bottom Section: Testimonial Card */}
      <div className="relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl">
          <Quote className="w-8 h-8 text-emerald-500/40 mb-4" />
          <p className="text-slate-200 text-lg font-medium leading-snug mb-6">
            "The easiest car rental experience I've ever had. The app is intuitive and the cars are always in pristine condition."
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full ring-2 ring-emerald-500/20 overflow-hidden bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                MJ
              </div>
              <div>
                <p className="text-white font-semibold">Michael Jensen</p>
                <p className="text-slate-500 text-xs">Verified Traveler</p>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                ))}
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContent;