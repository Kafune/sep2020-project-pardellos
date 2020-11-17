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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Article", ArticleSchema);
