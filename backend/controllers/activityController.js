const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Member = require("../models/memberModel");

// FIXME Improve Error Handling
// @desc    Create Activity
// @route   POST /api/v1/activities
// @access  Private
const createActivity = asyncHandler(async (req, res) => {
  // Take needed fields from the body request.
  const {
    name,
    description,
    coordinator,
    date,
    capacity,
    place,
    isPaid,
    price,
  } = req.body;

  //Check if all fields are filled.
  if (
    !name ||
    !description ||
    !coordinator ||
    !date ||
    !capacity ||
    !place ||
    !isPaid ||
    !price
  ) {
    res.status(400);
    throw new Error("Please add all fields.");
  }

  // Check if Activity exists.
  if (await Activity.findOne({ name })) {
    res.status(400);
    throw new Error("Activity already exists.");
  }
  //Check if Member exists.
  if (!(await Member.findById(coordinator))) {
    res.status(400);
    throw new Error("Member doesn't exists.");
  }

  // Create Activity.
  const activity = await Activity.create({
    name,
    description,
    coordinator,
    date,
    capacity,
    place,
    isPaid,
    price,
  });

  // Check if the Activity was successfully created.
  if (activity) {
    res.status(201).json({
      _id: activity.id,
      name: activity.name,
      description: activity.description,
      coordinator: activity.coordinator,
      date: activity.date,
      capacity: activity.capacity,
      place: activity.place,
      isPaid: activity.isPaid,
      price: activity.price,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Activity Data.");
  }
});

// FIXME Improve Error Handling
// @desc    View All Activities
// @route   GET /api/v1/activities
// @access  Private
const viewAllActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find();
  res.status(200).json(activities);
});

// TODO deleteAllActivities
// @desc    Delete All Activities
// @route   DELETE /api/v1/activities
// @access  Private
const deleteAllActivities = asyncHandler(async (req, res) => {
  res.status(200).json({ messages: "All Activities deleted." });
});

// FIXME Improve Error Handling
// @desc    View Activity
// @route   GET /api/v1/activities/:id
// @access  Private
const viewActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  res.status(200).json(activity);
});

// TODO updateActivity
// @desc    Update Activity
// @route   PUT /api/v1/activities/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Activity ${req.params.id} updated.`,
  });
});

// TODO deleteActivity
// @desc    Delete Activity
// @route   DELETE /api/v1/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Activity ${req.params.id} deleted.`,
  });
});

// TODO viewActivityEnrolments
// @desc    View Activity Enrolments
// @route   GET /api/v1/activities/:id/enrolments
// @access  Private
const viewActivityEnrolments = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Enrolmnents for ${req.params.id}.` });
});

// TODO deleteActivityEnrolments
// @desc    Delete Activity Enrolments
// @route   DELETE /api/v1/activities/:id/enrolments
// @access  Private
const deleteActivityEnrolments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Enrolments deleted for ${req.params.id}.`,
  });
});

// TODO viewActivityPayments
// @desc    View Activity Payments
// @route   GET /api/v1/activities/:id/payments
// @access  Private
const viewActivityPayments = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Payments for ${req.params.id}.` });
});

// TODO deleteActivityPayments
// @desc    Delete Activity Enrolments
// @route   DELETE /api/v1/activities/:id/payments
// @access  Private
const deleteActivityPayments = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Payments deleted for ${req.params.id}`,
  });
});

module.exports = {
  viewAllActivities,
  viewActivity,
  deleteAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  viewActivityEnrolments,
  deleteActivityEnrolments,
  viewActivityPayments,
  deleteActivityPayments,
};
