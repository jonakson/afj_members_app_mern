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
router.get("/mypayments", viewMyPayments);
router.get("/activities", viewPaymentsFromActivities);
router.delete("/activities", deletePaymentsFromActivities);
router.get("/memberships", viewPaymentsFromMemberships);
router.delete("/memberships", deletePaymentsFromMemberships);

module.exports = router;
