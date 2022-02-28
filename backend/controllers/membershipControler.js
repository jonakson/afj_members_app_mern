const asyncHandler = require("express-async-handler");
const Membership = require("../models/membershipModel");

// @desc    View All Memberships
// @route   GET /api/v1/memberships
// @access  Public
const viewAllMemberships = asyncHandler(async (req, res) => {
  const memberships = await Membership.find();
  res.status(200).json(memberships);
});

// @desc    View Membership
// @route   GET /api/v1/memberships/:id
// @access  Public
const viewMembership = asyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  res.status(200).json(membership);
});

// @desc    Create Membership
// @route   POST /api/v1/memberships
// @access  Public
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

// @desc    Update Membership
// @route   PUT /api/v1/memberships/:id
// @access  Public
const updateMembership = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Membership ${req.params.id} updated.`,
  });
});

// @desc    Delete Membership
// @route   DELETE /api/v1/memberships/:id
// @access  Public
const deleteMembership = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Membership ${req.params.id} deleted.`,
  });
});

module.exports = {
  viewAllMemberships,
  viewMembership,
  createMembership,
  updateMembership,
  deleteMembership,
};
