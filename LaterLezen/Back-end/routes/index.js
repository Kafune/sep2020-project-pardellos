const { response } = require("express");
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// @desc    Login/Landing page
// @route   Get /
router.get("/", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});


// @desc    Dashboard
// @route   Get /dashboard
router.get("/dashboard",  async (req, res) => {
  try {
    const articles = await Article.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.Google.firstName,
      //articles
    });
  } catch (err) {
    console.log(err);
    res.render("error/500");
  }
});

module.exports = router;
