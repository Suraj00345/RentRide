const mongoose = require("mongoose");
const Booking = require("../Models/Booking");
const Car = require("../Models/Car");
const User = require("../Models/User");

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
    const [allCompleted, upcomingTripsCount, recentCompleted] =
      await Promise.all([
        // 1. All completed (for totals & charts)
        Booking.find({ userId, status: "completed" }),

        // 2. Count of upcoming
        Booking.countDocuments({ userId, status: "confirmed" }),

        // 3. Just the 5 most recent completed (for the UI list)
        Booking.find({ userId, status: "completed" })
          .sort({ createdAt: -1 })
          .limit(5)
          .populate("carId", "carName brand"), // Populate to show car names
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

//admin dashbaord api
const toogleApprovedOwner = async (req, res) => {
  try {
    const { userId } = req.params;
    const owner = await User.findById(userId);

    if (!owner || owner.role !== "owner") {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    owner.isApproved = !owner.isApproved;
    await owner.save();

    res.status(200).json({
      success: true,
      isApproved: owner.isApproved,
      message: owner.isApproved
        ? "Owner approved successfully"
        : "Owner unapproved successfully",
    });
  } catch (error) {
    console.error("Approve Owner Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve owner",
    });
  }
};

const toggleApprovedCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    car.isApproved = !car.isApproved;
    await car.save();

    res.status(200).json({
      success: true,
      isApproved: car.isApproved,
      message: car.isApproved
        ? "Car approved successfully"
        : "Car unapproved successfully",
    });
  } catch (error) {
    console.error("Approve Car Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve car",
    });
  }
};

const toggleBanUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ❌ prevent banning admin
    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot ban admin",
      });
    }

    user.isBanned = user.isBanned === "banned" ? "NotBanned" : "banned";
    await user.save();

    res.status(200).json({
      success: true,
      message: user.isBanned
        ? "User banned successfully"
        : "User unbanned successfully",
      currentStatus: user.isBanned,
    });
  } catch (error) {
    console.error("Ban User Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};

const getAdminOverview = async (req, res) => {
  try {
    // ───────── BOOKINGS DATA ─────────
    const bookingStats = await Booking.aggregate([
      {
        $match: { status: "completed" },
      },
      {
        $facet: {
          totals: [
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
                totalBookings: { $sum: 1 },
              },
            },
          ],

          monthly: [
            {
              $group: {
                _id: {
                  month: {
                    $month: {
                      $toDate: "$createdAt", // ✅ FIX
                    },
                  },
                  year: {
                    $year: {
                      $toDate: "$createdAt", // ✅ FIX
                    },
                  },
                },
                revenue: { $sum: "$totalPrice" },
                bookings: { $sum: 1 },
              },
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
          ],
        },
      },
    ]);

    const totalRevenue = bookingStats[0].totals[0]?.totalRevenue || 0;
    const totalBookings = bookingStats[0].totals[0]?.totalBookings || 0;

    // ───────── USERS ─────────
    const activeUsers = await User.countDocuments({
      isBanned: false,
      role: { $in: ["user", "owner"] },
    });

    const activeOwners = await User.countDocuments({
      role: "owner",
      isApproved: true,
      isBanned: false,
    });

    const pendingOwners = await User.countDocuments({
      role: "owner",
      isApproved: false,
    });

    // ───────── CARS ─────────
    const activeCars = await Car.countDocuments({
      isApproved: true,
      isAvailable: true,
    });

    const pendingCars = await Car.countDocuments({
      isApproved: false,
    });

    // ───────── MONTHLY FORMAT ─────────
    const monthlyData = bookingStats[0].monthly.map((m) => {
      const monthName = new Date(m._id.year, m._id.month - 1).toLocaleString(
        "default",
        { month: "short" },
      );

      return {
        month: `${monthName} ${m._id.year}`,
        revenue: m.revenue,
        bookings: m.bookings,
        commission: Math.round(m.revenue * 0.1),
      };
    });

    // ───────── RECENT TRANSACTIONS ─────────
    const recentTransactions = await Booking.find({
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "firstname lastname")
      .populate("carId", "carName");

    // ───────── RESPONSE ─────────
    res.status(200).json({
      success: true,

      overview: {
        totalRevenue,
        totalCommission: Math.round(totalRevenue * 0.1),
        totalBookings,

        activeUsers,
        activeOwners,
        activeCars,

        pendingOwners,
        pendingCars,
      },

      monthly: monthlyData,

      recentTransactions,
    });
  } catch (error) {
    console.error("Admin Overview Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin overview",
    });
  }
};

const getAllcar = async (req, res) => {
  try {
    const { isApproved, isAvailable, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (isApproved !== undefined) {
      filter.isApproved = isApproved === "true";
    }

    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    const skip = (Number(page) - 1) * Number(limit);

    const cars = await Car.find(filter)
      .select("-description")
      .populate("ownerId", "firstname lastname email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Car.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        cars,
      },
    });
  } catch (error) {
    console.error("Get All Cars Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
    });
  }
};

const getAllOwners = async (req, res) => {
  try {
    const { isApproved, isBanned, page = 1, limit = 10 } = req.query;

    const matchStage = {
      role: "owner",
    };

    if (isApproved !== undefined) {
      matchStage.isApproved = isApproved === "true";
    }

    if (isBanned !== undefined) {
      matchStage.isBanned = isBanned === "true";
    }

    const skip = (Number(page) - 1) * Number(limit);

    const owners = await User.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "cars", // collection name in MongoDB
          localField: "_id",
          foreignField: "ownerId",
          as: "cars",
        },
      },

      // 📊 Count cars
      {
        $addFields: {
          totalCars: { $size: "$cars" },
        },
      },

      // 🎯 Select required fields
      {
        $project: {
          _id: 1,
          firstname: "$firstname",
          lastname: "$lastname",
          email: 1,
          phone_no: 1,
          city: 1,
          licence: "$license",
          ID: "$ID",
          totalCars: 1,
          isApproved: 1,
          isBanned: 1,

          // ✅ Joined Date
          joinedAt: "$createdAt",
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: Number(limit) },
    ]);

    const total = await User.countDocuments(matchStage);

    res.status(200).json({
      success: true,
      data: {
        total,
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        owners,
      },
    });
  } catch (error) {
    console.error("Get All Owners Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch owners",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["user", "owner"] } })
      .select("-password") // hide password
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getOwnerDashboard,
  getUserDashboard,
  toogleApprovedOwner,
  toggleApprovedCar,
  toggleBanUser,
  getAdminOverview,
  getAllcar,
  getAllOwners,
  getAllUsers,
};
