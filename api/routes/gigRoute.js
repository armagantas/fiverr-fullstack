const express = require("express");
const verifyToken = require("../middleware/jwt");
const {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} = require("../controllers/gigController");

const router = express.Router();

router.post("/createGig", verifyToken, createGig);

module.exports = router;
