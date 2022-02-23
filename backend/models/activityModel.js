const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
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
      price: {
        type: String,
        required: [true, "Please, add the price."],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
