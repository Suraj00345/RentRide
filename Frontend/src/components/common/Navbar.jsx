import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { UserKey } from "lucide-react";
import Logo from "./Logo";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const user = username ? { name: username, role: role } : null;

  const [menuOpen, setMenuOpen] = useState(false);

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("email");

    toast.success("Logged out successfully");

    setMenuOpen(false);
    navigate("/login");
  };

  const navElements = [
    { name: "Home", path: "/" },
    { name: "Vehicles", path: "/vehicles" },
    { name: "Details", path: "/carDetails" },
    { name: "About Us", path: "/aboutUs" },
    { name: "Contact Us", path: "/contactUs" },
  ];

  const activeStyle = "text-lime-600 font-bold border-b-2 border-lime-600 pb-1";
  const idleStyle = "text-gray-700 hover:text-lime-700 transition-colors";

  return (
    <div className="py-4 absolute top-0 left-0 w-full z-10">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center">
        <Logo onClick={() => navigate("/")} />

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navElements.map((el) => (
            <NavLink
              key={el.path}
              to={el.path}
              className={({ isActive }) => (isActive ? activeStyle : idleStyle)}
            >
              {el.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-md text-lime-700 italic mr-2">
                Hey, {user.name.split(" ")[0]}!
              </span>

              {/* Dashboard Button */}
              <Link
                className="bg-lime-900 text-white px-6 py-2 rounded-full hover:bg-lime-800 transition shadow-md"
                to={`/${user.role}Dashboard`}
              >
                Dashboard
              </Link>

              {/* Creative Logout Button */}
              <button
                onClick={handleLogout}
                className="group flex items-center justify-center w-10 h-10 rounded-full border border-red-100 bg-red-50 text-gray-600 hover:bg-red-400 hover:text-white transition-all duration-300 shadow-sm"
                title="see you soon.."
              >
                <UserKey
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
            </div>
          ) : (
            <Link to="/register">
              <button className="bg-lime-900 text-white px-9 py-2 rounded-full hover:bg-lime-800 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-xl mt-2 px-6 flex flex-col gap-4 
                    text-gray-800 transform transition-all duration-300 ease-in-out ${
                      menuOpen
                        ? "max-h-screen opacity-100 py-6 translate-y-0"
                        : "max-h-0 opacity-0 -translate-y-2 overflow-hidden"
                    }`}
      >
        {navElements.map((el) => (
          <NavLink
            key={el.path}
            to={el.path}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `text-lg ${isActive ? "text-lime-600 font-bold" : "text-gray-700"}`
            }
          >
            {el.name}
          </NavLink>
        ))}

        <hr className="border-gray-100" />

        {user ? (
          <div className="flex flex-col gap-3">
            <Link
              to={`/${user.role}Dashboard`}
              className="text-lime-900 font-bold flex items-center justify-between"
              onClick={() => setMenuOpen(false)}
            >
              Go to Dashboard <span>→</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 font-medium py-2"
            >
              <UserKey size={18} /> Logout
            </button>
          </div>
        ) : (
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <button className="bg-lime-900 text-white px-6 py-2 rounded-full w-full">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
