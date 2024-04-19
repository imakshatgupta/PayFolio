const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./config/dbConnect");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");

const PORT = process.env.PORT || 8000;
dbConnect();

app.get("/", async (req, res) => {
  res.redirect("http://localhost:5173/");
});

app.use("/users", userRoutes);
app.use("/company", companyRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
