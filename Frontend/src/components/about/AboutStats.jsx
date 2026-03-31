import { Play } from "lucide-react";

const AboutStats = () => {
  const stats = [
    { label: "Happy customers", value: "20k+" },
    { label: "Count of cars", value: "540+" },
    { label: "Years of experience", value: "25+" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 mb-24">
      {/* Video Placeholder */}
      <div className="relative h-[400px] rounded-[32px] overflow-hidden bg-gray-200 group mb-16">
        <img
          src="/about-video-bg.jpg"
          className="w-full h-full object-cover blur-[2px]"
          alt="Video Background"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-200 transition-transform hover:scale-110 active:scale-95">
            <Play fill="currentColor" size={32} />
          </button>
        </div>
      </div>

      {/* Counter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {stats.map((stat, i) => (
          <div key={i}>
            <h4 className="text-6xl font-black text-green-600 mb-2">
              {stat.value}
            </h4>
            <p className="text-gray-900 font-bold uppercase tracking-wide text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutStats;
