const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const Payment = require("../models/paymentModel");
const Enrolment = require("../models/enrolmentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { deleteMany } = require("../models/memberModel");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    View All Members
// @route   GET /api/v1/members
// @access  Public
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
    res.status(400);
    throw new Error("Please add all fields.");
  }

  // Check if Member exists.
  if (await Member.findOne({ idDocumentNumber })) {
    res.status(400);
    throw new Error("Member already exists.");
  }

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
    res.status(400);
    throw new Error("Invalid Member Data.");
  }
});

// @desc    Authenticate Member
// @route   POST /api/v1/members/login
// @access  Public
const loginMember = asyncHandler(async (req, res) => {
  const { idDocumentNumber, password } = req.body;

  // Check for member ID Document Number
  const member = await Member.findOne({ idDocumentNumber });

  //
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
    res.status(400);
    throw new Error("Invalid Credentials.");
  }
});

// @desc    Get Member data
// @route   GET /api/v1/members/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, idDocumentNumber, email, name, surname } = await Member.findById(
    req.member.id
  );

  res.status(200).json({
    id: _id,
    idDocumentNumber,
    email,
    name,
    surname,
  });
});
// @desc    Delete all Members
// @route   DELETE /api/v1/members/
// @access  Private
const deleteAllMembers = asyncHandler(async (req, res) => {
  const count = await Member.find().countDocuments();
  if (count > 0) {
    await Member.deleteMany();
    res.status(200).json({
      message: `${count} Members have been deleted.`,
    });
  } else if (count === 0) {
    res.status(200).json({
      message: `No Members were found.`,
    });
  } else {
    res.status(400);
    throw new Error("An error occurred while trying to delete Members.");
  }
});

// @desc    Get especific Member data
// @route   GET /api/v1/members/:id
// @access  Private
const viewMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (member) {
    res.status(200).json({ member });
  } else {
    res.status(404);
    throw new Error("Member specified doesn't exists.");
  }
});

// @desc    Update especific Member
// @route   PUT /api/v1/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedMember) {
      res.status(200).json(updatedMember);
    } else {
      res
        .status(404)
        .json({ message: `Member ${req.params.id} wasn't found.` });
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
  if (await Member.findByIdAndDelete(req.params.id)) {
    res.status(200).json({ message: `Member ${req.params.id} was deleted.` });
  } else {
    res.status(404);
    throw new Error("Member especified doesn't exist.");
  }
});

// @desc    View all Payments made for a Member
// @route   GET /api/v1/members/:id/payments
// @access  Private
const viewMemberPayments = asyncHandler(async (req, res) => {
  try {
    const memberPayments = await Payment.find({ member: req.params.id }).exec();
    if (memberPayments.length) {
      res.status(200).json(memberPayments);
    } else {
      res
        .status(404)
        .json({ message: `No payments found for Member ${req.params.id}` });
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
  const count = await Payment.find({ member: req.params.id }).countDocuments();
  if (count > 0) {
    await Payment.deleteMany({ member: req.params.id });
    res.status(200).json({
      message: `${count} Payments made from Member ${req.params.id} have been deleted.`,
    });
  } else if (count === 0) {
    res.status(200).json({
      message: `No payments were found to have been made by Member ${req.params.id}.`,
    });
  } else {
    res.status(400);
    throw new Error(
      "An error occurred while trying to delete Member Payments."
    );
  }
});

// @desc    View all Enrolments for a Member
// @route   GET /api/v1/members/:id/enrolments
// @access  Private
const viewMemberEnrolments = asyncHandler(async (req, res) => {
  const memberEnrolments = await Enrolment.find({
    member: req.params.id,
  }).exec();
  if (memberEnrolments.length) {
    res.status(200).json(memberEnrolments);
  } else {
    res.status(404);
    throw new Error(`No Enrolments found for Member ${req.params.id}`);
  }
});

// @desc    Delete all Enrolments for a Member
// @route   DELETE /api/v1/members/:id/enrolments
// @access  Private
const deleteMemberEnrolments = asyncHandler(async (req, res) => {
  if (await Enrolment.findOne({ member: req.params.id })) {
    await Enrolment.deleteMany({ member: req.params.id });
    res.status(200).json({
      message: `All Enrolments for Member ${req.params.id} have been deleted.`,
    });
  } else {
    res.status(400);
    throw new Error("Member has no Enrolments.");
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
