const express = require("express");
const router = express.Router();
const {
  createPayment,
  viewAllPayments,
  deleteAllPayments,
  viewPayment,
  updatePayment,
  deletePayment,
  viewMyPayments,
  viewPaymentsFromActivities,
  deletePaymentsFromActivities,
  viewPaymentsFromMemberships,
  deletePaymentsFromMemberships,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMidelware");

// FIXME Protect all routes.
router.post("/", createPayment);
router.get("/", viewAllPayments);
router.delete("/", deleteAllPayments);
router.get("/:id", viewPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);
router.get("/profile/mypayments", protect, viewMyPayments);
router.get("/type/activities", viewPaymentsFromActivities);
router.delete("/type/activities", deletePaymentsFromActivities);
router.get("/type/memberships", viewPaymentsFromMemberships);
router.delete("/type/memberships", deletePaymentsFromMemberships);

module.exports = router;
