const Booking = require("../Models/Booking");
const Car = require("../Models/Car");
const mongoose = require("mongoose");

//OWNER SIDE APIS---->>
const createCar = async (req, res) => {
  // console.log("userid",req.userId);

  try {
    const { carName, brand, plate_no, category, city, pricePerDay } = req.body;

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
      plate_no,
      category,
      city,
      pricePerDay,
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

const getOwnerCars = async (req, res) => {
  try {
    const ownerId = req.user?._id || req.userId;
    if (!ownerId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in request. Authentication failed.",
      });
    }
    console.log("Fetching cars for Owner ID 🐻⚙️:", ownerId);

    const cars = await Car.find({ ownerId: ownerId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (error) {
    console.error("Get owner cars error:", error.message);

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

const editCar = async (req, res) => {
  try {
    const { id } = req.params;
    const ownerId = req.user._id;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid car Id" });
    }

    // Find car and verify ownership
    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // Ensure ownerId comparison uses .toString() or .equals()
    if (car.ownerId.toString() !== ownerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own car",
      });
    }

    // 3. Define allowed top-level fields
    const allowedFields = [
      "carName",
      "brand",
      "plate_no",
      "category",
      "city",
      "pricePerDay",
      "images",
      "isAvailable",
    ];

    // Update top-level fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        car[field] = req.body[field];
      }
    });

    // 4. Handle Nested Description Object
    // We check if 'description' exists in the request body
    if (req.body.description && typeof req.body.description === "object") {
      const allowedDescriptionFields = [
        "ABS",
        "Cruise_Control",
        "Air_conditioner",
        "Automatic_window",
        "fuel",
        "transmission",
        "seats",
        "Air_Bags",
      ];

      allowedDescriptionFields.forEach((subField) => {
        if (req.body.description[subField] !== undefined) {
          // Update the nested field
          car.description[subField] = req.body.description[subField];
        }
      });
    }

    // 5. Save the car
    await car.save();

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      car,
    });
  } catch (error) {
    console.error("Edit Car Error:", error.message);
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

const toggleCarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({ success: false });
    }

    car.isAvailable = isAvailable;
    await car.save();

    res.json({
      success: true,
      car,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

//USER SIDE APIS---->>
const getCars = async (req, res) => {
  try {
    // 1. Destructure all possible query params
    const { brand, city, seats, pricePerDay } = req.query;

    // 2. Start with the base filter
    let filter = { isAvailable: true };

    // 3. Log req.query to see if data is actually arriving
    console.log("Incoming Query Params:", req.query);

    // 🔍 Brand (Partial search on carName)
    if (brand && brand !== "all") {
      filter.carName = { $regex: brand, $options: "i" };
    }

    // 📍 City
    if (city && city !== "all") {
      filter.city = { $regex: city, $options: "i" };
    }

    // 👥 Seats (IMPORTANT: Use dot notation for nested description)
    if (seats && seats !== "all") {
      filter["description.seats"] = { $gte: Number(seats) };
    }

    // 💰 Price
    if (pricePerDay && pricePerDay !== "all") {
      filter.pricePerDay = { $lte: Number(pricePerDay) };
    }

    // 4. CRITICAL: Log the final filter to your terminal
    console.log("Final MongoDB Filter:", JSON.stringify(filter, null, 2));

    const cars = await Car.find(filter)
      .populate("ownerId", "firstname lastname")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: cars.length,
      cars,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server Error" });
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
  toggleCarStatus,
  getOwnerCars,
  uploadCarImages,
};
