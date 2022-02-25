const express = require("express");
const router = express.Router();
const {
  viewAllActivities,
  viewActivity,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

router.get("/", viewAllActivities);
router.get("/:id", viewActivity);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

module.exports = router;
