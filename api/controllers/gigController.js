const gigModel = require("../models/gigModel");

const createGig = async (req, res) => {
  if (!req.isSeller)
    return res
      .status(404)
      .json({ message: "You have to be a seller to do that." });

  let data = req.body;
  Object.keys(data).forEach((key) => {
    if (data[key] === "" || data[key] === null) {
      delete data[key];
    }
  });

  const newGig = new gigModel({
    userId: req.userId,
    ...data,
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGig = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGig = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGigs = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGig,
  getGig,
  getGigs,
  deleteGig,
};
