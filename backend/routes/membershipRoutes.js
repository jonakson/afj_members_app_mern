const express = require("express");
const router = express.Router();
const {
  createMembership,
  viewAllMemberships,
  deleteAllMemberships,
  viewMembership,
  updateMembership,
  deleteMembership,
  viewMembershipPayments,
  deleteMembershipPayments,
} = require("../controllers/membershipControler");

// FIXME Protect all routes.
router.post("/", createMembership);
router.get("/", viewAllMemberships);
router.delete("/", deleteAllMemberships);
router.get("/:id", viewMembership);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);
router.get("/:id/payments", viewMembershipPayments);
router.delete("/:id/payments", deleteMembershipPayments);

module.exports = router;
