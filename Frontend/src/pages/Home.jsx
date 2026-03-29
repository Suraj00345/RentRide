import React from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/common/Hero";
import FeaturedCars from "../components/cars/FeaturedCars";
import Testimonials from "../components/rideReviews/Testimonials";
import Footer from "../components/common/Footer";
import FeaturesSection from "../components/common/FeatureCard";
import FeatureCardBelow from "../components/common/FeatureCardBelow";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection/>
      <FeaturedCars />
      <FeatureCardBelow/>
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
