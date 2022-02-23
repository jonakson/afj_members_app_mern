const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

  // Create Member
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
  res.status(200).json({ message: "Login Member" });
});

// @desc    Get Member data
// @route   GET /api/v1/members/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Member data display" });
});

module.exports = {
  registerMember,
  loginMember,
  getMe,
};
