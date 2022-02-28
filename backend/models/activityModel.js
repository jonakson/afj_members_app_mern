const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
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
    coordinator: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "Please, select an activity coordinator member."],
      ref: "Member",
    },
    date: {
      type: Date,
      required: [true, "Please, add the date."],
    },
    capacity: {
      type: Number,
      required: [true, "Please, add the capacity."],
    },
    place: {
      type: String,
      required: [true, "Please, add the place."],
    },
    isPaid: {
      type: Boolean,
      required: [true, "Please, select if is paid or not."],
      default: false,
    },
    price: {
      type: String,
      required: [true, "Please, add the price."],
      default: "0.00",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
