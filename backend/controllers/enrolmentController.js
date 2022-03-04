const asyncHandler = require("express-async-handler");
const Enrolment = require("../models/enrolmentModel");
const Member = require("../models/memberModel");
const Activity = require("../models/activityModel");

// @desc    Create Enrolment
// @route   POST /api/v1/enrolments
// @access  Private
const createEnrolment = asyncHandler(async (req, res) => {
  try {
    const { member, activity } = req.body;

    // Check if all fields are filled.
    if (!member || !activity) {
      res.status(400);
      throw new Error("Input all required fields");
    }

    // Check for Member and Activity.
    if (!(await Member.findById(member))) {
      res.status(404);
      throw new Error("Member not found");
    }
    if (!(await Activity.findById(activity))) {
      res.status(404);
      throw new Error("Activity not found");
    }

    // Create the Enrolment
    const enrolment = await Enrolment.create({ member, activity });

    // Check if the Enrolment was create.
    if (enrolment) {
      res.status(201).json(enrolment);
    } else {
      res.status(400);
      throw new Error("Invalid Enrolment Data.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View All Enrolments
// @route   GET /api/v1/enrolments
// @access  Private
const viewAllEnrolments = asyncHandler(async (req, res) => {
  try {
    const enrolments = await Enrolment.find();
    if (enrolments.length) {
      res.status(200).json(enrolments);
    } else {
      res.status(404);
      throw new Error("No Enrolments were found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Deleting All Enrolments
// @route   DELETE /api/v1/enrolments
// @access  Private
const deleteAllEnrolments = asyncHandler(async (req, res) => {
  try {
    const count = await Enrolment.find().countDocuments();
    if (count > 0) {
      await Enrolment.deleteMany();
      res.status(200).json({
        message: `${count} Enrolments have been deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("No Enrolments were found to delete.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get a Enrolment
// @route   GET /api/v1/enrolments/:id
// @access  Private
const viewEnrolment = asyncHandler(async (req, res) => {
  try {
    const enrolment = await Enrolment.findById(req.params.id);
    if (enrolment) {
      res.status(200).json(enrolment);
    } else {
      res.status(404);
      throw new Error("Enrolment not found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Update a Enrolment
// @route   PUT /api/v1/enrolments/:id
// @access  Private
const updateEnrolment = asyncHandler(async (req, res) => {
  try {
    if (!(await Member.findById(req.body.member))) {
      res.status(404);
      throw new Error("The Member given doesn's exists.");
    }
    if (!(await Activity.findById(req.body.activity))) {
      res.status(404);
      throw new Error("The Activity given doesn's exists.");
    }
    const updatedEnrolment = await Enrolment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" }
    );
    if (updatedEnrolment) {
      res.status(200).json(updatedEnrolment);
    } else {
      res.status(404);
      throw new Error("The Enrolment you are trying to update doesn't exist.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete a Enrolment
// @route   DELETE /api/v1/enrolments/:id
// @access  Private
const deleteEnrolment = asyncHandler(async (req, res) => {
  try {
    if (await Enrolment.findByIdAndDelete(req.params.id)) {
      res.status(200).json({
        message: `Enrolment ${req.params.id} deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("The Enrolment you are trying to delete doesn't exist.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get my Enrolments
// @route   GET /api/v1/enrolments/myenrolments
// @access  Private
const viewMyEnrolments = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(await Enrolment.find({ member: req.member.id }));
  } catch (error) {
    throw Error(error);
  }
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
