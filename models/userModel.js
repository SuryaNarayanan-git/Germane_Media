const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  history: [
    {
      type: { type: String },
      activity: { type: String },
      points: { type: Number },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
