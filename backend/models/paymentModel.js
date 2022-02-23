const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    idDocumentNumber: {
      member: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Member",
      },
      membership: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Membership",
      },
      paymentDate: {
        type: Date,
        required: [true, "Please, add a the payment date."],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
