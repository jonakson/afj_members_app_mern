const express = require("express");
const router = express.Router();
const {
  viewAllMembers,
  registerMember,
  loginMember,
  getMe,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMidelware");

router.get("/", viewAllMembers);
router.get("/me", protect, getMe);
router.post("/", registerMember);
router.post("/login", loginMember);

module.exports = router;
