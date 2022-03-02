const express = require("express");
const router = express.Router();
const {
  createEnrolment,
  viewAllEnrolments,
  deleteAllEnrolments,
  viewEnrolment,
  updateEnrolment,
  deleteEnrolment,
  viewMyEnrolments,
} = require("../controllers/enrolmentController");

// FIXME Protect all routes.
router.post("/", createEnrolment);
router.get("/", viewAllEnrolments);
router.delete("/", deleteAllEnrolments);
router.get("/:id", viewEnrolment);
router.put("/:id", updateEnrolment);
router.delete("/:id", deleteEnrolment);
router.get("/myenrolments", viewMyEnrolments);

module.exports = router;
