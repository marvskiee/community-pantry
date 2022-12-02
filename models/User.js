const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please fill up this field"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please fill up this field"],
  },
  password: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  code: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    required: [true, "Please fill up this field"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
