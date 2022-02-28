const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Member = require("../models/memberModel");
const Activity = require("../models/activityModel");
const Membership = require("../models/membershipModel");

// @desc    Get All Payments
// @route   GET /api/v1/payments
// @access  Private
const viewAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json({
    payments,
  });
});

// @desc    Create new Payment
// @route   POST /api/v1/payments
// @access  Private
const createPayment = asyncHandler(async (req, res) => {
  // Take needed fields from the body request.
  const { member, paymentLinkedTo, paymentDate, comments } = req.body;

  //Check if all fields are filled.
  if (!member || !paymentLinkedTo || !paymentDate) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  //Check if Member exists.
  if (!(await Member.findById(member))) {
    res.status(400);
    throw new Error("Member doesn't exists.");
  }
  // check if Membership or Activity exists (Payment should be linked to anything).
  if (
    !(
      (await Activity.findById(paymentLinkedTo)) ||
      (await Membership.findById(paymentLinkedTo))
    )
  ) {
    res.status(400);
    throw new Error("The source (Membership or Activity) doesn't exists.");
  }

  // Set paymentLinkedToType
  let paymentLinkedToType;
  if (await Activity.findById(paymentLinkedTo)) {
    paymentLinkedToType = "ACTIVITY";
  } else if (await Membership.findById(paymentLinkedTo)) {
    paymentLinkedToType = "MEMBERSHIP";
  } else {
    res.status(400);
    throw new Error("Invalid tye of payment (not a activity or membership).");
  }
  // Create Activity.
  const payment = await Payment.create({
    member,
    paymentLinkedTo,
    paymentLinkedToType,
    paymentDate,
    comments,
  });

  // Check if the Payment was successfully created.
  if (payment) {
    res.status(201).json({
      _id: payment.id,
      member: payment.member,
      paymentLinkedTo: payment.paymentLinkedTo,
      paymentLinkedToType: payment.paymentLinkedToType,
      paymentDate: payment.paymentDate,
      comments: payment.comments,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Payment Data.");
  }
});

// TO DO: This methods is pending of implementation.

const viewMyPayments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "My Payments!",
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
