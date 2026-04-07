const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./Routes/auth.routes.js");
const carRoutes = require("./Routes/car.routes.js");
const bookingRoutes = require("./Routes/booking.routes.js");
const dashboardRoutes = require("./Routes/dashboard.routes.js");

const app = express();

//.env configuration
require("dotenv").config();

//connect DataBase
require("./Utils/db.js");

//PORT
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/auth", authRoutes);
app.use("/car", carRoutes);
app.use("/booking", bookingRoutes);
app.use("/dashboard", dashboardRoutes);

//Health Check
app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is Working...",
  });
});

//listening the port
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
