export const statusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-400",
  },
  completed: {
    label: "Completed",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
};

export const carStatusConfig = {
  active: { label: "Active", bg: "bg-green-100", text: "text-green-700" },
  maintenance: {
    label: "Maintenance",
    bg: "bg-amber-100",
    text: "text-amber-700",
  },
};

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "cars", label: "My Cars", icon: "🚗" },
  { id: "orders", label: "Orders", icon: "📋" },
  { id: "earnings", label: "Earnings", icon: "₹" },
  { id: "reviews", label: "Reviews", icon: "★" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

export const ORDER_FILTERS = [
  "all",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export const PAGE_TITLES = {
  dashboard: "Dashboard Overview",
  cars: "My Listed Cars",
  orders: "Rental Orders",
  earnings: "Earnings",
  reviews: "Reviews",
  settings: "Settings",
};
