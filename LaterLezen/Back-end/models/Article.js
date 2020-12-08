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
  tags: [],
  tags2: [String],
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Article", ArticleSchema);