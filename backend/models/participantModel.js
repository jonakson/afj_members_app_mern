const mongoose = require("mongoose");

const participantSchema = mongoose.Schema(
  {
    member: {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Member",
      },
      membership: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Activity",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participant", participantSchema);
