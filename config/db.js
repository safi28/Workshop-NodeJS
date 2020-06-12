const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.set('useFindAndModify', false);

  return mongoose.connect(config.development.dbURL, {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
  });
};
