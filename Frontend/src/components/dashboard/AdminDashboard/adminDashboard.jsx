import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import TopBar from "./components/layout/TopBar";
import OverviewPage from "./components/Pages/OverviewPage";
import OwnerApprovalsPage from "./components/Pages/OwnerApprovalPage";
import CarApprovalsPage from "./components/Pages/CarApprovalsPage";
import ManageUsersPage from "./components/Pages/ManageUsersPage";
import RevenuePage from "./components/Pages/RevenuePage";
import TransactionsPage from "./components/Pages/TransactionsPage";
import PlaceholderPage from "./components/Pages/PlaceholderPage";
import {
  pendingOwners as initialOwners,
  pendingCars as initialCars,
  allUsers as initialUsers,
  revenueData,
} from "./data";

// ─── Derived platform stats ────────────────────────────────
const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
const totalCommission = revenueData.reduce((s, d) => s + d.commission, 0);
const totalBookings = revenueData.reduce((s, d) => s + d.bookings, 0);

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [owners, setOwners] = useState(initialOwners);
  const [cars, setCars] = useState(initialCars);
  const [users, setUsers] = useState(initialUsers);

  // ─── Approval handlers ──────────────────────────────────
  const handleOwnerApprove = (id) =>
    setOwners((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "approved" } : o)),
    );
  const handleOwnerReject = (id) =>
    setOwners((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "rejected" } : o)),
    );

  const handleCarApprove = (id) =>
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "approved" } : c)),
    );
  const handleCarReject = (id) =>
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "rejected" } : c)),
    );

  const handleToggleBan = (id) =>
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "banned" : "active" }
          : u,
      ),
    );

  // ─── Counts for sidebar badges ──────────────────────────
  const pendingOwnerCount = owners.filter((o) => o.status === "pending").length;
  const pendingCarCount = cars.filter((c) => c.status === "pending").length;
  const totalPending = pendingOwnerCount + pendingCarCount;

  const pendingCounts = {
    owners: pendingOwnerCount,
    cars: pendingCarCount,
  };

  // ─── Stats object for child pages ───────────────────────
  const stats = {
    totalRevenue,
    totalCommission,
    totalBookings,
    activeUsers: users.filter((u) => u.status === "active").length,
    activeCars: cars.filter((c) => c.status === "approved").length,
    activeOwners: owners.filter((o) => o.status === "approved").length,
    pendingOwners: pendingOwnerCount,
    pendingCars: pendingCarCount,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300`}
      >
        <Sidebar
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onClose={() => setSidebarOpen(false)}
          pendingCounts={pendingCounts}
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
          totalPending={totalPending}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {activeNav === "overview" && (
            <OverviewPage stats={stats} onNavigate={setActiveNav} />
          )}
          {activeNav === "owners" && (
            <OwnerApprovalsPage
              owners={owners}
              onApprove={handleOwnerApprove}
              onReject={handleOwnerReject}
            />
          )}
          {activeNav === "cars" && (
            <CarApprovalsPage
              cars={cars}
              onApprove={handleCarApprove}
              onReject={handleCarReject}
            />
          )}
          {activeNav === "users" && (
            <ManageUsersPage users={users} onToggleBan={handleToggleBan} />
          )}
          {activeNav === "revenue" && <RevenuePage stats={stats} />}
          {activeNav === "transactions" && <TransactionsPage />}
          {activeNav === "settings" && <PlaceholderPage page="settings" />}
        </main>
      </div>
    </div>
  );
}
