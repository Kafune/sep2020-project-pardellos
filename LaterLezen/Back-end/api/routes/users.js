const { DocumentProvider } = require("mongoose");
const db = require("../modules/dbConnector");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");

module.exports = function (expressApp) {
  /**
   * @type ExpressSocket.
   * @description Checks a new username and email for uniqueness and checks password for strength. Hashes the password and then creates a new account in the database
   * @param empty
   * @body {username, emailaddress, password}
   * @returns nothing
   * @async
   * @memberof app
   */
  expressApp.post("/sign_up", bodyParser.json(), async (req, res) => {
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (await user.exists({ username: req.body.username })) {
      res.send(
        "This username is already in use. Please try a different username"
      );
    } else if (await user.exists({ email: req.body.email })) {
      res.send(
        "This e-mailaddress is already in use. Please try a different e-mailaddress"
      );
    } else if (!re.test(req.body.password)) {
      res.send(
        "This password is not acceptable. Please Make sure your password has 8 to 20 character, atleast 1 uppercase letter, atleast 1 lowercase letter and atleast 1 digit."
      );
    } else {
      await bcrypt.hash(req.body.password, 10, function (err, hash) {
        let data = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
        };
        db.collection("Accounts").insertOne(data, function (err, collection) {
          if (err) throw err;
          console.log("Record inserted Successfully");
        });
      });
      res.send("Account created succesfully!");
    }

    //return res.redirect('signup_success.html');
  });
  /**
   * @type ExpressSocket.
   * @description Checks if username exists and if so if password hashes match. Then logs user in.
   * @param empty
   * @body {username, password}
   * @returns nothing
   * @async
   * @memberof app
   */
  expressApp.post("/login", bodyParser.json(), async (req, res) => {
    user.findOne({ username: req.body.username }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, function (
          err,
          result
        ) {
          if (err) {
            res.json({ error: err });
          }
          if (result) {
            let token = jwt.sign(
              { username: user.username },
              "verySecretValue",
              { expiresIn: "1h" }
            );
            res.json({ message: "Login successful!", token });
          } else {
            res.json({
              message: "Password does not match!",
            });
          }
        });
      } else {
        res.json({ message: "User not found!" });
      }
    });
  });

  /**
   * @type ExpressSocket.
   * @description Checks if username exists and if so if password hashes match. Then logs user in.
   * @param empty
   * @body {username, password}
   * @returns nothing
   * @async
   * @memberof app
   */
  expressApp.get("/logout", bodyParser.json(), async (req, res) => {});
};
