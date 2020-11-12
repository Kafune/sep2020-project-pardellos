const { DocumentProvider } = require("mongoose");
const db = require("../modules/dbConnector");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("../models/userSchema");

module.exports = function (expressApp) {
  expressApp.get("/login", bodyParser.json(), async (req, res) => {
    let hash = (await user.findOne({username: req.body.username}))
    bcrypt.compare(req.body.password, hash.password, function(err, result) {
        if(!result) {
            res.send("Wrong password!")
        } else {
            res.send("Login succesfull!")
        }
    });

    //return res.redirect('signup_success.html');
  });
};
