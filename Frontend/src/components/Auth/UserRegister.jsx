import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, ShieldCheck, Briefcase } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/authApi";

const UserRegister = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user",
  });

  // --- MUTATION ---
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Logic inside onSuccess only runs if the API call is successful
      toast.success("Registration successful!");

      // Clear form on success
      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        role: "user",
      });

      // Navigate after a short delay so user sees the success toast
      setTimeout(() => navigate("/login"), 1500);
    },
    onError: (error) => {
      // Error handling: pulls message from backend or defaults to generic string
      const errorMsg =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);
    },
  });

  // --- HANDLERS ---
  const handleVisiblePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegisterFormSubmit = (e) => {
    e.preventDefault();

    registerMutation.mutate(userData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#4490cf]/35 via-white/30 to-[#c8f53f]/35 px-6 py-12 md:px-12 lg:px-20">
      <Toaster position="top-center" />
      <div className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_20px_40px_rgba(0,0,0,0.10)]">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 bg-[#f0f9e8] border border-[#293408] rounded-full px-3 py-1 mb-5">
          <div className="w-2 h-2 rounded-full bg-lime-900" />
          <span className="text-xs font-semibold text-[#4a7c10]">
            Join Us Today
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Your next ride is one signup away
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Create your account to get started
        </p>

        <form
          onSubmit={handleRegisterFormSubmit}
          className="flex flex-col gap-4"
        >
          {/* Role Selection Segmented Control */}
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 mb-2">
            {[
              { id: "user", label: "User", icon: User },
              { id: "owner", label: "Owner", icon: Briefcase },
              { id: "admin", label: "Admin", icon: ShieldCheck },
            ].map((r) => (
              <label
                key={r.id}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-1 rounded-lg cursor-pointer transition-all text-xs font-medium ${
                  userData.role === r.id
                    ? "bg-white text-[#4490cf] shadow-sm ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="role"
                  value={r.id}
                  checked={userData.role === r.id}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
                <r.icon size={14} />
                {r.label}
              </label>
            ))}
          </div>

          {/* First & Last Name Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                First Name
              </label>
              <input
                required
                type="text"
                value={userData.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                placeholder="John"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4490cf] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Last Name
              </label>
              <input
                required
                type="text"
                value={userData.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                placeholder="Doe"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4490cf] transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              required
              type="email"
              value={userData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4490cf] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={userData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4490cf] transition"
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full bg-[#4490cf] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#3678ad] active:scale-95 transition mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending
              ? "Creating Account..."
              : `Create ${userData.role.charAt(0).toUpperCase() + userData.role.slice(1)} Account`}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
