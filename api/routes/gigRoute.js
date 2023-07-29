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
router.delete("/deleteGig/:id", verifyToken, deleteGig);
router.get("/getGig/:id", verifyToken, getGig);
router.get("/getGigs", verifyToken, getGigs);

module.exports = router;
