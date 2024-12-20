//verify doctor

const { db } = require("./dbconnection");

const authorsCollection = db.collection("authors");

const verifyAuthor = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const author = await authorsCollection.findOne(query);
  //   console.log(author);
  if (author?.role !== "author") {
    return res.status(403).send({ error: true, message: "forbidden message" });
  }
  next();
};

module.exports = verifyAuthor;
