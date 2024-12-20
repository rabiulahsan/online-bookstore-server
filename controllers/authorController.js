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

//post a user after signup
const postAuthor = async (req, res) => {
  const newAuthor = req.body;
  const query = { email: newAuthor.email };

  try {
    // Check if the author already exists
    const exist = await authorsCollection.findOne(query);
    if (exist) {
      return res.status(409).send({ message: "Author already exists" });
    }
    // Insert new doctor
    const result = await authorsCollection.insertOne(newAuthor);

    if (result.insertedId) {
      res.status(201).send({
        message: "Author created successfully",
        authorId: result.insertedId,
      });
    } else {
      res.status(500).send({ message: "Failed to create doctor" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
};

module.exports = { getAllAuthors };
