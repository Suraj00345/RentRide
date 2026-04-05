const express = require("express");
const router = express.Router();
const { createBooking, getUserBookings, getOwnerBookings, cancelBooking, confirmBooking, completeBooking } = require("../Controllers/booking.controller");
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");

//create bookings
router.post("/", ensureAuthenticated, roleMiddleware(["user"]), createBooking);

//user bookings
router.get("/user",ensureAuthenticated,roleMiddleware(["user"]),getUserBookings);

//Owner Bookings
router.get("/owner",ensureAuthenticated,roleMiddleware(["owner"]),getOwnerBookings);

//confirm booking
router.patch("/:id/confirm",ensureAuthenticated,roleMiddleware(["owner"]),confirmBooking);

//complete booking
router.patch("/:id/complete",ensureAuthenticated,roleMiddleware(["user"]),completeBooking);

//cancel booking
router.patch("/:id/cancel",ensureAuthenticated,cancelBooking);

module.exports = router;
