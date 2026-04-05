const express = require("express");
const router = express.Router();
const upload = require("./../Middlewares/upload.middleware");

const { 
  createCar, 
  getCars, 
  getCarDetails, 
  editCar, 
  deleteCar, 
  toggleCarStatus,
  getOwnerCars, 
  uploadCarImages 
} = require("../Controllers/car.controller");
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");

// Specific Static Routes First
router.get("/", getCars);
router.get("/ownerCars", ensureAuthenticated, roleMiddleware(["owner"]), getOwnerCars); // MOVED UP

// Dynamic Parameter Routes Last
router.get("/:id", getCarDetails); // Anything after this with /:id will be caught here

// Owner POST/PUT/DELETE routes
router.post("/addCar", ensureAuthenticated, roleMiddleware(["owner"]), createCar);
router.post("/:id/images", ensureAuthenticated, roleMiddleware(["owner"]), upload.array("images", 5), uploadCarImages);
router.post("/updateCar/:id", ensureAuthenticated, roleMiddleware(["owner"]), editCar);
router.delete("/deleteCar/:id", ensureAuthenticated, roleMiddleware(["owner"]), deleteCar);
router.patch("/updateStatus/:id",ensureAuthenticated,roleMiddleware(["owner"]),toggleCarStatus);

module.exports = router;