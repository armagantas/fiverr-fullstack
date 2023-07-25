const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB has connected.");
    })
    .catch((err) => {
      console.log(err);
    });
};

const PORT = 8800;

app.listen(PORT, () => {
  db();
  console.log("server is running on port: 8800");
});
