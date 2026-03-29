import { useRef, useState, useEffect } from "react";
import banner1 from "../../assets/bannerRentRide.png";
import banner2 from "../../assets/BannerRentRide2.png";
import banner3 from "../../assets/BannerRentRide3.png";
import { assets } from "../../assets/assets";

const Hero = () => {
  const banners = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
    personRef: "",
    dropRef: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const personRef = useRef(null);
  const dropRef = useRef(null);

  // 🔁 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
      personRef: personRef.current.value,
      dropRef: dropRef.current.value,
    });

    setIsSearched(true);

    console.log("Search:", titleRef.current.value, locationRef.current.value);
  };

  return (
    <div className="container 2xl:px-10 mx-auto pt-16 my-10">
      <div className="relative min-h-[60vh] md:min-h-[80vh] mx-2 rounded-xl overflow-hidden">
        {/* 🎯 Carousel Images */}
        {banners.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

        {/* 🌑 Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* 📦 Content */}
        <div className="relative z-20 flex items-center justify-center text-center h-full px-4 mt-60">
          <div className="w-full flex flex-col items-center mt-10">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-200">
              Experience the road like never before
            </h2>

            {/* Sub text */}
            <p className="mb-8 max-w-xl text-sm md:text-base font-light text-gray-100 px-4">
              Find your perfect ride — Over 10,000+ Cars to Rent. Browse
              thousands of cars available near you and hit the road today!
            </p>

            {/* 🔍 Search Box */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-stretch md:items-center bg-gray-200 rounded-xl text-gray-600 w-full max-w-4xl p-4">
              {/* Search */}
              <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r pr-2">
                <img
                  className="h-4 sm:h-5 ml-2"
                  src={assets.search_icon}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Search for a car"
                  className="text-sm p-2 outline-none w-full bg-transparent"
                  ref={titleRef}
                />
              </div>

              {/* Location */}
              <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r pr-2">
                <img
                  className="h-4 sm:h-5 ml-2"
                  src={assets.location_icon}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Pick-up location"
                  className="text-sm p-2 outline-none w-full bg-transparent"
                  ref={locationRef}
                />
              </div>

              {/* Persons */}
              <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r pr-2">
                <img
                  className="h-4 sm:h-5 ml-2"
                  src={assets.peoplePick_icon}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="No. of persons"
                  className="text-sm p-2 outline-none w-full bg-transparent"
                  ref={personRef}
                />
              </div>

              {/* Date */}
              <div className="flex items-center flex-1 pr-2">
                <img
                  className="h-4 sm:h-5 ml-2"
                  src={assets.date_search}
                  alt=""
                />
                <input
                  type="text"
                  placeholder="Drop-off date"
                  className="text-sm p-2 outline-none w-full bg-transparent"
                  ref={dropRef}
                />
              </div>

              {/* Button */}
              <button
                onClick={onSearch}
                className="bg-lime-900 hover:bg-lime-800 px-6 py-3 rounded-lg text-white w-full md:w-auto transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* ⚪ Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                current === index ? "bg-white scale-110" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
