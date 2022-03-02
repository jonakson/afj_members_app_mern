const asyncHandler = require("express-async-handler");
const Membership = require("../models/membershipModel");
const Payment = require("../models/paymentModel");
const ErrorResponse = require("../libs/errorHandling");

// @desc    Create Membership
// @route   POST /api/v1/memberships
// @access  Private
const createMembership = asyncHandler(async (req, res) => {
  try {
    // Take needed fields from the body request.
    const { name, description, durationYears, price } = req.body;

    //Check if all fields are filled.
    if (!name || !description || !durationYears || !price) {
      res
        .status(400)
        .json(ErrorResponse.missingParameters("Input all required fields"));
    }

    // Check if Membership exists.
    if (await Membership.findOne({ name })) {
      res
        .status(400)
        .json(
          ErrorResponse.resourceAlreadyExists("Membership already exists.")
        );
    }

    // Create Membership.
    const membership = await Membership.create({
      name,
      description,
      durationYears,
      price,
    });

    // Check if the Membership was successfully created.
    if (membership) {
      res.status(201).json({
        _id: membership.id,
        name: membership.name,
        description: membership.description,
        durationYears: membership.durationYears,
        price: membership.price,
      });
    } else {
      res
        .status(400)
        .json(ErrorResponse.invalidData("Invalid Membership data."));
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View All Memberships
// @route   GET /api/v1/memberships
// @access  Private
const viewAllMemberships = asyncHandler(async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View All Memberships
// @route   DELETE /api/v1/memberships
// @access  Private
const deleteAllMemberships = asyncHandler(async (req, res) => {
  try {
    const count = await Membership.find().countDocuments();
    if (count > 0) {
      await Membership.deleteMany();
      res.status(200).json({
        message: `${count} Membersships have been deleted.`,
      });
    } else if (count === 0) {
      res
        .status(404)
        .json(ErrorResponse.resourceNotFound("No Memberships were found."));
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View Membership
// @route   GET /api/v1/memberships/:id
// @access  Private
const viewMembership = asyncHandler(async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (membership) {
      res.status(200).json(membership);
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.resourceNotFound(
            "The Membership you are trying to access doesn't exist."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Update Membership
// @route   PUT /api/v1/memberships/:id
// @access  Private
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
        .json(
          ErrorResponse.resourceNotFound(
            "The Membership you are trying to update doesn't exist."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete Membership
// @route   DELETE /api/v1/memberships/:id
// @access  Private
const deleteMembership = asyncHandler(async (req, res) => {
  try {
    if (await Membership.findByIdAndDelete(req.params.id)) {
      res.status(200).json({
        message: `Membership ${req.params.id} deleted.`,
      });
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.resourceNotFound(
            "The Membership you are trying to delete doesn't exist."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View Membership Payments
// @route   GET /api/v1/memberships/:id/payments
// @access  Private
const viewMembershipPayments = asyncHandler(async (req, res) => {
  try {
    const membershipPayments = await Payment.find({
      paymentLinkedTo: req.params.id,
    }).exec();
    if (membershipPayments.length) {
      res.status(200).json(membershipPayments);
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.resourceNotFound(
            "No Payments were found for the given Membership."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// FIXME Improve error handling
// @desc    Delete Membership Payments
// @route   DELETE /api/v1/memberships/:id/payments
// @access  Public
const deleteMembershipPayments = asyncHandler(async (req, res) => {
  try {
    const count = await Payment.find({
      paymentLinkedTo: req.params.id,
    }).countDocuments();
    if (count > 0) {
      await Payment.deleteMany({ paymentLinkedTo: req.params.id });
      res.status(200).json({
        message: `${count} Payments related to Membership ${req.params.id} have been deleted.`,
      });
    } else if (count === 0) {
      res
        .status(404)
        .json(
          ErrorResponse.resourceNotFound(
            "No Payments were found for the given Membership."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
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
