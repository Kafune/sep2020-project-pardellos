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
    let processedTags = processTags(rawTags);
    var t0 = performance.now();
    extract(url)
      .then((article) => {
        description = article.description;
      })
      .catch((err) => {});
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
            User.exists(
              {
                _id: req.user._id,
              },
              (err, result) => {
                let tagList = req.user.tags;
                handleUserNestedTags(processedTags, tagList);
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
          if (!req.body.title == "") article.title = req.body.title;
          if (!req.body.author == "") article.author = req.body.author;
          if (!req.body.description == "")
            article.excerpt = req.body.description;
          if (!req.body.source == "") article.domain = req.body.source;
          if (!req.body.tags[0] == "") {
            let processedTags = processTags(req.body.tags);
            article.tags = processedTags;
            req.user.tags = handleUserNestedTags(processedTags, req.user.tags);
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

router.post("/articleExtension", (req, res) => {
  console.log(req.body.email);
  let description;
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (user) {
      const { extract } = require("article-parser");
      let url = String(req.body.url);
      extract(url)
        .then((article) => {
          description = article.description;
        })
        .catch((err) => {
          console.log(err);
        });
      Mercury.parse(url)
        .then((response) => {
          let newArticle = new Article(response);
          if (!req.body.title == "") newArticle.title = req.body.title;
          if (description != null) newArticle.excerpt = description;
          newArticle.save((err) => {
            if (err)
              res.status(500).json({
                message: {
                  msgBody: "Error 3 has occured",
                  msgError: true,
                },
              });
            else {
              user.articles.push(newArticle);
              user.save((err) => {
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
        .catch((err) => console.log("Error: ", err));
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

function processTags(rawTags) {
  let processedTags = [];
  console.log(rawTags);
  processedTags.forEach((element) => {
    processedTags = element.map(function (value) {
      return value.toLowerCase();
    });
  })
  const uniqueTags = new Set(processedTags);
  processedTags = [...uniqueTags];
  return processedTags;
}

function handleUserNestedTags(processedTags, tagArray){
  createTree(processedTags)
  console.dir(createTree(data), { depth: 1000 });
  console.dir(theTree, { depth: 1000 });
}

let theTree = {
  tagName: "/",
  parent: null,
  subTags: [],
};

function createTree(data) {
  const node = (tagName, parent = null) => ({ tagName, parent, subTags: [] });
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
  const TOP_NAME = "Top",
    top = node(TOP_NAME);
  for (const children of data) {
    let parent = theTree;
    for (const name of children) {
      let index = children.indexOf(name);
      console.log(index);
      const found = findNamed(name, parent);
      parent = found ? found : addNode(parent, node(name, parent.tagName));
    }
  }
  return top;
}

router.put(
  "/tags/edit",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
      const tree = req.body.tree;
      const tagName = req.body.tagName;
      const childName = req.body.childName;
      const newName = req.body.newName;

      // const user = await User.
    }
);



function findInTree(treeNode, filterFunc) {
  if (filterFunc(treeNode)) {
    return treeNode;
  } else if (treeNode.subTags && treeNode.subTags.length > 0) {
    let childResult = undefined;
    for (child of treeNode.subTags) {
      childResult = findInTree(child, filterFunc);
      if (childResult) {
        break;
      }
    }
    return childResult;
  } else {
    return undefined;
  }
  throw "THIS SHOULD NEVER HAPPEN";
}

function addChild(tree, tagName, childName) {
  const parent = findInTree(tree, (treenode) => treenode.tagName === tagName);
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }
  if (parent.subTags == undefined) {
    parent.subTags = [];
  }
  parent.subTags.push({ tagName: childName, subTags: [] });
}

function deleteChild(tree, tagName, childName) {
  const parent = findInTree(tree, (treenode) => treenode.tagName === tagName);
  const tempArray = [];
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }
  if (parent.subTags.length > 0 && parent.subTags) {
    console.log(parent.subTags);
    parent.subTags.forEach((element) => {
      tempArray.push(element.tagName);
    });

    const index = tempArray.indexOf(childName);
    if (index > -1) {
      parent.subTags.splice(index, 1);
    }
  }
}

function editChild(tree, tagName, childName, newName) {
  const parent = findInTree(tree, (treenode) => treenode.tagName === tagName);
  const tempArray = [];
  if (!parent) {
    throw "PARENT '" + tagName + "' NOT FOUND";
  }

  if (parent.subTags && parent.subTags.length > 0) {
    parent.subTags.forEach((element) => {
      tempArray.push(element.tagName);
    });
    const index = tempArray.indexOf(childName);

    parent.subTags[index].tagName = newName
  }
}

module.exports = router;
