
const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema(
  {
    requesterName: {
      type: String,
      required: true
    },

    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
    },

    units: {
      type: Number,
      required: true,
      min: 1
    },

    city: {
      type: String,
      required: true
    },

    hospital: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    urgency: {
      type: String,
      enum: ["Normal", "Urgent", "Emergency"],
      default: "Normal"
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Donor Contacted",
        "Accepted",
        "Completed",
        "Cancelled"
      ],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BloodRequest", bloodRequestSchema);
