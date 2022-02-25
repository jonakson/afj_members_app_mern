const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the Token from Header
      token = req.headers.authorization.split(" ")[1];

      // Verify the Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get the Member from the Token
      req.member = await Member.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized.");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized - No Token.");
  }
});

module.exports = {
  protect,
};
