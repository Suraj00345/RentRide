export const navItems = [
  { id: "overview",      label: "Overview",        icon: "⊞" },
  { id: "owners",        label: "Owner Approvals", icon: "👤" },
  { id: "cars",          label: "Car Approvals",   icon: "🚗" },
  { id: "users",         label: "Manage Users",    icon: "👥" },
  { id: "revenue",       label: "Revenue",         icon: "₹"  },
  { id: "transactions",  label: "Transactions",    icon: "💳" },
  { id: "settings",      label: "Settings",        icon: "⚙"  },
];

export const PAGE_TITLES = {
  overview:     "Admin Overview",
  owners:       "Owner Approvals",
  cars:         "Car Approvals",
  users:        "Manage Users",
  revenue:      "Revenue & Analytics",
  transactions: "Transactions",
  settings:     "Settings",
};

export const approvalStatusConfig = {
  pending: {
    label: "Pending",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Approved",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },
  rejected: {
    label: "Rejected",
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    dot: "bg-red-400",
  },
};

export const transactionStatusConfig = {
  completed: { label: "Completed", bg: "bg-green-50",  text: "text-green-700",  border: "border-green-200"  },
  refunded:  { label: "Refunded",  bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-200"  },
  pending:   { label: "Pending",   bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200"   },
  failed:    { label: "Failed",    bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200"    },
};

export const userRoleConfig = {
  user:  { label: "User",  bg: "bg-blue-50",  text: "text-blue-700"  },
  owner: { label: "Owner", bg: "bg-purple-50", text: "text-purple-700" },
  admin: { label: "Admin", bg: "bg-gray-100",  text: "text-gray-700"  },
};

export const userStatusConfig = {
  active: { label: "Active", bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  banned: { label: "Banned", bg: "bg-red-50",   text: "text-red-600",   dot: "bg-red-400"   },
};