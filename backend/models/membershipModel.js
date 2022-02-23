const mongoose = require("mongoose");

const membershipSchema = mongoose.Schema(
  {
    idDocumentNumber: {
      name: {
        type: String,
        required: [true, "Please, add a name."],
        unique: true,
      },
      description: {
        type: String,
        required: [true, "Please, add a description."],
      },
      durationDays: {
        type: Number,
        required: [true, "Please, add a duration in days."],
      },
      price: {
        type: String,
        required: [true, "Please, add the price."],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
