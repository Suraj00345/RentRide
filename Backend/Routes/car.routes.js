const express = require("express");
const router = express.Router();

const { createCar, getCars } = require("../Controllers/car.controller");
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");

router.get("/cars", getCars);

router.post("/addCar", ensureAuthenticated, roleMiddleware(["owner"]), createCar);

module.exports = router;
