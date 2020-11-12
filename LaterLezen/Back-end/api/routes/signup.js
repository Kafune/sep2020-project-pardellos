const { DocumentProvider } = require("mongoose");
const db = require("../modules/dbConnector");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("../models/userSchema");

module.exports = function (expressApp) {
  expressApp.post("/sign_up", bodyParser.json(), async (req, res) => {
    let re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (await user.exists({ username: req.body.username })) {
      res.send("This username is already in use. Please try a different username");
    } else if (await user.exists({ email: req.body.email })) {
      res.send("This e-mailaddress is already in use. Please try a different e-mailaddress");
    } else if (!(re.test(req.body.password))) {
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
};
