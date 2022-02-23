const asyncHandler = require("express-async-handler");
const Member = require("../models/memberModel");

// @desc    Get Members
// @route   GET /api/v1/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();
  res.status(200).json(members);
});

// @desc    Set Member
// @route   POST /api/v1/members
// @access  Private
const setMember = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // Bad request
    res.status(400);
    throw new Error("Please add a text field.");
  }

  const member = await Member.create({
    text: req.body.text,
  });

  res.status(200).json(member);
});

// @desc    Update Member
// @route   PUT /api/v1/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("Member not found.");
  }

  const updatedMember = await Member.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMember);
});

// @desc    Delete Member
// @route   DELETE /api/v1/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    res.status(400);
    throw new Error("Member not found.");
  }

  await member.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getMembers,
  setMember,
  updateMember,
  deleteMember,
};
