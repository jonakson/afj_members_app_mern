const asyncHandler = require("express-async-handler");
const Participant = require("../models/enrolmentModel");
const Member = require("../models/memberModel");
const Activity = require("../models/activityModel");

// TODO createEnrolment
// @desc    Create Enrolment
// @route   POST /api/v1/enrolments
// @access  Private
const createEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Create Enrolment!",
  });
});

// TODO viewAllEnrolments
// @desc    Get All Enrolments
// @route   GET /api/v1/participants
// @access  Private
const viewAllEnrolments = asyncHandler(async (req, res) => {
  const participants = await Participant.find();
  res.status(200).json({
    message: "Viewing all Enrolments!",
  });
});

// TODO deleteAllEnrolments
// @desc    Deleting All Enrolments
// @route   DELETE /api/v1/participants
// @access  Private
const deleteAllEnrolments = asyncHandler(async (req, res) => {
  const participants = await Participant.find();
  res.status(200).json({
    message: "All Enrolments deleted!",
  });
});

// TODO viewEnrolment
// @desc    Get a Enrolment
// @route   GET /api/v1/participants/:id
// @access  Private
const viewEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Viewing Enrolment ${req.params.id}.`,
  });
});

// TODO updateEnrolment
// @desc    Update a Enrolment
// @route   PUT /api/v1/participants/:id
// @access  Private
const updateEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Enrolment ${req.params.id} updated.`,
  });
});

// TODO deleteEnrolment
// @desc    Delete a Enrolment
// @route   DELETE /api/v1/participants/:id
// @access  Private
const deleteEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Enrolment ${req.params.id} deleted.`,
  });
});

// TODO viewMyEnrolments
// @desc    Get my Enrolments
// @route   GET /api/v1/participants/myenrolments
// @access  Private
const viewMyEnrolments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Viewing my Enrolments.`,
  });
});

module.exports = {
  createEnrolment,
  viewAllEnrolments,
  deleteAllEnrolments,
  viewEnrolment,
  updateEnrolment,
  deleteEnrolment,
  viewMyEnrolments,
};
