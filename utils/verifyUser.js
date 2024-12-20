//verify  user

const { db } = require("./dbconnection");

const usersCollection = db.collection("users");

const verifyUser = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  console.log(user);
  if (user?.role !== "user") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};

module.exports = verifyUser;
