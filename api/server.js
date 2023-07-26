const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const conservationRoute = require("./routes/conservationRoute");
const gigRoute = require("./routes/gigRoute");
const messageRoute = require("./routes/messageRoute");
const reviewRoute = require("./routes/reviewRoute");
const orderRoute = require("./routes/orderRoute");
const authRoute = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

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
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/gig", gigRoute);
app.use("/api/order", orderRoute);
app.use("/api/message", messageRoute);
app.use("/api/conservation", conservationRoute);
app.use("/api/review", reviewRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.status || "Something went wrong";

  return res.status(errorStatus).send(errorMessage);
});

const PORT = 8800;

app.listen(PORT, () => {
  db();
  console.log("server is running on port: 8800");
});
