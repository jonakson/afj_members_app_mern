const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Member = require("../models/memberModel");

// @desc    View All Activities
// @route   GET /api/v1/activities
// @access  Public
const viewAllActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find();
  res.status(200).json(activities);
});

// @desc    View Activity
// @route   GET /api/v1/activities/:id
// @access  Public
const viewActivity = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id);
  res.status(200).json(activity);
});

// @desc    Create Activity
// @route   POST /api/v1/activities
// @access  Public
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
