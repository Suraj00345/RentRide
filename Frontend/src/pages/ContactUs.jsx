import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ContactHero from "../components/contactUs/contactHero";
import ContactForm from "../components/contactUs/ContactForm";
import InfoItem from "../components/contactUs/ConatctInfo";
import BlogGallery from "../components/contactUs/BlogGallery";
import CarLogo from "../components/common/CarLogo";

const ContactUs = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <ContactHero />
      <ContactForm />
      <InfoItem />
      <BlogGallery/>
      <CarLogo/>
      <Footer />
    </div>
  );
};

export default ContactUs;
