import { useState } from "react";
import Sidebar from "./components/layout/SideBar";
import TopBar from "./components/layout/TopBar";
import OverviewPage from "./components/Pages/OverviewPage";
import BookingsPage from "./components/Pages/BookingsPage";
import SavedCarsPage from "./components/Pages/SavedCarsPage";
import ProfilePage from "./components/Pages/ProfilePage";
import PlaceholderPage from "./components/Pages/PlaceHoldersPage";
import { bookingsData, savedCars as initialSaved, userProfile } from "./data";

export default function UserDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [bookings, setBookings] = useState(bookingsData);
  const [saved, setSaved] = useState(initialSaved);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Derived stats
  const stats = {
    total: bookings.length,
    completed: bookings.filter((b) => b.status === "completed").length,
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
    totalSpent: bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((s, b) => s + b.amount, 0),
  };

  const handleRate = (bookingId, rating) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, rating } : b)),
    );
  };

  const handleRemoveSaved = (carId) => {
    setSaved((prev) => prev.filter((c) => c.id !== carId));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onClose={() => setSidebarOpen(false)}
          user={userProfile}
        />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          activeNav={activeNav}
          onMenuOpen={() => setSidebarOpen(true)}
          userName={userProfile.name}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "overview" && (
            <OverviewPage onViewAllBookings={() => setActiveNav("bookings")} />
          )}
          {activeNav === "bookings" && (
            <BookingsPage bookings={bookings} onRate={handleRate} />
          )}
          {activeNav === "saved" && (
            <SavedCarsPage cars={saved} onRemove={handleRemoveSaved} />
          )}
          {activeNav === "profile" && <ProfilePage user={userProfile} />}
          {activeNav === "settings" && <PlaceholderPage page="settings" />}
        </main>
      </div>
    </div>
  );
}
