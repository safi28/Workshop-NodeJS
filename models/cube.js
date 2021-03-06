const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  imageUrl: String,
  difficulty: Number,
  accessories: [{ type: mongoose.Types.ObjectId, ref: "Accessories" }],
  creatorId: String
});

cubeSchema.path('imageUrl').validate(function(url){
  return url.startsWith('http') || url.startsWith('https')
}, 'Image url is invalid')

module.exports = mongoose.model("Cube", cubeSchema)
