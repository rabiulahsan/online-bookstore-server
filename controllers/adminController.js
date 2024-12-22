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

module.exports = { getAllAdmins };
