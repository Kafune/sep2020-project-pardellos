const express = require("express");
const router = express.Router();
const Article = require("../models/Article");
const User = require("../models/User")

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
   * @body link, user_id, tags
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
router.get("/article/:id", (req, res) => {
  const id = req.params.id
  Article.findOne({ _id: id }, (err, article) => {
    if (!article)
      res.status(400).json({
        error: true,
      });
    else {
      res.send(article)
    }
  })
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

router.put("/testing/tags", (req, res) =>{
  let tags = ["programmeren", "Python", "multithreading"]
  let article = {title: "test1233"}
  let art = new Article(article)
  art.tags2 = tags
  art.save()
  res.json(art)
})

router.get("/testing/art/:tag", (req, res) =>{
  let tag = req.params.tag
  Article.find({tags2: {$in : tag}}, (err, art)=>{
    res.json(art)
  })
})


module.exports = router;
