const asyncHandler = require("express-async-handler");
const Membership = require("../models/membershipModel");
const Payment = require("../models/paymentModel");

// @desc    Create Membership
// @route   POST /api/v1/memberships
// @access  Private
const createMembership = asyncHandler(async (req, res) => {
  // Take needed fields from the body request.
  const { name, description, durationYears, price } = req.body;

  //Check if all fields are filled.
  if (!name || !description || !durationYears || !price) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  // Check if Membership exists.
  if (await Membership.findOne({ name })) {
    res.status(400);
    throw new Error("Membership already exists.");
  }

  // Create Membership.
  const membership = await Membership.create({
    name,
    description,
    durationYears,
    price,
  });

  // Check if the Activity was successfully created.
  if (membership) {
    res.status(201).json({
      _id: membership.id,
      name: membership.name,
      description: membership.description,
      durationYears: membership.durationYears,
      price: membership.price,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Membership Data.");
  }
});

// @desc    View All Memberships
// @route   GET /api/v1/memberships
// @access  Private
const viewAllMemberships = asyncHandler(async (req, res) => {
  const memberships = await Membership.find();
  res.status(200).json(memberships);
});

// @desc    View All Memberships
// @route   DELETE /api/v1/memberships
// @access  Private
const deleteAllMemberships = asyncHandler(async (req, res) => {
  const count = await Membership.find().countDocuments();
  if (count > 0) {
    await Membership.deleteMany();
    res.status(200).json({
      message: `${count} Membersships have been deleted.`,
    });
  } else if (count === 0) {
    res.status(200).json({
      message: `No Memberships were found.`,
    });
  } else {
    res.status(400);
    throw new Error("An error occurred while trying to delete Membersships.");
  }
});

// @desc    View Membership
// @route   GET /api/v1/memberships/:id
// @access  Private
const viewMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  res.status(200).json(membership);
});

// @desc    Update Membership
// @route   PUT /api/v1/memberships/:id
// @access  Public
const updateMembership = asyncHandler(async (req, res) => {
  try {
    const updatedMembership = await Membership.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedMembership) {
      res.status(200).json(updatedMembership);
    } else {
      res
        .status(404)
        .json({ message: `Membership ${req.params.id} wasn't found.` });
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete Membership
// @route   DELETE /api/v1/memberships/:id
// @access  Public
const deleteMembership = asyncHandler(async (req, res) => {
  try {
    if (await Membership.findByIdAndDelete(req.params.id)) {
      res.status(200).json({
        message: `Membership ${req.params.id} deleted.`,
      });
    } else {
      res
        .status(404)
        .json({ message: `Membership ${req.params.id} wasn't found.` });
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View Membership Payments
// @route   GET /api/v1/memberships/:id/payments
// @access  Public
const viewMembershipPayments = asyncHandler(async (req, res) => {
  try {
    const membershipPayments = await Payment.find({
      paymentLinkedTo: req.params.id,
    }).exec();
    if (membershipPayments.length) {
      res.status(200).json(membershipPayments);
    } else {
      res.status(404).json({
        message: `No payments found for Membership ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete Membership Payments
// @route   DELETE /api/v1/memberships/:id/payments
// @access  Public
const deleteMembershipPayments = asyncHandler(async (req, res) => {
  const count = await Payment.find({
    paymentLinkedTo: req.params.id,
  }).countDocuments();
  if (count > 0) {
    await Payment.deleteMany({ paymentLinkedTo: req.params.id });
    res.status(200).json({
      message: `${count} Payments related to Membership ${req.params.id} have been deleted.`,
    });
  } else if (count === 0) {
    res.status(200).json({
      message: `No payments related to Membership ${req.params.id} were found.`,
    });
  } else {
    res.status(400);
    throw new Error(
      "An error occurred while trying to delete Membership related Payments."
    );
  }
});

module.exports = {
  createMembership,
  viewAllMemberships,
  deleteAllMemberships,
  viewMembership,
  updateMembership,
  deleteMembership,
  viewMembershipPayments,
  deleteMembershipPayments,
};
