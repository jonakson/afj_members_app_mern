const express = require("express");
const router = express.Router();
const {
  viewAllPayments,
  viewMyPayments,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMidelware");

router.get("/", viewAllPayments);
router.get("/mypayments", protect, viewMyPayments);
router.post("/", createPayment);
router.put("/:id", updatePayment);
router.delete("/:id", deletePayment);

module.exports = router;
