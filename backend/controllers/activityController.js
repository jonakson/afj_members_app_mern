const asyncHandler = require("express-async-handler");
const Payment = require("../models/activityModel");

// @desc    View All Activities
// @route   GET /api/v1/activities
// @access  Public
const viewAllActivities = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "View All Activities",
  });
});

// @desc    View Activity
// @route   GET /api/v1/activities/:id
// @access  Public
const viewActivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Viewing Activity ${req.params.id}.`,
  });
});

// @desc    Create Activity
// @route   POST /api/v1/activities
// @access  Public
const createActivity = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Activity created.",
  });
});

// @desc    Update Activity
// @route   PUT /api/v1/activities/:id
// @access  Public
const updateActivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Activity ${req.params.id} updated.`,
  });
});

// @desc    Delete Activity
// @route   DELETE /api/v1/activities/:id
// @access  Public
const deleteActivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Activity ${req.params.id} deleted.`,
  });
});

module.exports = {
  viewAllActivities,
  viewActivity,
  createActivity,
  updateActivity,
  deleteActivity,
};
