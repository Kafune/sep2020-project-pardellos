const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");
const Article = require("../models/Article");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Laterlezen",
      sub: userID,
    },
    "LaterLezen",
    { expiresIn: "1h" }
  );
};

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error 1 has occured", msgError: true } });
    if (user)
      res.status(400).json({
        message: { msgBody: "Username already taken", msgError: true },
      });
    else {
      console.log(username + password);
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error 2 has occured", msgError: true },
          });
        else
          res.status(200).json({
            message: {
              msgBody: "Account sucessfully created",
              msgError: false,
            },
          });
      });
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username } });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, succes: true });
  }
);

router.post(
  "/article",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const article = new Article(req.body);
    article.save((err) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error 3 has occured", msgError: true },
        });
      else {
        req.user.articles.push(article);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error 4 has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "succesfully saved article",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

router.get(
  "/articles",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("articles")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ articles: document.articles, authenticated: true });
        }
      });
  }
);

router.get('/authenticated', passport.authenticate('jwt', {session:false}), (req,res)=>{
    const {username} = req.user
    res.status(200).json({isAuthenticated: true, user: {username}})
})

module.exports = router;
