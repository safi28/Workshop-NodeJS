const mongoose = require("mongoose");

const accessoryScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  cubes: [{ type: mongoose.Types.ObjectId, ref: "Cube" }],
});

module.exports = mongoose.model("Accessories", accessoryScema);
