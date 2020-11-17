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

router.get("/user/:postid", async (req, res) => {
  let userid = req.params.postid
  console.log(userid);
  let allArticles = await Article.find({user_id : userid})
  res.send(allArticles)
});

module.exports = router;