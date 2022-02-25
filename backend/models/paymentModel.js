const mongoose = require("mongoose");

const PAYMENTTYPE = ["MEMBERSHIP", "ACTIVITY"];

const paymentSchema = mongoose.Schema(
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
        ref: "Membership",
        ref: "Activity",
      },
      paymentType: {
        type: String,
        require: true,
        enum: PAYMENTTYPE,
      },
      paymentDate: {
        type: Date,
        required: [true, "Please, add a the payment date."],
      },
      comment: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
