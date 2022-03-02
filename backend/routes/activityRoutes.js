const express = require("express");
const router = express.Router();
const {
  viewAllActivities,
  viewActivity,
  deleteAllActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  viewActivityEnrolments,
  deleteActivityEnrolments,
  viewActivityPayments,
  deleteActivityPayments,
} = require("../controllers/activityController");

router.post("/", createActivity);
router.get("/", viewAllActivities);
router.delete("/", deleteAllActivities);
router.get("/:id", viewActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);
router.get("/:id/enrolments", viewActivityEnrolments);
router.delete("/:id/enrolments", deleteActivityEnrolments);
router.get("/:id/payments", viewActivityPayments);
router.delete("/:id/payments", deleteActivityPayments);

module.exports = router;
