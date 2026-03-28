import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const UserRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
  });

  const handleVisiblePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (field, value) => {
    if (field === "firstname" || field === "lastname") {
      setUserData((prev) => ({
        ...prev,
        fullname: { ...prev.fullname, [field]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();

    console.log(userData);

    setUserData({
      fullname: { firstname: "", lastname: "" },
      email: "",
      password: "",
    });

    toast.success("Registration successful!", { duration: 1500 });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div
      className="flex md:w-1/3 items-center justify-center bg-gradient-to-b from-[#4490cf]/35 via-white/30 to-[#c8f53f]/35
      px-6 py-12 md:px-12 lg:px-20"
    >
      <Toaster position="top-center" />
      <div className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_40px_rgba(0,0,0,0.10)]">
        <div className="inline-flex items-center gap-2 bg-[#f0f9e8] border border-[#293408] rounded-full px-3 py-1 mb-5">
          <div className="w-2 h-2 rounded-full bg-lime-900" />
          <span className="text-xs font-semibold text-[#4a7c10]">New User</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Your next ride is one signup away
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          Sign up to your account to continue
        </p>

        <form
          onSubmit={(e) => handleRegisterFormSubmit(e)}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={userData.fullname.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              placeholder="First Name"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={userData.fullname.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              placeholder="Last Name"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>

            {/* password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-slate-900 transition"
              />

              <button
                onClick={handleVisiblePassword}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4490cf] text-white rounded-lg py-2.5 text-sm font-semibold
                         hover:bg-slate-700 active:scale-95 transition mt-1"
          >
            Sign up
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>

        <Link to="/">
          <button
            className="w-full bg-lime-900 text-white rounded-lg py-2.5 text-sm font-semibold
                    hover:bg-slate-700 hover:text-white active:scale-95 transition mt-4"
          >
            Sign up as Owner
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserRegister;
