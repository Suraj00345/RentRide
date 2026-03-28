const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Utils/Cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "RentRide",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;