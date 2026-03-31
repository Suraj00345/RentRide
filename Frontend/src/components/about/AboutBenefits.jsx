import { CheckCircle2 } from 'lucide-react';

const AboutBenefits = () => {
  const benefits = [
    "Velit semper morbi. Purus non eu cursus porttitor tristique.",
    "Purus non eu cursus porttitor tristique et gravida.",
    "Aliquam adipiscing velit semper morbi. Purus non eu cursus.",
    "Quis nunc interdum gravida ullamcorper"
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1">
        <h2 className="text-4xl font-black text-gray-900 leading-tight mb-6">
          Unlock unforgettable memories on the road
        </h2>
        <p className="text-gray-400 text-sm mb-10 max-w-lg">
          Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {benefits.map((text, i) => (
            <div key={i} className="flex gap-3">
              <CheckCircle2 className="text-green-500 shrink-0" size={24} />
              <p className="text-[13px] text-gray-500 font-medium leading-tight">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full">
        <div className="aspect-[4/5] bg-gray-100 rounded-[40px] overflow-hidden">
          <img src="/about-side-img.jpg" className="w-full h-full object-cover" alt="Driving Experience" />
        </div>
      </div>
    </div>
  );
};

export default AboutBenefits;