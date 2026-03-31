import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutBenefits from "../components/about/AboutBenefits";
import AboutStats from "../components/about/AboutStats";
import DownloadApp from "../components/about/DownloadApp";
import FAQ from "../components/about/FAQdata";
import BookingCTA from "../components/about/BookingCTA";
import Testimonials from "../components/about/Testimonials";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <AboutHero />
      <AboutStats />
      <AboutBenefits />
      <DownloadApp />
      <Testimonials />
      <FAQ />
      <BookingCTA />
      <Footer />
    </div>
  );
};

export default AboutUs;
