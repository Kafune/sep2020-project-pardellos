const express = require("express");
const router = express.Router();
const Article = require("../models/Article");


router.put("/new", (req, res) => {
  const { extract } = require("article-parser");

  const url = req.body.url;
  console.log(url);

  extract(url)
    .then((article) => {
      res.send(article);
      let art = new Article(article);
      art.save();
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/", async (req, res) => {
  const result = await Article.find({});
  res.send(result);
});

module.exports = router;
