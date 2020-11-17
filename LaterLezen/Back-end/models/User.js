const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Local :{
    email: {
      type: String,
      required: true,
    },
    voornaam: {
      type: String,
      required: true,
    },
    achternaam: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    }
  },
  Google: {
    googleId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
