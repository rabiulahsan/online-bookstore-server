//verify  user

const { db } = require("./dbconnection");

const adminsCollection = db.collection("admins");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await adminsCollection.findOne(query);
  console.log(user);
  if (user?.role !== "admin") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};

module.exports = verifyAdmin;
