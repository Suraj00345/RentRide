const Car = require("../Models/Car");

//this is a post api for owner only
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

//this is a get api(Public)
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

module.exports = {
  createCar,
  getCars,
};
