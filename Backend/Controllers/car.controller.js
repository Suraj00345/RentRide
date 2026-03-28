const Booking = require("../Models/Booking");
const Car = require("../Models/Car");
const mongoose = require("mongoose");

//OWNER SIDE APIS---->>
const createCar = async (req, res) => {
  try {
    const { carName, brand, city, pricePerDay, description } = req.body;

    if (!carName || !brand || !city || !pricePerDay) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const car = await Car.create({
      ownerId: req.user._id,
      carName,
      brand,
      city,
      pricePerDay,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Car added successfully",
      car,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const uploadCarImages = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const imageUrls = req.files.map((file) => file.path);

    car.images.push(...imageUrls);
    await car.save();

    return res.status(200).json({
      success: true,
      message: "Images uploaded",
      images: car.images,
    });
  } catch (error) {
    console.error("Upload image error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getOwnerCar = async (req, res) => {
  try {
    const ownerId = req.user._id;

    const cars = (await Car.find({ ownerId })).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const editCar = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user._id;

    //validation id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car Id",
      });
    }

    //find car
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    //check ownership
    if (car.ownerId.toString() != ownerId) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own car",
      });
    }

    //update required fields
    const allowedFields = [
      "title",
      "carName",
      "brand",
      "city",
      "pricePerDay",
      "description",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      // Only update if the field is present in the request body
      if (req.body[field] !== undefined) {
        car[field] = req.body[field];
      }
    });

    // Save the car
    await car.save();

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      car,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user._id;
    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car ID",
      });
    }

    //Find car
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // Check Ownership
    if (car.ownerId.toString() !== ownerId) {
      return res.status(403).json({
        success: false,
        message: "you can only delete your own car",
      });
    }

    // check active bookings
    const activeBooking = await Booking.findOne({
      carId: id,
      status: { $in: ["pending", "confirmed"] },
    });

    if (activeBooking) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete car with active bookings",
      });
    }

    //delete car
    await Car.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//USER SIDE APIS---->>
const getCars = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;

    const filter = { isAvailable: true };
    if (city) {
      filter.city = city.toLowerCase();
    }

    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    const cars = await Car.find(filter)
      .populate("ownerId", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//Car details
const getCarDetails = async (req, res) => {
  try {
    const { id } = req.params;

    //validate Mongo ObjcetId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid car Id",
      });
    }

    const car = await Car.findById(id).populate("ownerId", "name email").lean();

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    return res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    console.error("Get car by ID error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createCar,
  getCars,
  getCarDetails,
  editCar,
  deleteCar,
  getOwnerCar,
  uploadCarImages
};
