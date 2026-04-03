import { useState } from "react";
import TopBar from "../OwnerDashboard/Components/layout/TopBar";
import Sidebars from "../OwnerDashboard/Components/layout/SideBar";
import DashboardPage from "../OwnerDashboard/Components/Pages/DashboardPage";
import CarsPage from "../OwnerDashboard/components/Pages/CarsPage";
import OrdersPage from "../OwnerDashboard/components/pages/OrdersPage";
import EarningsPage from "../OwnerDashboard/components/pages/EarningsPage";
import PlaceholderPage from "../OwnerDashboard/components/pages/PlaceholderPage";
import { carsData, ordersData, earningsData } from "../OwnerDashboard/data";

const totalEarnings = earningsData.reduce((s, d) => s + d.earnings, 0);
const totalBookings = earningsData.reduce((s, d) => s + d.bookings, 0);

export default function OwnerDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [orders, setOrders] = useState(ordersData);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeCars = carsData.filter((c) => c.status === "active").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const handleOrderAction = (id, action) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: action === "confirm" ? "confirmed" : "cancelled" }
          : o,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebars
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onClose={() => setSidebarOpen(false)}
          pendingCount={pendingOrders}
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
        <TopBar activeNav={activeNav} onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "dashboard" && (
            <DashboardPage
              orders={orders}
              totalEarnings={totalEarnings}
              totalBookings={totalBookings}
              activeCars={activeCars}
              pendingOrders={pendingOrders}
              onViewAllOrders={() => setActiveNav("orders")}
            />
          )}
          {activeNav === "cars" && <CarsPage cars={carsData} />}
          {activeNav === "orders" && (
            <OrdersPage orders={orders} onOrderAction={handleOrderAction} />
          )}
          {activeNav === "earnings" && (
            <EarningsPage
              totalEarnings={totalEarnings}
              totalBookings={totalBookings}
            />
          )}
          {(activeNav === "reviews" || activeNav === "settings") && (
            <PlaceholderPage page={activeNav} />
          )}
        </main>
      </div>
    </div>
  );
}
