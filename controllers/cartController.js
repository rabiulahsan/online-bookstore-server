const { db } = require("../utils/dbconnection");
const { ObjectId } = require("mongodb");
const cartsCollection = db.collection("carts");

// get all carts
const getAllCarts = async (req, res) => {};

module.exports = { getAllCarts };
