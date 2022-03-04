const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");
const Payment = require("../models/paymentModel");
const Enrolment = require("../models/enrolmentModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register Member
// @route   POST /api/v1/members
// @access  Public
const registerMember = asyncHandler(async (req, res) => {
  try {
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
      throw new Error("Invalid Member data.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View All Members
// @route   GET /api/v1/members
// @access  Private
const viewAllMembers = asyncHandler(async (req, res) => {
  try {
    const members = await Member.find();
    if (members.length) {
      res.status(200).json(members);
    } else {
      res.status(404);
      throw new Error("No Members were found.");
    }
  } catch (error) {
    throw Error(error);
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
    } else {
      res.status(404);
      throw new Error("No Members were found to delete.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View a Member
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
    } else {
      res.status(404);
      throw new Error("Member not found.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Update a Member
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
      res.status(404);
      throw new Error("The Member you are trying to update doesn't exist.");
    }
  } catch (error) {
    throw Error(error);
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
      res.status(404);
      throw new Error("The Member you are trying to delete does not exist.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Login Member
// @route   POST /api/v1/members/login
// @access  Private
const loginMember = asyncHandler(async (req, res) => {
  const { idDocumentNumber, password } = req.body;

  try {
    // Check for member ID Document Number
    const member = await Member.findOne({ idDocumentNumber });
    if (member) {
      //Check if raw password and encripted password is the same
      if (await bcrypt.compare(password, member.password)) {
        res.status(200).json({
          _id: member.id,
          idDocumentNumber: member.idDocumentNumber,
          email: member.email,
          name: member.name,
          surname: member.surname,
          token: generateToken(member._id),
        });
      } else {
        res.status(401);
        throw new Error("Invalid credential (User and/or Password).");
      }
    } else {
      res.status(404);
      throw new Error("ID Document number doesn't match with any Member.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Get logged-in Member data
// @route   GET /api/v1/members/profile/current
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  try {
    res.status(200).json(await Member.findById(req.member.id));
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View all Payments made for a Member
// @route   GET /api/v1/members/:id/payments
// @access  Private
const viewMemberPayments = asyncHandler(async (req, res) => {
  try {
    if (await Member.findById(req.params.id)) {
      const memberPayments = await Payment.find({
        member: req.params.id,
      }).exec();
      // Check if the given Member has any Payment
      if (memberPayments.length) {
        res.status(200).json(memberPayments);
      } else {
        res.status(404);
        throw new Error("No Payments were found for the given Member.");
      }
    } else {
      res.status(404);
      throw new Error("Member given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete all Payments made for a Member
// @route   DELETE /api/v1/members/:id/payments
// @access  Private
const deleteMemberPayments = asyncHandler(async (req, res) => {
  try {
    if (await Member.findById(req.params.id)) {
      const count = await Payment.find({
        member: req.params.id,
      }).countDocuments();
      // Check if any Payment was found.
      if (count > 0) {
        await Payment.deleteMany({ member: req.params.id });
        res.status(200).json({
          message: `${count} Payments made from Member ${req.params.id} have been deleted.`,
        });
      } else {
        res.status(404);
        throw new Error("No Payments were found for the given Member.");
      }
    } else {
      res.status(404);
      throw new Error("Member given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    View all Enrolments for a Member
// @route   GET /api/v1/members/:id/enrolments
// @access  Private
const viewMemberEnrolments = asyncHandler(async (req, res) => {
  try {
    if (await Member.findById(req.params.id)) {
      const memberEnrolments = await Enrolment.find({
        member: req.params.id,
      }).exec();
      // Check if the given Member has any Enrolment.
      if (memberEnrolments.length) {
        res.status(200).json(memberEnrolments);
      } else {
        res.status(404);
        throw new Error("No Enrolments were found for the given Member.");
      }
    } else {
      res.status(404);
      throw new Error("Member given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
  }
});

// @desc    Delete all Enrolments for a Member
// @route   DELETE /api/v1/members/:id/enrolments
// @access  Private
const deleteMemberEnrolments = asyncHandler(async (req, res) => {
  try {
    if (await Member.findById(req.params.id)) {
      const count = await Enrolment.find({
        member: req.params.id,
      }).countDocuments();
      // Check if any Enrolment was found.
      if (count > 0) {
        await Enrolment.deleteMany({ member: req.params.id });
        res.status(200).json({
          message: `${count} Enrolments for Member ${req.params.id} have been deleted.`,
        });
      } else {
        res.status(404);
        throw new Error("No Enrolments were found for the given Member.");
      }
    } else {
      res.status(404);
      throw new Error("Member given doesn't exists.");
    }
  } catch (error) {
    throw Error(error);
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
