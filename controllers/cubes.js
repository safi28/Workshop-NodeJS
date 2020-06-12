const { cubeModel } = require("../models");

const getCubes = async () => {
  const cubes = await cubeModel.find().lean();
  return cubes;
};

const getCube = async (id) => {
  const cube = await cubeModel.findById(id).populate("accessories").lean();
  return cube;
};

const deleteCube = async (id) => {
  const cube = await cubeModel.findOneAndDelete(id);
  return cube;
};

module.exports = {
  getCubes,
  getCube,
  deleteCube,
};
