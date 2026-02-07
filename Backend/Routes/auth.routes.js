const express = require("express");
const router = express.Router();
const { Register, Login } = require("../Controllers/auth.controller");
const {
  registerValidation,
  loginValidation,
} = require("../Middlewares/auth.validation.middleware");

router.post("/register", registerValidation, Register);
router.post("/login", loginValidation, Login);

module.exports = router;
