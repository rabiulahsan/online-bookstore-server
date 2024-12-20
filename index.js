const express = require("express");
const app = express();
const cors = require("cors");
const { run, db } = require("./utils/dbconnection");
const userRoutes = require("./routes/usersRoute");
const jwtRoute = require("./routes/jwtRoute");
const authorRoute = require("./routes/authorRoute");
const verifyJWT = require("./utils/verifyJWT");
const verifyAuthor = require("./utils/verifyAuthor");
const verifyUser = require("./utils/verifyUser");
require("dotenv").config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

run();

//routes
app.use("/jwt", jwtRoute);
app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoute);

//test
app.get("/", (req, res) => {
  res.send("Server is running....");
});

//get logged user from database

const authorsCollection = db.collection("authors");
const usersCollection = db.collection("users");
const adminsCollection = db.collection("admins");

app.get("/api/getuser", verifyJWT, async (req, res) => {
  try {
    const email = req.query.email;

    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    }

    // Query the authors collection
    const author = await authorsCollection.findOne({ email: email });
    if (author) {
      return res.send({ success: true, user: author, role: "author" });
    }

    // Query the users collection
    const user = await usersCollection.findOne({ email: email });
    if (user) {
      return res.send({ success: true, user: user, role: "user" });
    }

    // Query the admins collection
    const admin = await adminsCollection.findOne({ email: email });
    if (admin) {
      return res.send({ success: true, user: admin, role: "admin" });
    }

    // If no user is found in any collection
    res.status(404).send({ success: false, message: "User not found" });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});

// Protected test route
app.get("/test-protected", verifyJWT, (req, res) => {
  res.send({ message: "You have access to this protected route." });
});

//only author
app.get("/test-author", verifyJWT, verifyAuthor, (req, res) => {
  res.send({ message: "You have access to this author protected route." });
});

//only user
app.get("/test-user", verifyJWT, verifyUser, (req, res) => {
  res.send({ message: "You have access to this user protected route." });
});

app.listen(port, () => {
  console.log(`Running on port no ${port}`);
});
