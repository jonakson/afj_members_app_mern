const mongoose = require("mongoose");

const LINKEDTOTYPE = ["MEMBERSHIP", "ACTIVITY"];

const paymentSchema = mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Member",
    },
    paymentLinkedTo: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    paymentLinkedToType: {
      type: String,
      require: true,
      enum: LINKEDTOTYPE,
    },
    paymentDate: {
      type: Date,
      required: [true, "Please, add a the payment date."],
    },
    comments: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
