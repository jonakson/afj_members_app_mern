const asyncHandler = require("express-async-handler");
const Payment = require("../models/membershipModel");

// @desc    View All Memberships
// @route   GET /api/v1/memberships
// @access  Public
const viewAllMemberships = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Viewing All Memberships",
  });
});

// @desc    View Membership
// @route   GET /api/v1/memberships/:id
// @access  Public
const viewMembership = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Viewing Membership ${req.params.id}.`,
  });
});

// @desc    Create Membership
// @route   POST /api/v1/memberships
// @access  Public
const createMembership = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Membership created.",
  });
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
