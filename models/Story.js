const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  user_id: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  image: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  status: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  caption: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Story || mongoose.model("Story", StorySchema);
