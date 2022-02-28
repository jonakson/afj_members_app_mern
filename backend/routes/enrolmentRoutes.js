const express = require("express");
const router = express.Router();
const {
  viewAllEnrolments,
  viewEnrolment,
  createEnrolment,
  updateEnrolment,
  deleteEnrolment,
} = require("../controllers/enrolmentController");

router.get("/", viewAllEnrolments);
router.get("/:id", viewEnrolment);
router.post("/", createEnrolment);
router.put("/:id", updateEnrolment);
router.delete("/:id", deleteEnrolment);

module.exports = router;
