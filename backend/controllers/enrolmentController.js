const asyncHandler = require("express-async-handler");
const Participant = require("../models/enrolmentModel");
const Member = require("../models/memberModel");
const Activity = require("../models/activityModel");

// @desc    Get All Participants
// @route   GET /api/v1/participants
// @access  Private
const viewAllEnrolments = asyncHandler(async (req, res) => {
  const participants = await Participant.find();
  res.status(200).json({
    message: "All Participants!",
  });
});

// TODO viewEnrolment
const viewEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Viewing participation ${req.params.id}.`,
  });
});

// TODO createEnrolment
const createEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Create Participation!",
  });
});

// TODO updateEnrolment
const updateEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Participation ${req.params.id} updated.`,
  });
});

// TODO deleteEnrolment
const deleteEnrolment = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Participation ${req.params.id} deleted.`,
  });
});

module.exports = {
  viewAllEnrolments,
  viewEnrolment,
  createEnrolment,
  updateEnrolment,
  deleteEnrolment,
};
