const { DocumentProvider } = require("mongoose");
const db = require("../modules/dbConnector");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const authenticate = require('../middleware/authenticate')

module.exports = function (expressApp) {
expressApp.get('/',authenticate, (req, res) => res.send("welcome"))
}