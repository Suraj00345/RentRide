const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");
const {
  getOwnerDashboard,
  getUserDashboard,
} = require("../Controllers/dashboard.controller");

router.get(
  "/owner",
  ensureAuthenticated,
  roleMiddleware(["owner"]),
  getOwnerDashboard,
);

router.get(
  "/user",
  ensureAuthenticated,
  roleMiddleware(["user"]),
  getUserDashboard,
);

module.exports = router;
