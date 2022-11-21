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
  // guideline: {
  //   type: String,
  //   required: [true, "Please fill up this field"],
  // },
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
        date_added: { type: Date },
        expiration_date: { type: Date },
      },
    ],
    required: [true, "Please fill up this field"],
  },
  reason: {
    type: {
      r1: { type: Boolean },
      r2: { type: Boolean },
      r3: { type: Boolean },
      r4: { type: Boolean },
      other: { type: String },
      deleted_by: { type: String },
    },
  },
  open: {
    type: Date,
  },
  close: {
    type: Date,
  },
  expiration: {
    type: Date,
  },
  expirationCount: {
    type: String,
  },
  distributedCount: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Pantry || mongoose.model("Pantry", PantrySchema);
