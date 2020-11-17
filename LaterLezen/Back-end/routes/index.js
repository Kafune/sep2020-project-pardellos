const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Article = require("../models/Article");

// @desc    Login/Landing page
// @route   Get /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Dashboard
// @route   Get /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
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
