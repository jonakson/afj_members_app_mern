const asyncHandler = require("express-async-handler");
const Payment = require("../models/paymentModel");
const Member = require("../models/memberModel");
const Activity = require("../models/activityModel");
const Membership = require("../models/membershipModel");
const Enrolment = require("../models/enrolmentModel");

// @desc    Create new Payment
// @route   POST /api/v1/payments
// @access  Private
const createPayment = asyncHandler(async (req, res) => {
  try {
    // Take needed fields from the body request.
    const { member, paymentLinkedTo, paymentDate, comments } = req.body;

    //Check if all fields are filled.
    if (!member || !paymentLinkedTo || !paymentDate) {
      res.status(400);
      throw new Error("Please add all fields.");
    }

    //Check if Member exists.
    if (!(await Member.findById(member))) {
      res.status(404);
      throw new Error("Member doesn't exists.");
    }
    // check if Membership or Activity exists (Payment should be linked to anything).
    if (
      !(
        (await Activity.findById(paymentLinkedTo)) ||
        (await Membership.findById(paymentLinkedTo))
      )
    ) {
      res.status(404);
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
      throw new Error(
        "Invalid type of Payment (not a activity or membership)."
      );
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
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get All Payments
// @route   GET /api/v1/payments
// @access  Private
const viewAllPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.find();
    if (payments.length) {
      res.status(200).json(payments);
    } else {
      res.status(404);
      throw new Error("No Payments were found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete All Payments
// @route   DELETE /api/v1/payments
// @access  Private
const deleteAllPayments = asyncHandler(async (req, res) => {
  try {
    const count = await Payment.find().countDocuments();
    if (count > 0) {
      await Payment.deleteMany();
      res.status(200).json({
        message: `${count} Payments have been deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("No Payments were found to delete.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get a Payment
// @route   GET /api/v1/payments/:id
// @access  Private
const viewPayment = asyncHandler(async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (payment) {
      res.status(200).json(payment);
    } else {
      res.status(404);
      throw new Error("Payment not found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get a Payment
// @route   PUT /api/v1/payments/:id
// @access  Private
const updatePayment = asyncHandler(async (req, res) => {
  try {
    let updatedEnrolment;
    if (!(await Member.findById(req.body.member))) {
      res.status(404);
      throw new Error("The Member given doesn's exists.");
    }
    if (await Activity.findById(req.body.paymentLinkedTo)) {
      updatedEnrolment = await Payment.findByIdAndUpdate(
        req.params.id,
        {
          member: req.body.member,
          paymentLinkedTo: req.body.paymentLinkedTo,
          paymentLinkedToType: "ACTIVITY",
          paymentDate: req.body.paymentDate,
          comments: req.body.comments,
        },
        { returnDocument: "after" }
      );
    } else if (await Membership.findById(req.body.paymentLinkedTo)) {
      updatedEnrolment = await Payment.findByIdAndUpdate(
        req.params.id,
        {
          member: req.body.member,
          paymentLinkedTo: req.body.paymentLinkedTo,
          paymentLinkedToType: "MEMBERSHIP",
          paymentDate: req.body.paymentDate,
          comments: req.body.comments,
        },
        { returnDocument: "after" }
      );
    } else {
      res.status(404);
      throw new Error("Source (Activity or Membership) wasn't found.");
    }

    if (updatedEnrolment) {
      res.status(200).json(updatedEnrolment);
    } else {
      res.status(404);
      throw new Error("The Payment you are trying to update doesn't exist.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete a Payment
// @route   DELETE /api/v1/payments/:id
// @access  Private
const deletePayment = asyncHandler(async (req, res) => {
  try {
    if (await Payment.findByIdAndDelete(req.params.id)) {
      res.status(200).json({
        message: `Payment ${req.params.id} deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("The Payment you are trying to delete doesn't exist.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get all my Payments
// @route   GET /api/v1/payments/profile/mypayments
// @access  Private
const viewMyPayments = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(await Payment.find({ member: req.member.id }));
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get Payments from Activities
// @route   GET /api/v1/payments/type/activities
// @access  Private
const viewPaymentsFromActivities = asyncHandler(async (req, res) => {
  try {
    const paymentsActivities = await Payment.find({
      paymentLinkedToType: "ACTIVITY",
    });
    if (paymentsActivities.length) {
      res.status(200).json(paymentsActivities);
    } else {
      res.status(404);
      throw new Error("No Activity Payments were found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete all Payments from Activities
// @route   DELETE /api/v1/payments/types/activities
// @access  Private
const deletePaymentsFromActivities = asyncHandler(async (req, res) => {
  try {
    const count = await Payment.find({
      paymentLinkedToType: "ACTIVITY",
    }).countDocuments();
    if (count > 0) {
      await Payment.deleteMany({
        paymentLinkedToType: "ACTIVITY",
      });
      res.status(200).json({
        message: `${count} Activity Payments have been deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("No Activity Payments were found to delete.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get Payments from Memberships
// @route   GET /api/v1/payments/type/memberships
// @access  Private
const viewPaymentsFromMemberships = asyncHandler(async (req, res) => {
  try {
    const paymentsMemberships = await Payment.find({
      paymentLinkedToType: "MEMBERSHIP",
    });
    if (paymentsMemberships.length) {
      res.status(200).json(paymentsMemberships);
    } else {
      res.status(404);
      throw new Error("No Membership Payments were found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete all Payments from Activities
// @route   DELETE /api/v1/payments/memberships
// @access  Private
const deletePaymentsFromMemberships = asyncHandler(async (req, res) => {
  try {
    const count = await Payment.find({
      paymentLinkedToType: "MEMBERSHIP",
    }).countDocuments();
    if (count > 0) {
      await Payment.deleteMany({
        paymentLinkedToType: "MEMBERSHIP",
      });
      res.status(200).json({
        message: `${count} Membership Payments have been deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("No Membership Payments were found to delete.");
    }
  } catch (error) {
    throw Error(error);
  }
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
