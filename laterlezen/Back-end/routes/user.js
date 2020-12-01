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
    {
      expiresIn: "1h",
    }
  );
};

router.get("/test/warning/no/delete", async (req, res) => {
  await User.deleteMany({})
  res.sendStatus(200)
})

router.post("/register", (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  User.findOne(
    {
      email,
    },
    (err, user) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Error 1 has occured",
            msgError: true,
          },
        });
      if (user)
        res.status(400).json({
          message: {
            msgBody: "Username already taken",
            msgError: true,
          },
        });
      else {
        const newUser = new User({
          email,
          password,
          firstname,
          lastname,
        });
        newUser.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "Error 2 has occured",
                msgError: true,
              },
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
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, email, firstname, lastname } = req.user;
      const token = signToken(_id);
      console.log(req.user);
      res.cookie("access_token", token, {
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).json({
        isAuthenticated: true,
        email,
        firstname,
        lastname,
        tags: req.user.tags,
        _id,
      });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({
      user: {
        email: "",
      },
      succes: true,
    });
  }
);

router.post(
  "/article",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const { extract } = require("article-parser");
    let url = String(req.body.url);
    const article = new Article(req.body);
    console.log(article);
    article.save((err) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Error 3 has occured",
            msgError: true,
          },
        });
      else {
        let rawTags = req.body.tags;
        let userTags = req.user.tags;
        let processedTags = [];
        processedTags = rawTags
          .map(function (value) {
            return value.toLowerCase();
          })
          .sort();
        console.log("lowecase and sorted tags: " + processedTags);
        const uniqueTags = new Set(processedTags);
        processedTags = [...uniqueTags];
        console.log("Lowercase, sorted and unique tags: " + processedTags);

        extract(url)
          .then((article) => {
              let newArticle = new Article(article);
              newArticle.tags = processedTags;
              newArticle.save((err) => {
                if (err)
                  res.status(500).json({
                    message: {
                      msgBody: "Error 3 has occured",
                      msgError: true,
                    },
                  });
                else {
                  let allTags = userTags.concat(processedTags);
                  const allUniqueTags = new Set(allTags);
                  allTags = [...allUniqueTags];
                  req.user.tags = allTags;
                  req.user.articles.push(newArticle);
                  req.user.save((err) => {
                    if (err)
                      res.status(500).json({
                        message: {
                          msgBody: "Error 4 has occured",
                          msgError: true,
                        },
                      });
                    else res.send(newArticle);
                  });
                }
              });
            

          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
);

router.get(
  "/articles",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    User.findById({
      _id: req.user._id,
    })
      .populate("articles")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occured",
              msgError: true,
            },
          });
        else {
          res.status(200).json({
            articles: document.articles,
            authenticated: true,
          });
        }
      });
  }
);

router.put(
  "/tag",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    User.updateOne(
      {
        _id: req.user._id,
      },
      {}
    );
  }
);

/**
 * @type ExpressSocket.
 * @description Retrieves all articles with given tag(s), tags are OR not AND
 * @param empty
 * @body tags
 * @returns [{article}, {article}, ...]
 * @async
 * @memberof app
 */
router.put(
  "/tags",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    let tags = req.body.tags;
    User.findById({
      _id: req.user._id,
    })
      .populate({
        path: "articles",
        match: {
          tags: {
            $all: tags,
          },
        },
      })
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occured",
              msgError: true,
            },
          });
        else {
          res.status(200).json({
            articles: document.articles,
            authenticated: true,
          });
        }
      });
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    const { firstname, lastname, email, tags } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: {
        email,
        firstname,
        lastname,
        tags,
      },
    });
  }
);

module.exports = router;
