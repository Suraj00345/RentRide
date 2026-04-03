import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, ShieldCheck, Briefcase } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/authApi";

const UserLogin = () => {
  const navigate = useNavigate();

  // --- CONSOLIDATED STATE ---
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  // --- MUTATION ---
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      //  console.log(data);

      localStorage.setItem("token", data.jwtToken);
      localStorage.setItem(
        "username",
        `${data.user.firstname} ${data.user.lastname}`,
      );
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("email", data.user.email);
      toast.success("Login successful!", { duration: 1500 });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    onError: (error) => {
      const errorMsg = error?.response?.data?.message || "Login failed.";
      toast.error(errorMsg);
    },
  });

  // --- GENERIC INPUT HANDLER (CORRECTED) ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVisiblePassword = () => setShowPassword((prev) => !prev);

  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Please fill in all fields");
    }
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-[#4490cf]/35 via-white/30 to-[#c8f53f]/35 px-6 py-12 min-h-screen">
      <Toaster position="top-center" />
      <div className="w-full max-w-sm bg-white p-10 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.10)]">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-6">Sign in to your account</p>

        <form onSubmit={handleLoginFormSubmit} className="flex flex-col gap-4">
          {/* Role Selection */}
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 mb-2">
            {[
              { id: "user", label: "User", icon: User },
              { id: "owner", label: "Owner", icon: Briefcase },
              { id: "admin", label: "Admin", icon: ShieldCheck },
            ].map((r) => (
              <label
                key={r.id}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-1 rounded-lg cursor-pointer transition-all text-xs font-medium ${
                  formData.role === r.id
                    ? "bg-white text-[#4490cf] shadow-sm ring-1 ring-black/5"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="role"
                  value={r.id}
                  checked={formData.role === r.id}
                  onChange={handleChange} // Pass the event directly
                />
                <r.icon size={14} />
                {r.label}
              </label>
            ))}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange} // Pass the event directly
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#4490cf] outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange} // Pass the event directly
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#4490cf] outline-none transition"
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
            disabled={loginMutation.isPending}
            className="w-full bg-[#4490cf] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#3678ad] transition disabled:opacity-70 active:scale-95"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-slate-500 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
