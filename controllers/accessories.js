const { accessoryModel } = require("../models")
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')

const getAccessories = async () => {
  const accessories = await accessoryModel.find().lean()
  return accessories
}

const attachedAccessories = async (cubeId) => {
  try {
    const cube = await Cube.findById(cubeId).lean()
    const accessories = await Accessory.find({ cubes: { $nin: cubeId } }).lean()
    return { cube, accessories }
  } catch (err) {
    return err
  }
}

const postAccessories = async (id, accessoryId) => {
  await Cube.findByIdAndUpdate(id, {
    $addToSet: {
      accessories: accessoryId
    }
  })
};

module.exports = { getAccessories, attachedAccessories, postAccessories }
