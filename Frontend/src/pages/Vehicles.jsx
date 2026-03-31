import React from "react";
import Navbar from "../components/common/Navbar";
import SelectVehicle from "../components/cars/SelectVehicle";
import Footer from "../components/common/Footer";
import CarLogo from "../components/common/CarLogo";


const Vehicles = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <SelectVehicle />
      <CarLogo/>
      <Footer/>
    </div>
  );
};

export default Vehicles;
