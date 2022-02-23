const asyncHandler = require("express-async-handler");

// @desc    Get Members
// @route   GET /api/v1/members
// @access  Private
const getMembers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Members" });
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

  res.status(200).json({ message: "Set Member" });
});

// @desc    Update Member
// @route   PUT /api/v1/members/:id
// @access  Private
const updateMember = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Member ${req.params.id}` });
});

// @desc    Delete Member
// @route   DELETE /api/v1/members/:id
// @access  Private
const deleteMember = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Member ${req.params.id}` });
});

module.exports = {
  getMembers,
  setMember,
  updateMember,
  deleteMember,
};
