const { db } = require("../utils/dbconnection");

const authorsCollection = db.collection("authors");

// get all doctors
const getAllAuthors = async (req, res) => {
  try {
    const result = await authorsCollection.find().toArray();
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

module.exports = { getAllAuthors };
