const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Get All Payments
// @route   GET /api/v1/payments
// @access  Private
const viewAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json({
    message: "All Payments!",
  });
});

// TO DO: This methods is pending of implementation.

const viewMyPayments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "My Payments!",
  });
});

const createPayment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Create Payments",
  });
});

const updatePayment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Update Payment",
  });
});

const deletePayment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Delete Payment!",
  });
});

module.exports = {
  viewAllPayments,
  viewMyPayments,
  createPayment,
  updatePayment,
  deletePayment,
};
