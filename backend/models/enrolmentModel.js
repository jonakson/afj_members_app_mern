const mongoose = require("mongoose");

const enrolmentSchema = mongoose.Schema(
  {
    member: {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Member",
      },
      activity: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Activity",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Enrolment", enrolmentSchema);
