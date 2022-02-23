// @desc    Get Members
// @route   GET /api/v1/members
// @access  Private
const getMembers = (req, res) => {
  res.status(200).json({ message: "Get Members" });
};

// @desc    Set Member
// @route   POST /api/v1/members
// @access  Private
const setMember = (req, res) => {
  res.status(200).json({ message: "Set Member" });
};

// @desc    Update Member
// @route   PUT /api/v1/members/:id
// @access  Private
const updateMember = (req, res) => {
  res.status(200).json({ message: `Update Member ${req.params.id}` });
};

// @desc    Delete Member
// @route   DELETE /api/v1/members/:id
// @access  Private
const deleteMember = (req, res) => {
  res.status(200).json({ message: `Delete Member ${req.params.id}` });
};

module.exports = {
  getMembers,
  setMember,
  updateMember,
  deleteMember,
};
