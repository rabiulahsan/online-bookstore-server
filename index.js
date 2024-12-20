const express = require("express");
const app = express();
const cors = require("cors");
const { run } = require("./utils/dbconnection");
const userRoutes = require("./routes/usersRoute");
const jwtRoute = require("./routes/jwtRoute");
const authorRoute = require("./routes/authorRoute");
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

// // Protected test route
// app.get("/test-protected", verifyJWT, (req, res) => {
//   res.send({ message: "You have access to this protected route." });
// });

// //only author
// app.get("/test-doctor", verifyJWT, verifyDoctor, (req, res) => {
//   res.send({ message: "You have access to this doctor protected route." });
// });

// //only user
// app.get("/test-user", verifyJWT, verifyUser, (req, res) => {
//   res.send({ message: "You have access to this user protected route." });
// });

app.listen(port, () => {
  console.log(`Running on port no ${port}`);
});
