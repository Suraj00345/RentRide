const Booking = require("../Models/Booking");
const mongoose = require("mongoose");

const getMonthlyEarnings = async (req, res) => {
  try {
    const ownerId = new mongoose.Types.ObjectId(req.userId);

    const data = await Booking.aggregate([
      {
        $match: {
          ownerId,
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          earnings: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = getMonthlyEarnings;
