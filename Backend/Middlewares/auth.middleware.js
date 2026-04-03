const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  console.log("🔥 roleMiddleware HIT");
  const auth = req.headers["authorization"];
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized,JWT token is require" });
  }

  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    // console.log(decoded);
    req.userId = decoded._id; // this is user id
    req.user = decoded; //this is the whole user
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized,JWT token wrong or expired" });
  }
};

module.exports = { ensureAuthenticated };
