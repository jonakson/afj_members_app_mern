const express = require("express");
const router = express.Router();
const {
  registerMember,
  loginMember,
  getMe,
} = require("../controllers/memberController");

router.post("/", registerMember);
router.post("/login", loginMember);
router.get("/me", getMe);

//router.route("/").get(getMembers).post(setMember);
//router.route("/:id").put(updateMember).delete(deleteMember);

module.exports = router;
