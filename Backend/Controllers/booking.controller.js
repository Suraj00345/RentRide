const mongoose = require("mongoose");
const Booking = require("../Models/Booking");
const Car = require("../Models/Car");

const createBooking = async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const userId = req.user._id;
    // console.log(userId);

    // validation
    if (!carId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "carId, startDate and endDate are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car ID",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();

    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    if (start < today) {
      return res.status(400).json({
        success: false,
        message: "Start date must be in the future",
      });
    }

    //Car validation
    const car = await Car.findById(carId);

    // console.log(car);

    if (!car || !car.isAvailable) {
      return res.status(404).json({
        success: false,
        message: "Car not available",
      });
    }

    // Prevent owner booking own car
    if (car.ownerId.toString() === userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot book your own car",
      });
    }

    //avalibility check
    const conflictingBooking = await Booking.findOne({
      carId,
      status: { $in: ["pending", "confirmed"] },
      startDate: { $lte: end },
      endDate: { $gte: start },
    });

    if (conflictingBooking) {
      return res.status(409).json({
        success: false,
        message: "Car already booked for selected dates",
      });
    }

    //price calculation
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const numberOfDays = Math.ceil((end - start) / millisecondsPerDay);

    const totalPrice = numberOfDays * car.pricePerDay;

    //create booking
    const booking = await Booking.create({
      userId,
      carId,
      ownerId: car.ownerId,
      startDate: start,
      endDate: end,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await Booking.find({ userId })
      .populate("carId", "carName brand city pricePerDay")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get user bookings error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getOwnerBookings = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const bookings = await Booking.find({ ownerId })
      .populate("carId", "carName brand city pricePerDay")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Get owner bookings error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getOwnerBookings,
};
