const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../config/passport");
const JWT = require("jsonwebtoken");
const Mercury = require("@postlight/mercury-parser");
var ObjectID = require('mongodb').ObjectID;
const {
  PerformanceObserver,
  performance
} = require("perf_hooks");
const {
  extract
} = require("article-parser");
const User = require("../models/User");
const Article = require("../models/Article");

const signToken = (userID) => {
  return JWT.sign({
    iss: "Laterlezen",
    sub: userID,
  },
    "LaterLezen", {
    expiresIn: "1h",
  }
  );
};

router.get("/test/warning/no/delete", async (req, res) => {
  await User.deleteMany({});
  res.sendStatus(200);
});

router.post("/register", (req, res) => {
  const {
    email,
    password,
    firstname,
    lastname
  } = req.body;
  User.findOne({
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
      const {
        _id,
        email,
        firstname,
        lastname
      } = req.user;
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
    let url = String(req.body.url);
    let rawTags = req.body.tags;
    let description;

    let processedTags = [];
    processedTags = rawTags.map(function (value) {
      return value.toLowerCase();
    });
    const uniqueTags = new Set(processedTags);
    processedTags = [...uniqueTags];
    var t0 = performance.now();
    extract(url)
      .then((article) => {
        description = article.description;
      })
      .catch((err) => {
        console.log(err);
      });
    var t1 = performance.now();
    console.log("Call to articleparser took " + (t1 - t0) + " milliseconds.");
    var t2 = performance.now();
    Mercury.parse(url)
      .then((response) => {
        let newArticle = new Article(response);
        if (!req.body.title == "") newArticle.title = req.body.title;
        if (description != null) newArticle.excerpt = description;
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
            User.exists({
              _id: req.user._id,
            },
              (err, result) => {
                let tagList = req.user.tags
                handleUserNestedTags(processedTags, tagList)

                
              
                
                var t1 = performance.now();
                console.log("Tag loop took " + (t1 - t0) + " milliseconds.");
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

router.put("/article", (req, res) => {
  Article.findOne({
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
        if (!req.body.title == "") article.title = req.body.title;
        if (!req.body.author == "") article.author = req.body.author;
        if (!req.body.description == "") article.excerpt = req.body.description;
        if (!req.body.source == "") article.source = req.body.source;
        article.save();
        res.json(article);
      }
    }
  );
});

router.delete("/article", (req, res) => {
  Article.deleteOne({
    _id: req.body.article_id,
  },
    (err, article) => {
      console.log(err);
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
    User.updateOne({
      _id: req.user._id,
    }, {});
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
    const {
      firstname,
      lastname,
      email,
      tags
    } = req.user;
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

router.post("/articleExtension", (req, res) => {
  const findUser = User.findOne({
    email: req.body.email,
  }).then((response) => {
    if (response) {
      console.log(response);
      const {
        extract
      } = require("article-parser");
      let url = String(req.body.url);
      const article = new Article(req.body);
      console.log(article);
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

function handleUserNestedTags(processedTags, tagList){
  class Tag {
    constructor(value) {
      (this.tagName = value), (this.subTags = []), (this._id = new ObjectID);
    }
  }

  switch (processedTags.length) {
    case 1:
      if (tagList.some((element) => element.tagName === processedTags[0])) {} else {
        let tag = new Tag(processedTags[0]);
        tagList.push(tag);
      }
      break;

    case 2:
      if (tagList.some((element) => element.tagName === processedTags[0])) {
        index = tagList.findIndex((x) => x.tagName === processedTags[0]);
        if (
          tagList[index].subTags.some((element) => element.tagName === processedTags[1])
        ) {} else {
          let tag = new Tag(processedTags[1]);
          tagList[index].subTags.push(tag);
        }
      } else {
        let tag = new Tag(processedTags[0]);
        tagList.push(tag);
        tag = new Tag(processedTags[1]);
        tagList[1].subTags.push(tag);
      }
      break;

    case 3:
      if (tagList.some((element) => element.tagName === processedTags[0])) {
        index = tagList.findIndex((x) => x.tagName === processedTags[0]);
        if (
          tagList[index].subTags.some((element) => element.tagName === processedTags[1])
        ) {
          index2 = tagList[index].subTags.findIndex(
            (x) => x.tagName === processedTags[1]
          );
          if (
            tagList[index].subTags[index2].subTags.some(
              (element) => element.tagName === processedTags[2]
            )
          ) {} else {
            let tag = new Tag(processedTags[2]);
            tagList[index].subTags[index2].subTags.push(tag);
          }
        } else {
          let tag = new Tag(processedTags[1]);
          tagList[index].subTags.push(tag);
          tag = new Tag(processedTags[2]);
          tagList[index].subTags[
            tagList[index].subTags.length - 1
          ].subTags.push(tag);
        }
      } else {
        let tag = new Tag(processedTags[0]);
        tagList.push(tag);
        tag = new Tag(processedTags[1]);
        tagList[tagList.length - 1].subTags.push(tag);
        tag = new Tag(processedTags[2]);
        tagList[tagList.length - 1].subTags[0].subTags.push(tag);
      }
      break;

  }
}

module.exports = router;