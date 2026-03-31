import React from "react";
import AppleStoreImg from "../../assets/AppleAppStore.png";
import GooglePlayImg from "../../assets/GAppStore.png";
import phoneImg from "../../assets/googleAppstorePhone.png";

const DownloadApp = () => {
  return (
    <div className="w-full flex justify-center  z-0 py-16 bg-white">
      <div className="relative flex justify-around h-100 w-[90%] max-w-6xl bg-gradient-to-r from-lime-600 to-green-800 rounded-2xl px-8 md:px-16 py-12 flex flex-col md:flex-row items-center overflow-hidden">
        {/* Background pattern (optional) */}
        <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-cover bg-center"></div>

        {/* Phone Image */}
        <div className="relative z-10 overflow-visible mb-8 md:mb-0 md:mr-10">
          <img
            src={phoneImg}
            alt="Phone"
            className="w-[140px] md:w-[180px] overflow-auto rounded-3xl drop-shadow-xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-white text-center md:text-left max-w-lg">
          <p className="uppercase text-xs tracking-widest text-gray-200 mb-2">
            Download Our App
          </p>

          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Download our app
          </h2>

          <p className="text-sm text-gray-200 mb-6 leading-relaxed">
            Turpis morbi enim nisi pulvinar leo dui tellus. Faucibus egestas
            semper diam rutrum dictum ut donec. Nisi nisi morbi vel in
            vulputate. Nulla nam eget urna fusce vulputate at risus.
          </p>

          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <img
              src={AppleStoreImg}
              alt="App Store"
              className="h-12 cursor-pointer hover:scale-105 transition"
            />
            <img
              src={GooglePlayImg}
              alt="Google Play"
              className="h-12 cursor-pointer hover:scale-105 transition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
