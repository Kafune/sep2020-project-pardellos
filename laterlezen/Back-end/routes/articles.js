const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.put("/new", (req, res) => {
  const { extract } = require("article-parser");

  const url = req.body.url;

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
  const allArticles = [];
  const result = await Article.find({});

  result.forEach(element => {
    const articles = {
      _id: '',
      title: '',
      description: ''
    };

    articles._id = element._id
    articles.title = element.title
    articles.description = element.description

    allArticles.push(articles)
  });

  res.send(allArticles);
});

module.exports = router;
