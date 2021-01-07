const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const JWT = require("jsonwebtoken");
const Mercury = require("@postlight/mercury-parser");
const ObjectID = require("mongodb").ObjectID;
const { PerformanceObserver, performance } = require("perf_hooks");
const { extract } = require("article-parser");
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

  // Back-end account checks. Can be adjusted at any time
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
            let defaultTag = {
              tagName: "/",
              subTags: [],
            };
            newUser.tags = defaultTag;
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
    let url = String(req.body.url);
    let rawTags = req.body.tags;
    let description;
    //let processedTags = processTags(rawTags);
    var t0 = performance.now();
    extract(url)
      .then((article) => {
        description = article.description;
      })
      .catch((err) => { });
    var t1 = performance.now();
    console.log("Call to articleparser took " + (t1 - t0) + " milliseconds.");
    var t2 = performance.now();
    Mercury.parse(url)
      .then((response) => {
        let newArticle = new Article(response);
        if (!req.body.title == "") newArticle.title = req.body.title;
        if (description != null) newArticle.excerpt = description;
        newArticle.tags = rawTags;
        newArticle.save((err) => {
          if (err)
            res.status(500).json({
              message: {
                msgBody: "Error 3 has occured",
                msgError: true,
              },
            });
          else {
            User.exists(
              {
                _id: req.user._id,
              },
              (err, result) => {
                // let templist = [];
                // templist.push(processedTags);
                // CHANGE TEMPLIST. FRONT-END SHOULD SEND ARRAY OF ARRAYS
                handleUserNestedTags(rawTags, req.user.tags);
                var t1 = performance.now();
                console.log("Tag loop took " + (t1 - t0) + " milliseconds.");
                req.user.articles.push(newArticle);
                req.user.markModified("tags");
                req.user.save((err) => {
                  if (err)
                    res.status(500).json({
                      message: {
                        msgBody: "Error 4 has occured",
                        msgError: true,
                      },
                    });
                  else {
                    res.json(req.user);
                  }
                });
              }
            );
          }
        });
      })
      .catch((err) => console.log("Error: ", err));
    var t3 = performance.now();
    console.log("Call to mercury took " + (t3 - t2) + " milliseconds.");
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
  "/article",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    Article.findOne(
      {
        _id: req.body.article_id,
      },
      (err, article) => {
        if (err)
          res.status(500).json({
            message: {
              msgBody: "Error has occured",
              msgError: true,
            },
          });
        else {
          article.title = req.body.title;
          article.author = req.body.author;
          article.excerpt = req.body.description;
          article.domain = req.body.source;
          if (!req.body.tags[0] == "") {
            article.tags = req.body.tags;
            handleUserNestedTags(req.body.tags, req.user.tags);
            req.user.markModified("tags");
            req.user.save();
          }
          article.save();
          res.json(article);
        }
      }
    );
  }
);

router.delete("/article", (req, res) => {
  Article.deleteOne(
    {
      _id: req.body.article_id,
    },
    (err, article) => {
      if (err)
        res.status(500).json({
          message: {
            msgBody: "Error has occured",
            msgError: true,
          },
        });
      else {
        res.status(200).json({
          message: {
            msgBody: "succes",
            msgError: false,
          },
        });
      }
    }
  );
});

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
          "tags": tags
        },
      })
      .exec((err, document) => {
        if (err) {
          res.status(500).json({
            message: {
              msgBody: "Error has occured",
              msgError: true,
            },
          });
        }
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
  let article = {
    title: "test3",
  };
  let art = new Article(article);
  art.tags2 = tags;
  art.save();
  res.json(art);
});

router.get("/testing/art/:tag", (req, res) => {
  let tag = req.params.tag;
  Article.find(
    {
      tags2: {
        $in: tag,
      },
    },
    (err, art) => {
      res.json(art);
    }
  );
});

router.put("/testing/art/:title", (req, res) => {
  let taglist = req.body.taglist;
  let title = req.params.title;

  Article.updateOne(
    {
      title: title,
    },
    {
      $set: {
        tags2: taglist,
      },
    },
    (err, art) => {
      res.json(art);
    }
  );
});

router.post("/articleExtension", (req, res) => {
  console.log(req.user);
  req.body.tags = []
  const findUser = User.findOne({
    email: req.body.email,
  }).then((response) => {
    if (response) {
      const { extract } = require("article-parser");
      let url = String(req.body.url);
      const article = new Article(req.body);
      extract(url).then((article) => {
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
            response.save();
            res.send(newArticle);
          }
        });
      });
    } else {
      res.status(500).json({
        message: {
          msgBody: "Error 1 has occured",
          msgError: true,
        },
      });
    }
  });
});

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
        {
          _id: req.user._id,
        },
        {
          preferences: req.body.theme,
        }
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
    var query = await User.findOne({
      _id: req.user._id,
    }).select("preferences");
    res.send(JSON.stringify(query.preferences));
  }
);

// function processTags(rawTags) {
//   let processedTags = [];
//   processedTags = rawTags.map(function (value) {
//     return value.toLowerCase();
//   });
//   const uniqueTags = new Set(processedTags);
//   processedTags = [...uniqueTags];
//   return processedTags;
// }

function handleUserNestedTags(data, userTags) {
  const node = (tagName, parent = null) => ({ tagName, parent, _id: new ObjectID, subTags: [] });
  const addNode = (parent, child) => (parent.subTags.push(child), child);
  const findNamed = (name, parent) => {
    for (const child of parent.subTags) {
      if (child.tagName === name) {
        return child;
      }
      const found = findNamed(name, child);
      if (found) {
        return found;
      }
    }
  };
  const TOP_NAME = "/",
    top = node(TOP_NAME);
  for (const children of data) {
    let parent = userTags;
    for (const name of children) {
      const found = findNamed(name, parent);
      parent = found ? found : addNode(parent, node(name, parent.tagName));
    }
  }
  return top;
}

module.exports = router;
