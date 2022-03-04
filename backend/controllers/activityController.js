const asyncHandler = require("express-async-handler");
const Activity = require("../models/activityModel");
const Member = require("../models/memberModel");
const Enrolment = require("../models/enrolmentModel");
const Payment = require("../models/paymentModel");

// @desc    Create Activity
// @route   POST /api/v1/activities
// @access  Private
const createActivity = asyncHandler(async (req, res) => {
  try {
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
      res.status(404);
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
      throw new Error("Invalid Activity data.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View All Activities
// @route   GET /api/v1/activities
// @access  Private
const viewAllActivities = asyncHandler(async (req, res) => {
  try {
    const activities = await Activity.find();
    if (activities.length) {
      res.status(200).json(activities);
    } else {
      res.status(404);
      throw new Error("No Activities were found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete All Activities
// @route   DELETE /api/v1/activities
// @access  Private
const deleteAllActivities = asyncHandler(async (req, res) => {
  try {
    const count = await Activity.find().countDocuments();
    if (count > 0) {
      await Activity.deleteMany();
      res.status(200).json({
        message: `${count} Activities have been deleted.`,
      });
    } else {
      res.status(404);
      throw new Error("No Activities were found to delete.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View Activity
// @route   GET /api/v1/activities/:id
// @access  Private
const viewActivity = asyncHandler(async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404);
      throw new Error("Activity given wasn't found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Update Activity
// @route   PUT /api/v1/activities/:id
// @access  Private
const updateActivity = asyncHandler(async (req, res) => {
  try {
    if (!(await Member.findById(req.body.coordinator))) {
      res.status(404);
      throw new Error(
        "The Member (activity coordinator) given doesn's exists."
      );
    }
    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after" }
    );
    if (updatedActivity) {
      res.status(200).json(updatedActivity);
    } else {
      res.status(404);
      throw new Error("The Activity you are trying to update doesn't exist.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete Activity
// @route   DELETE /api/v1/activities/:id
// @access  Private
const deleteActivity = asyncHandler(async (req, res) => {
  try {
    if (await Activity.findByIdAndDelete(req.params.id)) {
      res.status(200).json({
        message: "Activity deleted.",
      });
    } else {
      res.status(404);
      throw new Error("The Activity you are trying to delete doesn't exist.");
    }
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    View Activity Enrolments
// @route   GET /api/v1/activities/:id/enrolments
// @access  Private
const viewActivityEnrolments = asyncHandler(async (req, res) => {
  try {
    if (await Activity.findById(req.params.id)) {
      const activityEnrolments = await Enrolment.find({
        activity: req.params.id,
      }).exec();
      if (activityEnrolments.length) {
        res.status(200).json(activityEnrolments);
      } else {
        res.status(404);
        throw new Error("There isn't Erolments for the Activity provided.");
      }
    } else {
      res.status(404);
      throw new Error("Activity given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete Activity Enrolments
// @route   DELETE /api/v1/activities/:id/enrolments
// @access  Private
const deleteActivityEnrolments = asyncHandler(async (req, res) => {
  try {
    if (await Activity.findById(req.params.id)) {
      const count = await Enrolment.find({
        activity: req.params.id,
      }).countDocuments();
      if (count > 0) {
        await Enrolment.deleteMany({ activity: req.params.id });
        res.status(200).json({
          message: `${count} Enrolments have been deleted.`,
        });
      } else {
        res.status(404);
        throw new Error("There isn't Erolments for the Activity provided.");
      }
    } else {
      res.status(404);
      throw new Error("Activity given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View Activity Payments
// @route   GET /api/v1/activities/:id/payments
// @access  Private
const viewActivityPayments = asyncHandler(async (req, res) => {
  try {
    if (await Activity.findById(req.params.id)) {
      const activityPayments = await Payment.find({
        paymentLinkedTo: req.params.id,
      }).exec();
      if (activityPayments.length) {
        res.status(200).json(activityPayments);
      } else {
        res.status(404);
        throw new Error("There isn't Payments for the Activity provided.");
      }
    } else {
      res.status(404);
      throw new Error("Activity given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete Activity Enrolments
// @route   DELETE /api/v1/activities/:id/payments
// @access  Private
const deleteActivityPayments = asyncHandler(async (req, res) => {
  try {
    if (await Activity.findById(req.params.id)) {
      const count = await Payment.find({
        paymentLinkedTo: req.params.id,
      }).countDocuments();
      console.log(count);
      if (count > 0) {
        await Payment.deleteMany({ paymentLinkedTo: req.params.id });
        res.status(200).json({
          message: `${count} Payments have been deleted.`,
        });
      } else {
        res.status(404);
        throw new Error("There isn't Payments for the Activity provided.");
      }
    } else {
      res.status(404);
      throw new Error("Activity given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
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
