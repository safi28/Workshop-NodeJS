const { accessoryModel, cubeModel } = require("../models");

const getAccessories = async () => {
  const accessories = await accessoryModel.find().lean();
  return accessories;
};

const attachedAccessories = async (cubeId) => {
  try {
    const cube = await Cube.findById(cubeId).lean()
    const accessories = await Accessory.find({ cubes: { $nin: cubeId } }).lean()
    return { cube, accessories }
  } catch (err) {
    return err
  }
}

module.exports = { getAccessories, attachedAccessories };
