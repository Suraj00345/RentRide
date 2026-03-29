import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

import AppleStoreImg from "../../assets/AppleAppStore.png";
import GooglePlayImg from "../../assets/GAppStore.png";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 px-6 md:px-20 text-gray-800">
      <div className="mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo */}
          <Logo />

          {/* Address */}
          <div className="flex items-start gap-3">
            <MdLocationOn className="text-lime-700 mt-1" size={22} />
            <div>
              <p className="text-xs uppercase text-gray-500">Address</p>
              <p className="text-sm font-semibold">Kolkata, India</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3">
            <MdEmail className="text-lime-700 mt-1" size={22} />
            <div>
              <p className="text-xs uppercase text-gray-500">Email</p>
              <p className="text-sm font-semibold">support@rentride.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <MdPhone className="text-lime-700 mt-1" size={22} />
            <div>
              <p className="text-xs uppercase text-gray-500">Phone</p>
              <p className="text-sm font-semibold">+91 98765 43210</p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* About */}
          <div>
            <p className="text-sm leading-relaxed mb-4">
              RentRide makes car rental simple, fast, and reliable. Choose from
              thousands of cars near you and hit the road instantly.
            </p>

            <div className="flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="bg-lime-900 text-white p-2 rounded-full hover:scale-105 transition cursor-pointer"
                  >
                    <Icon size={14} />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-lime cursor-pointer">About</li>
              <li className="hover:text-lime cursor-pointer">Contact</li>
              <li className="hover:text-lime cursor-pointer">Blog</li>
              <li className="hover:text-lime cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Vehicles */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Vehicles</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Sedan</li>
              <li>SUV</li>
              <li>Luxury</li>
              <li>Electric</li>
            </ul>
          </div>

          {/* App Download */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Get the App</h4>

            <div className="space-y-3">
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

        {/* Bottom */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 RentRide. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-black cursor-pointer">Privacy</span>
            <span className="hover:text-black cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
