const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");
const getMonthlyEarnings = require("../Controllers/dashboard.controller");

router.get(
  "/monthlyEarning",
  ensureAuthenticated,
  roleMiddleware(["owner"]),
  getMonthlyEarnings,
);
