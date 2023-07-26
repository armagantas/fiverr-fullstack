const userSchema = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const user = await userSchema.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const detailUser = await userSchema.findById(id);
    res.status(200).json({
      detailUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("You are not authenticated");

    jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
      if (err) return res.status(403).send("Invalid token!");

      const user = await userSchema.findById(req.params.id);
      if (!user) return res.status(404).send("User not found!");

      if (payload.id !== user._id.toString()) {
        return res.status(403).send("You can delete only your account!");
      }

      await userSchema.findByIdAndDelete(user._id);
      return res.status(200).json({ message: "User has been deleted" });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserById, deleteUser, getAllUsers };
