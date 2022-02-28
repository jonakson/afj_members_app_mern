const express = require("express");
const router = express.Router();
const {
  registerMember,
  viewAllMembers,
  deleteAllMembers,
  viewMember,
  updateMember,
  deleteMember,
  loginMember,
  getMe,
  viewMemberPayments,
  deleteMemberPayments,
  viewMemberEnrolments,
  deleteMemberEnrolments,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMidelware");

router.post("/", registerMember);
router.get("/", viewAllMembers);
router.delete("/", deleteAllMembers);
router.get("/:id", viewMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);
router.post("/login", loginMember);
router.get("/me", protect, getMe);
router.get("/:id/payments", viewMemberPayments);
router.delete("/:id/payments", deleteMemberPayments);
router.get("/:id/enrolments", viewMemberEnrolments);
router.delete("/:id/enrolments", deleteMemberEnrolments);

module.exports = router;
