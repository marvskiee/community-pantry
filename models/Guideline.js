const mongoose = require("mongoose");

const GuidelineSchema = new mongoose.Schema({
  guideline: {
    type: String,
    required: [true, "Please fill up this field"],
  },
});

module.exports =
  mongoose.models.Guideline || mongoose.model("Guideline", GuidelineSchema);
