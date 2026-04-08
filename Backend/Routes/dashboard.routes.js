const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../Middlewares/auth.middleware");
const roleMiddleware = require("../Middlewares/role.middleware");
const {
  getOwnerDashboard,
  getUserDashboard,
  toogleApprovedOwner,
  toggleApprovedCar,
  toggleBanUser,
  getAdminOverview,
  getAllcar,
  getAllOwners,
  getAllUsers
} = require("../Controllers/dashboard.controller");

router.get("/owner",ensureAuthenticated, roleMiddleware(["owner"]), getOwnerDashboard);
router.get("/user",ensureAuthenticated, roleMiddleware(["user"]), getUserDashboard);
router.get("/admin", ensureAuthenticated, roleMiddleware(["admin"]), getAdminOverview);
router.get("/getOwners",ensureAuthenticated,roleMiddleware(["admin"]),getAllOwners);
router.get("/getCar",ensureAuthenticated,roleMiddleware(["admin"]),getAllcar);
router.get("/getUser",ensureAuthenticated,roleMiddleware(["admin"]),getAllUsers);
router.patch("/toggleApprove-owner/:userId", ensureAuthenticated, roleMiddleware(["admin"]),toogleApprovedOwner );
router.patch( "/toggleApprove-car/:carId", ensureAuthenticated, roleMiddleware(["admin"]), toggleApprovedCar);
router.patch("/toggle-ban/:userId",ensureAuthenticated, roleMiddleware(["admin"]), toggleBanUser);
 
module.exports = router;
