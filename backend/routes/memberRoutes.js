const express = require("express");
const router = express.Router();
const {
  getMembers,
  setMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.route("/").get(getMembers).post(setMember);
router.route("/:id").put(updateMember).delete(deleteMember);

module.exports = router;
