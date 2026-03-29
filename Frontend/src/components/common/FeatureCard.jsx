import React from "react";
import { MapPin, Car, Wallet } from "lucide-react";
import GreenCar from "../../assets/greencar.jpg";

const FeaturesCard = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      {/* Top Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              Icon: MapPin,
              title: "Availability",
              text: "Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis",
            },
            {
              Icon: Car,
              title: "Comfort",
              text: "Gravida auctor fermentum morbi vulputate ac egestas orcietium convallis",
            },
            {
              Icon: Wallet,
              title: "Savings",
              text: "Pretium convallis id diam sed commodo vestibulum lobortis volutpat",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6"
            >
              <item.Icon size={48} strokeWidth={1.5} className="mb-4" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Content Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            {/* Replace with your <img> tag */}
            <img className="rounded-2xl h-145" src={GreenCar} alt="car image" />
          </div>

          {/* Right: Numbered List */}
          <div className="w-full lg:w-1/2 space-y-10">
            {[
              {
                title: "Erat at semper",
                text: "Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat.",
              },
              {
                title: "Urna nec vivamus risus duis arcu",
                text: "Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida.",
              },
              {
                title: "Lobortis euismod imperdiet tempus",
                text: "Viverra scelerisque mauris et nullam molestie et. Augue adipiscing praesent nisl cras nunc.",
              },
              {
                title: "Cras nulla aliquet nam eleifend amet et",
                text: "Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida.",
              },
              {
                title: "Cras nulla aliquet nam eleifend amet et",
                text: "Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                {/* Number Circle */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lime-700 flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </div>
                {/* Text Content */}
                <div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-lime-700 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesCard;
