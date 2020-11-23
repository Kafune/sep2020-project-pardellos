const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

/**
   * @type ExpressSocket.
   * @description Retrieves all articles from the DB
   * @param empty
   * @body empty
   * @returns [{article}, {article}, ...]
   * @async
   * @memberof app
   */
router.get("/", async (req, res) => {
  const result = await Article.find({});
  res.send(result);
});

/**
   * @type ExpressSocket.
   * @description Saves a new article from a given link
   * @param empty
   * @body link, user_id
   * @returns nothing
   * @async
   * @memberof app
   */
router.put("/article", async (req, res) => {
  
  let userid = req.body.user_id;

  let doesExist = await Article.exists({ links: url });
  if (!doesExist) {
    let processedTags = [];
    let rawTags = []

    rawTags = req.body.tags

    processedTags = rawTags
      .map(function (value) {
        return value.toLowerCase();
      })
      .sort();
    // console.log("lowecase and sorted tags: " + processedTags);
    const uniqueTags = new Set(processedTags);
    processedTags = [...uniqueTags];
    // console.log("Lowercase, sorted and unique tags: " + processedTags);

    extract(url)
      .then((article) => {
        let newArticle = new Article(article);
        newArticle.user_id = userid;
        newArticle.tags = processedTags;
        newArticle.save();
        res.send(newArticle)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.sendStatus(409);
  }
});

/**
   * @type ExpressSocket.
   * @description Gets a specific article based on ID
   * @param empty
   * @body article_id
   * @returns {article}
   * @async
   * @memberof app
   */
router.get("/article/:id", async (req, res) => {
  id = req.params.id;
  let doesExist = await Article.exists({ _id: id });

  if (doesExist) {
    let article = await Article.find({ _id: id });
    res.send(article);
    await Article.updateOne({ _id: id }, { read: true });
  } else {
    res.sendStatus(409);
  }
});

/**
   * @type ExpressSocket.
   * @description Deletes a specific article from the DB
   * @param empty
   * @body article_id
   * @returns nothing
   * @async
   * @memberof app
   */
router.delete("/article", async (req, res) => {
  let url = String(req.body.url);
  let doesExist = await Article.exists({ links: url });

  if (doesExist) {
    await Article.deleteOne({ links: url });
    res.sendStatus(200);
  } else {
    res.sendStatus(409);
  }
});



/**
   * @type ExpressSocket.
   * @description Retrieved all articles with given user_id
   * @param empty
   * @body user_id
   * @returns [{article}, {article}, ...]
   * @async
   * @memberof app
   */
router.get("/user/:id", async (req, res) => {
  let userid = req.params.id
  console.log(userid);

  let allArticles = await Article.find({ _id: userid });
  res.send(allArticles);
});

module.exports = router;
