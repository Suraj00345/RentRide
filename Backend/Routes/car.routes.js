const express = require("express");
const router = express.Router();

const { createCar, getCars,getCarDetails } = require("../Controllers/car.controller");
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");

//public routes
router.get("/", getCars);
router.get("/:id", getCarDetails);

//Owner only routes
router.post("/addCar", ensureAuthenticated, roleMiddleware(["owner"]), createCar);


module.exports = router;
