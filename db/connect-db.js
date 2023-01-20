const mongoose = require("mongoose");

const connect = async (url) => {
  return await mongoose
    .connect(url)
    .then(() => console.log("successfully connected to DB"))
    .catch((err) => console.log(err));
};

module.exports = connect;
