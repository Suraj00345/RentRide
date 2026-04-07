import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./components/dashboard/UserDashboard/userDashboard";
import OwnerDashboard from "./components/dashboard/OwnerDashboard/ownerDashboard";
import AdminDashboard from "./components/dashboard/AdminDashboard/adminDashboard";
import Vehicles from "./pages/Vehicles";
import CarDetails from "./pages/CarDetails";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/carDetails/:id" element={<CarDetails />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/userDashboard" element={<UserDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
        <Route path="/ownerDashboard" element={<OwnerDashboard />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
