const express = require("express");
const router = express.Router();
const {
  getMembers,
  setMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");

router.get("/", getMembers);

router.post("/", setMember);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

module.exports = router;
