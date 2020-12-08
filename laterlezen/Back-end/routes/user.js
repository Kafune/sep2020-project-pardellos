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

router.post("/register", (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  //Back-end account checks. Can be adjusted at any time
  // For now, only checks if email format is valid with regex, and the password length.
  let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let minPasswordLength = 7;

  if (emailFormat.test(email)) {
    if (password.length > minPasswordLength) {
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
    } else {
      res.status(500).json({
        message: {
          msgBody: "Password must be 7 characters or longer.",
          msgError: true,
        },
      });
    }
  } else {
    res.status(500).json({
      message: {
        msgBody: "Wrong email format.",
        msgError: true,
      },
    });
  }
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
            req.user.title = req.body.title
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
);

router.put("/article", (req, res) => {
  Article.findOne({
    _id: req.body.article_id,
  }, (err, article) => {
    console.log(article)

    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Error has occured",
          msgError: true
        }
      });
    } else {
      if (!req.body.title == "") article.title = req.body.title
      if (!req.body.author == "") article.author = req.body.author
      if (!req.body.description == "") article.description = req.body.description
      if (!req.body.source == "") article.source = req.body.source
      article.save();
      res.json(article);
    }
  })
})

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
router.put("/testing/tags", (req, res) => {
  let tags = [
    "programmeren",
    "Javascript",
    "React",
    "mapping",
    "objectmapping",
  ];
  let article = { title: "test3" };
  let art = new Article(article);
  art.tags2 = tags;
  art.save();
  res.json(art);
});

router.get("/testing/art/:tag", (req, res) => {
  let tag = req.params.tag;
  Article.find({ tags2: { $in: tag } }, (err, art) => {
    res.json(art);
  });
});

// route to edit the tags list
router.put("/testing/art/:title", (req, res) => {
  let taglist = req.body.taglist;
  let title = req.params.title;

  Article.updateOne(
    { title: title },
    { $set: { tags2: taglist } },
    (err, art) => {
      res.json(art);
    }
  );
});

router.post(
  "/articleExtension",
  (req, res) => {
    const findUser = User.findOne({ email: req.body.email })
      .then((response) => {
        if (response) {
          console.log(response)
          const { extract } = require("article-parser");
          let url = String(req.body.url);
          const article = new Article(req.body);
          console.log(article);
          extract(url)
            .then((article) => {
              let newArticle = new Article(article);
              newArticle.tags = req.body.tags;
              newArticle.title = req.body.title;
              newArticle.save((err) => {
                if (err) {
                  res.status(500).json({
                    message: {
                      msgBody: "Error 2 has occured",
                      msgError: true,
                    },
                  });
                } else {
                  response.articles.push(newArticle);
                  response.save()
                  res.send(newArticle);
                }
              })
            })
        } else {
          res.status(500).json({
            message: {
              msgBody: "Error 1 has occured",
              msgError: true
            }
          })
        }
      })
  }
);

router.put(
  "/preference",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    if (
      req.body.theme === "default" ||
      req.body.theme === "typewriter" ||
      req.body.theme === "dark" ||
      req.body.theme === "bluegrey" ||
      req.body.theme === "darkblue"
    ) {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { preferences: req.body.theme }
      ).catch(() => {
        res.status(500).json({
          message: {
            msgBody: "Error has occured",
            msgError: true,
          },
        });
      });
      res.send(req.body.theme);
    } else {
      res.status(500).json({
        message: {
          msgBody: "Error has occured",
          msgError: true,
        },
      });
    }
  }
);

router.get(
  "/preference",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    var query = await User.findOne({ _id: req.user._id }).select("preferences");
    res.send(JSON.stringify(query.preferences));
  }
);

module.exports = router;
