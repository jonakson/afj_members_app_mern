const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Member = require("../models/memberModel");
const Activity = require("../models/activityModel");
const Membership = require("../models/membershipModel");

// FIXME Improve Error Handling
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

// FIXME Improve Error Handling
// @desc    Get All Payments
// @route   GET /api/v1/payments
// @access  Private
const viewAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json({
    payments,
  });
});

// TODO deleteAllPayments
// @desc    Delete All Payments
// @route   DELETE /api/v1/payments
// @access  Private
const deleteAllPayments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All Payments deleted.",
  });
});

// TODO viewPayment
// @desc    Get a Payment
// @route   GET /api/v1/payments/:id
// @access  Private
const viewPayment = asyncHandler(async (req, res) => {
  const payments = await Payment.find();
  res.status(200).json({
    message: "Viewing a Payment.",
  });
});

// TODO updatePayment
// @desc    Get a Payment
// @route   PUT /api/v1/payments/:id
// @access  Private
const updatePayment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Updating a Payment",
  });
});

// TODO deletePayment
// @desc    Delete a Payment
// @route   DELETE /api/v1/payments/:id
// @access  Private
const deletePayment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Delete Payment!",
  });
});

// TODO viewMyPayments
// @desc    Get all my Payments
// @route   GET /api/v1/payments/mypayments
// @access  Private
const viewMyPayments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Viewing my Payments!",
  });
});

// TODO viewPaymentsFromActivities
// @desc    Get Payments from Activities
// @route   GET /api/v1/payments/activities
// @access  Private
const viewPaymentsFromActivities = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Viewing Payments made to Activities!",
  });
});

// TODO deletePaymentsFromActivities
// @desc    Delete all Payments from Activities
// @route   DELETE /api/v1/payments/activities
// @access  Private
const deletePaymentsFromActivities = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All Payments made to Activities deleted!",
  });
});

// TODO viewPaymentsFromMemberships
// @desc    Get Payments from Memberships
// @route   GET /api/v1/payments/memberships
// @access  Private
const viewPaymentsFromMemberships = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Viewing Payments made to Memberships!",
  });
});

// TODO deletePaymentsFromMemberships
// @desc    Delete all Payments from Activities
// @route   DELETE /api/v1/payments/memberships
// @access  Private
const deletePaymentsFromMemberships = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "All Payments made to Memberships deleted!",
  });
});

module.exports = {
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
};
