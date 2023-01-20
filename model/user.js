const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  schedules: [{ type: Schema.Types.ObjectId, ref: "Schedules" }],
});

User.pre("save", async function () {
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

User.methods.comparePassword = async function (password) {
  console.log(password);
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", User);
