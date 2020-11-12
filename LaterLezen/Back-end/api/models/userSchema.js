const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
}, {timestamp: true});

module.exports = mongoose.model("LaterLezen", userSchema, "Accounts");