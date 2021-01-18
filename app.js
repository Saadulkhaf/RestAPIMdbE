const mongoose = require("mongoose");
const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("At home page");
});

// connecting to database

mongoose.connect(
  "mongodb://127.0.0.1:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db");
  }
);

app.listen("3000");
