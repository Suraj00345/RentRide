export const earningsData = [
  { month: "Jan", earnings: 12400, bookings: 8 },
  { month: "Feb", earnings: 9800,  bookings: 6 },
  { month: "Mar", earnings: 15600, bookings: 11 },
  { month: "Apr", earnings: 18200, bookings: 14 },
  { month: "May", earnings: 14100, bookings: 10 },
  { month: "Jun", earnings: 21300, bookings: 16 },
  { month: "Jul", earnings: 24800, bookings: 19 },
  { month: "Aug", earnings: 22500, bookings: 17 },
  { month: "Sep", earnings: 19700, bookings: 13 },
  { month: "Oct", earnings: 23100, bookings: 15 },
  { month: "Nov", earnings: 17400, bookings: 12 },
  { month: "Dec", earnings: 26900, bookings: 21 },
];

export const carsData = [
  { id: 1, name: "Toyota Camry 2023",   category: "Sedan", plate: "DL 01 AB 1234", price: 2800, status: "active",      rating: 4.8, trips: 47, image: "🚗" },
  { id: 2, name: "Mahindra Thar 2022",  category: "SUV",   plate: "MH 02 CD 5678", price: 3500, status: "active",      rating: 4.9, trips: 63, image: "🚙" },
  { id: 3, name: "Honda City 2023",     category: "Sedan", plate: "KA 03 EF 9012", price: 2200, status: "maintenance", rating: 4.6, trips: 35, image: "🚗" },
  { id: 4, name: "Hyundai Creta 2024",  category: "SUV",   plate: "TN 04 GH 3456", price: 3200, status: "active",      rating: 4.7, trips: 28, image: "🚙" },
];

export const ordersData = [
  { id: "ORD-2401", customer: "Arjun Sharma", avatar: "AS", car: "Toyota Camry 2023",  from: "Mar 28", to: "Mar 31", amount: 8400,  status: "pending",   days: 3 },
  { id: "ORD-2400", customer: "Priya Nair",   avatar: "PN", car: "Mahindra Thar 2022", from: "Mar 25", to: "Mar 28", amount: 10500, status: "confirmed", days: 3 },
  { id: "ORD-2399", customer: "Rahul Mehta",  avatar: "RM", car: "Hyundai Creta 2024", from: "Mar 22", to: "Mar 27", amount: 16000, status: "confirmed", days: 5 },
  { id: "ORD-2398", customer: "Sneha Reddy",  avatar: "SR", car: "Toyota Camry 2023",  from: "Mar 18", to: "Mar 20", amount: 5600,  status: "cancelled", days: 2 },
  { id: "ORD-2397", customer: "Karan Patel",  avatar: "KP", car: "Mahindra Thar 2022", from: "Mar 14", to: "Mar 19", amount: 17500, status: "completed", days: 5 },
  { id: "ORD-2396", customer: "Meera Iyer",   avatar: "MI", car: "Honda City 2023",    from: "Mar 10", to: "Mar 13", amount: 6600,  status: "completed", days: 3 },
];

export const payoutHistory = [
  { month: "December 2025",  amount: "₹24,210", date: "Jan 5, 2026",  status: "paid" },
  { month: "November 2025",  amount: "₹15,660", date: "Dec 5, 2025",  status: "paid" },
  { month: "October 2025",   amount: "₹20,790", date: "Nov 5, 2025",  status: "paid" },
  { month: "September 2025", amount: "₹17,730", date: "Oct 5, 2025",  status: "paid" },
];