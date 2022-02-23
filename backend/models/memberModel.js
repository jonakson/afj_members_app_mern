const mongoose = require("mongoose");

const memberSchema = mongoose.Schema(
  {
    idDocumentNumber: {
      type: String,
      required: [true, "Please, add an ID document number."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please, add a email address."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please, add a password."],
    },
    name: {
      type: String,
      required: [true, "Please, add your name."],
    },
    surname: {
      type: String,
      required: [true, "Please, add your surname."],
    },
    phone: {
      type: String,
      required: [true, "Please, add your phone number."],
    },
    dob: {
      type: Date,
      required: [true, "Please, add your date of birdth."],
    },
    entryDate: {
      type: Date,
      required: [true, "Please, add a entry date."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: [true, "Please, select if it's Admin."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Member", memberSchema);
