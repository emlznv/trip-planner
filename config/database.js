const mongoose = require("mongoose");
const config = require("../config/index");

module.exports = () => {
  return mongoose.connect(config.dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((data) => {
    console.log("Connected to database successfully!");
    return data;
  });
};
