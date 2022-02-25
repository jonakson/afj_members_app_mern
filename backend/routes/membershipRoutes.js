const express = require("express");
const router = express.Router();
const {
  viewAllMemberships,
  viewMembership,
  createMembership,
  updateMembership,
  deleteMembership,
} = require("../controllers/membershipControler");

router.get("/", viewAllMemberships);
router.get("/:id", viewMembership);
router.post("/", createMembership);
router.put("/:id", updateMembership);
router.delete("/:id", deleteMembership);

module.exports = router;
