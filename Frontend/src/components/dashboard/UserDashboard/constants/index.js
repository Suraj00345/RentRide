export const bookingStatusConfig = {
  upcoming: {
    label: "Upcoming",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-400",
  },
  completed: {
    label: "Completed",
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
  ongoing: {
    label: "Ongoing",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
};

export const navItems = [
  { id: "overview",  label: "Overview",      icon: "⊞" },
  { id: "bookings",  label: "My Bookings",   icon: "📋" },
  { id: "saved",     label: "Saved Cars",    icon: "♥" },
  { id: "profile",   label: "Profile",       icon: "👤" },
  { id: "settings",  label: "Settings",      icon: "⚙" },
];

export const BOOKING_FILTERS = ["all", "pending", "completed", "cancelled"];

export const PAGE_TITLES = {
  overview: "My Overview",
  bookings: "My Bookings",
  saved:    "Saved Cars",
  profile:  "My Profile",
  settings: "Settings",
};