const mongoose = require("mongoose");

const membershipSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, add a name."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please, add a description."],
    },
    durationYears: {
      type: Number,
      required: [true, "Please, add a duration in years."],
    },
    price: {
      type: Number,
      required: [true, "Please, add the price."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);
