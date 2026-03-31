import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import VehicleSpecs from "../components/cars/VehicleSpecs";
import OtherCars from "../components/cars/OthersCar";

const CarDetails = () => {
  return (
    <>
      <Navbar />
      <VehicleSpecs />
      <OtherCars />
      <Footer />
    </>
  );
};

export default CarDetails;
