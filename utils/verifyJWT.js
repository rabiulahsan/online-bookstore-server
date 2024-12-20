const jwt = require("jsonwebtoken");
require("dotenv").config();

//create verifyJWT function
const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  //   console.log(authorization);
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }

  // bearer token
  const token = authorization.split(" ")[1];
  // console.log(token);
  // console.log(process.env.ACCESS_TOKEN);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).send({ error: true, message: err.message });
    }
    req.decoded = decoded;
    next();
  });
};

module.exports = verifyJWT;
