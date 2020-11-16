const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  links: {},
  url: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  source: {
    type: String,
  },
  published: {
    type: String,
  },
  ttr: {
    type: String,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
