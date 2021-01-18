const mongoose = require("mongoose");
const express = require("express");
const app = express();
const postsRoute = require("./routes/posts");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.send("At Home");
});
// connecting to database

mongoose.connect(
  "mongodb://127.0.0.1:27017/restdb",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

app.listen("3000");
