const mongoose = require("mongoose");

const MetadataSchema = new mongoose.Schema({
  expiredCount: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  distributedCount: {
    type: String,
    required: [true, "Please fill up this field"],
  },
});

module.exports =
  mongoose.models.Metadata || mongoose.model("Metadata", MetadataSchema);
