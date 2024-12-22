const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const adminsCollection = db.collection("admins");

//get all admin
const getAllAdmins = async (req, res) => {
  try {
    const result = await adminsCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const isAdmin = async (req, res) => {
  const email = req.query.email;
  if (req.decoded.email !== email) {
    return res.send({ isAdmin: false });
  }
  const query = { email: email };
  const user = await adminsCollection.findOne(query);
  const result = { isAdmin: user?.role === "admin" };
  res.send(result);
};

module.exports = { getAllAdmins, isAdmin };
