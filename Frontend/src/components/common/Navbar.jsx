import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const user = { name: "Suraj", role: "user" };
  const [menuOpen, setMenuOpen] = useState(false);

  const navElements = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Details", path: "/carDetails" },
    { name: "About Us", path: "/aboutUs" },
    { name: "Contact Us", path: "/contactUs" },
  ];

  return (
    <div className="py-4 absolute top-0 left-0 w-full z-10">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <Logo onClick={() => navigate("/")} />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navElements.map((el, i) => (
            <Link key={el.name ?? i} to={el.path}>
              {el.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-3">
              <Link
                className="bg-lime-900 text-white px-9 py-2 rounded-full"
                to={`/${user.role}Dashboard`}
              >
                Access Dashboard
              </Link>
              <p>||</p>
              <p>Hey {user.firstName} welcome!</p>
            </div>
          </>
        ) : (
          <Link to="/register">
            <div className="hidden md:flex">
              <button className="bg-lime-900 text-white px-9 py-2 rounded-full">
                Login
              </button>
            </div>
          </Link>
        )}

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Animated Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-md mt-2 px-6 py-4 flex flex-col gap-4 
                    text-gray-800 transform transition-all duration-300 ease-in-out ${
                      menuOpen
                        ? "max-h-96 opacity-100 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
                    }`}
      >
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Vehicles
        </Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Details
        </Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          About Us
        </Link>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Contact Us
        </Link>

        {user ? (
          <Link to="/CarDetails" onClick={() => setMenuOpen(false)}>
            CarDetails
          </Link>
        ) : (
          <button className="bg-lime-900 text-white px-6 py-2 rounded-full w-fit">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
