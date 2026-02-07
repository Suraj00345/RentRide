const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/User");

// Handle New User Registration
const Register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists to prevent duplicate accounts
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }

    // Create a new instance of the User model
    const userModel = new UserModel({ name, email, password, role });

    // Hash the password before saving (10 rounds of salt)
    userModel.password = await bcrypt.hash(password, 10);

    // Save the user to the database
    await userModel.save();

    res.status(201).json({
      message: "Signup successfully",
      success: true,
    });
  } catch (error) {
    // Catch unexpected database or server errors
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

//  Handle User Login & Token Generation
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their unique identifier (email)
    const user = await UserModel.findOne({ email }).select("+password");

    const authErrorMsg = "Authentication failed. Invalid credentials.";

    if (!user) {
      return res.status(403).json({
        message: authErrorMsg,
        success: false,
      });
    }

    // Compare the provided password with the hashed password in the DB
    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      return res.status(403).json({
        message: authErrorMsg,
        success: false,
      });
    }

    // Create a JWT (JSON Web Token)
    // We embed user details (payload) and sign it with a secret key
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }, // Token expires in 7 days
    );

    // Send the token and user info back to the client
    res.status(200).json({
      message: "Login successfully",
      success: true,
      jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  Register,
  Login,
};
