const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const Schedules = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    enum: ["open", "booked"],
    default: "open",
  },
  bookedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Schedules", Schedules);
