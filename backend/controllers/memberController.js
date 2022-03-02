const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const Payment = require("../models/paymentModel");
const Enrolment = require("../models/enrolmentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../libs/errorHandling");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    View All Members
// @route   GET /api/v1/members
// @access  Private
const viewAllMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();
  res.status(200).json(members);
});

// @desc    Register Member
// @route   POST /api/v1/members
// @access  Public
const registerMember = asyncHandler(async (req, res) => {
  // Take needed fields from the body request.
  const {
    idDocumentNumber,
    email,
    password,
    name,
    surname,
    phone,
    dob,
    entryDate,
    isAdmin,
  } = req.body;

  //Check if all fields are filled.
  if (
    !idDocumentNumber ||
    !email ||
    !password ||
    !name ||
    !surname ||
    !phone ||
    !dob ||
    !entryDate ||
    !isAdmin
  ) {
    res
      .status(400)
      .json(
        ErrorResponse.buildResponse(
          "missing_parameters",
          "Input all required fields"
        )
      );
  }

  // Check if Member exists.
  try {
    if (await Member.findOne({ idDocumentNumber })) {
      res
        .status(400)
        .json(
          ErrorResponse.buildResponse(
            "resource_already_exists",
            "Member already exists.",
            `A Member with an ID Number:${idDocumentNumber} already exists.`
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }

  // Create Member.
  try {
    // Hash the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Member.
    const member = await Member.create({
      idDocumentNumber,
      email,
      password: hashedPassword,
      name,
      surname,
      phone,
      dob,
      entryDate,
      isAdmin,
    });

    // Check if the Member was successfully created.
    if (member) {
      res.status(201).json({
        _id: member.id,
        idDocumentNumber: member.idDocumentNumber,
        email: member.email,
        password: member.password,
        name: member.name,
        surname: member.surname,
        phone: member.phone,
        dob: member.dob,
        entryDate: member.entryDate,
        isAdmin: member.isAdmin,
        token: generateToken(member._id),
      });
    } else {
      res
        .status(400)
        .json(
          ErrorResponse.buildResponse(
            "invalid_data",
            "Invalid Member data.",
            "api/v1/members"
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Authenticate Member
// @route   POST /api/v1/members/login
// @access  Private
const loginMember = asyncHandler(async (req, res) => {
  const { idDocumentNumber, password } = req.body;

  try {
    // Check for member ID Document Number
    const member = await Member.findOne({ idDocumentNumber });
    //Check if Member was found && raw password and encripted password is the same
    if (member && (await bcrypt.compare(password, member.password))) {
      res.json({
        _id: member.id,
        idDocumentNumber: member.idDocumentNumber,
        email: member.email,
        name: member.name,
        surname: member.surname,
        token: generateToken(member._id),
      });
    } else {
      res
        .status(401)
        .json(
          ErrorResponse.buildResponse(
            "invalid_credentials",
            "Invalid credentials (ID Document and/or Password).",
            "api/v1/members/login"
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Get Member data
// @route   GET /api/v1/members/profile/current
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  try {
    const member = await Member.findById(req.member.id);

    if (member) {
      res.status(200).json(member);
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "Member not found.",
            "api/v1/members"
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete all Members
// @route   DELETE /api/v1/members
// @access  Private
const deleteAllMembers = asyncHandler(async (req, res) => {
  try {
    const count = await Member.find().countDocuments();
    if (count > 0) {
      await Member.deleteMany();
      res.status(200).json({
        message: `${count} Members have been deleted.`,
      });
    } else if (count === 0) {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "No Members were found.",
            "api/v1/members"
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Get a Member
// @route   GET /api/v1/members/:id
// @access  Private
const viewMember = asyncHandler(async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (member) {
      res.status(200).json({
        _id: member.id,
        idDocumentNumber: member.idDocumentNumber,
        email: member.email,
        password: member.password,
        name: member.name,
        surname: member.surname,
        phone: member.phone,
        dob: member.dob,
        entryDate: member.entryDate,
        isAdmin: member.isAdmin,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt,
        token: generateToken(member._id),
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Update especific Member
// @route   PUT /api/v1/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  try {
    // Hash the password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Find and update the Member
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      {
        idDocumentNumber: req.body.idDocumentNumber,
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        dob: req.body.dob,
        entryDate: req.body.entryDate,
        isAdmin: req.body.isAdmin,
      },
      { returnDocument: "after" }
    );

    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "The Member you are trying to update does not exist."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete a Member
// @route   DELETE /api/v1/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  try {
    if (await Member.findByIdAndDelete(req.params.id)) {
      res.status(200).json({ message: `Member ${req.params.id} was deleted.` });
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "The Member you are trying to delete does not exist."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View all Payments made for a Member
// @route   GET /api/v1/members/:id/payments
// @access  Private
const viewMemberPayments = asyncHandler(async (req, res) => {
  try {
    const memberPayments = await Payment.find({ member: req.params.id }).exec();
    // Check if the given Member has any Payment
    if (memberPayments.length) {
      res.status(200).json(memberPayments);
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "No Payments were found for the given Member."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete all Payments made for a Member
// @route   DELETE /api/v1/members/:id/payments
// @access  Private
const deleteMemberPayments = asyncHandler(async (req, res) => {
  try {
    const count = await Payment.find({
      member: req.params.id,
    }).countDocuments();
    // Check if any Payment was found.
    if (count > 0) {
      await Payment.deleteMany({ member: req.params.id });
      res.status(200).json({
        message: `${count} Payments made from Member ${req.params.id} have been deleted.`,
      });
    } else if (count === 0) {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "No Payments were found for the given Member."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    View all Enrolments for a Member
// @route   GET /api/v1/members/:id/enrolments
// @access  Private
const viewMemberEnrolments = asyncHandler(async (req, res) => {
  try {
    const memberEnrolments = await Enrolment.find({
      member: req.params.id,
    }).exec();
    // Check if the given Member has any Enrolment.
    if (memberEnrolments.length) {
      res.status(200).json(memberEnrolments);
    } else {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "No Enrolments were found for the given Member."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

// @desc    Delete all Enrolments for a Member
// @route   DELETE /api/v1/members/:id/enrolments
// @access  Private
const deleteMemberEnrolments = asyncHandler(async (req, res) => {
  try {
    const count = await Enrolment.find({
      member: req.params.id,
    }).countDocuments();
    // Check if any Enrolment was found.
    if (count > 0) {
      await Enrolment.deleteMany({ member: req.params.id });
      res.status(200).json({
        message: `${count} Enrolments for Member ${req.params.id} have been deleted.`,
      });
    } else if (count === 0) {
      res
        .status(404)
        .json(
          ErrorResponse.buildResponse(
            "resource_not_found",
            "No Enrolments were found for the given Member."
          )
        );
    }
  } catch (error) {
    res.status(500);
    throw new Error(`Something went wrong: ${error}`);
  }
});

module.exports = {
  registerMember,
  viewAllMembers,
  deleteAllMembers,
  viewMember,
  updateMember,
  deleteMember,
  loginMember,
  getMe,
  viewMemberPayments,
  deleteMemberPayments,
  viewMemberEnrolments,
  deleteMemberEnrolments,
};
