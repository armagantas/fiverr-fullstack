const userSchema = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

const userRegister = async (req, res, next) => {
  try {
    const { username, email, password, country, img, isSeller, desc } =
      req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await userSchema.create({
      password: passwordHash,
      username: username,
      email: email,
      country: country,
      img: img,
      isSeller: isSeller,
      desc: desc,
    });

    res.status(201).json({
      status: "OK",
      newUser,
      message: "User has been created.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "This user does not exist." });

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare)
      return res.status(500).json({ message: "Passwords don't match" });

    const token = await jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      user,
      username: user.username,
      id: user._id,
      isSeller: user.isSeller,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userLogout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out");
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
};
