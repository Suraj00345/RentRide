const mongoose = require("mongoose");
const Booking = require("../Models/Booking");
const Car = require("../Models/Car");

const getOwnerDashboard = async (req, res) => {
  try {
    const ownerId = req.userId;

    // Run 4 queries in parallel
    const [
      completedBookings,
      totalActiveCars,
      totalPendingOrders,
      recentBookings, // <--- New Query Result
    ] = await Promise.all([
      Booking.find({ ownerId, status: "completed" }),
      Car.countDocuments({ ownerId, isAvailable: "true" }),
      Booking.countDocuments({ ownerId, status: "pending" }),
      // Fetch 5 most recent bookings of any status
      Booking.find({ ownerId })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "firstname lastname")
        .populate("carId", "carName brand"), // Optional: show car details
    ]);

    const totalEarnings = completedBookings.reduce(
      (sum, b) => sum + b.totalPrice,
      0,
    );
    const totalBookings = completedBookings.length;

    // 📊 Monthly earnings calculation
    const monthly = {};
    completedBookings.forEach((b) => {
      const month = new Date(b.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthly[month] = (monthly[month] || 0) + b.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalEarnings,
      totalBookings,
      totalActiveCars,
      totalPendingOrders,
      recentBookings, // <--- Sent to frontend
      monthly,
    });
  } catch (error) {
    console.error("Owner Earnings Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch earnings",
    });
  }
};

const getUserDashboard = async (req, res) => {
  try {
    const userId = req.userId;

    // Run 3 queries in parallel
    const [allCompleted, upcomingTripsCount, recentCompleted] = await Promise.all([
      // 1. All completed (for totals & charts)
      Booking.find({ userId, status: "completed" }),
      
      // 2. Count of upcoming
      Booking.countDocuments({ userId, status: "confirmed" }),
      
      // 3. Just the 5 most recent completed (for the UI list)
      Booking.find({ userId, status: "completed" })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("carId", "carName brand") // Populate to show car names
    ]);

    // Calculate totals using the 'allCompleted' array
    const totalSpent = allCompleted.reduce((sum, b) => sum + b.totalPrice, 0);
    const totalBookingsCount = allCompleted.length;

    // 📊 Monthly breakdown (using allCompleted)
    const monthly = {};
    allCompleted.forEach((b) => {
      const month = new Date(b.createdAt).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      monthly[month] = (monthly[month] || 0) + b.totalPrice;
    });

    res.status(200).json({
      success: true,
      totalSpent,
      totalBookingsCount,
      totalUpcomingTrips: upcomingTripsCount,
      recentBookings: recentCompleted, // <--- The 5 recent ones
      monthly,
    });
  } catch (error) {
    console.error("User Expense Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expenses",
    });
  }
};

module.exports = { getOwnerDashboard, getUserDashboard };
