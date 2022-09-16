const mongoose = require("mongoose");

const PantrySchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  user_id: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  pantryImage: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  pantryName: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  aboutUs: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  address: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  contact: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  guideline: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  status: {
    type: String,
    required: [true, "Please fill up this field"],
  },
  supply: {
    type: [
      {
        quantity: { type: Number },
        name: { type: String },
        image: { type: String },
      },
    ],
    required: [true, "Please fill up this field"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Pantry || mongoose.model("Pantry", PantrySchema);
