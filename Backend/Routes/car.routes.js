const express = require("express");
const router = express.Router();
const upload = require("./../Middlewares/upload.middleware")

const { createCar, getCars,getCarDetails, editCar, deleteCar, getOwnerCar, uploadCarImages } = require("../Controllers/car.controller");
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");

//public routes
router.get("/", getCars);
router.get("/:id", getCarDetails);

//Owner only routes
router.post("/addCar", ensureAuthenticated, roleMiddleware(["owner"]), createCar);
router.post("/:id/images",ensureAuthenticated,roleMiddleware(["owner"]), upload.array("images",5),uploadCarImages)
router.get("/ownerCar", ensureAuthenticated, roleMiddleware(["owner"]), getOwnerCar);
router.post("/updateCar/:id", ensureAuthenticated, roleMiddleware(["owner"]), editCar);
router.delete("/deleteCar/:id", ensureAuthenticated, roleMiddleware(["owner"]), deleteCar);


module.exports = router;
