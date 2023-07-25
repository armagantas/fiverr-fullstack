const userSchema = require("../models/userModel");

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const detailUser = await userSchema.findById(id);
    res.status(200).json({
      detailUser,
    });
    console.log("ÇALIŞIYOR MU AMK");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserById };
