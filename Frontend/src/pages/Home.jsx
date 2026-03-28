import React from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/common/Hero";
import FeaturedCars from "../components/cars/FeaturedCars";
import Testimonials from "../components/rideReviews/Testimonials";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
