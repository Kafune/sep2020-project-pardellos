const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decode = jwt.verify(token, "verySecretValue");
    console.log(decode);
    req.user = decode
    res.json({message: "Authentication Successfull, welcome back " + decode.username})
  } catch (error) {
    res.json({ message: "Authentication failed!" });
  }
};
module.exports = authenticate;
