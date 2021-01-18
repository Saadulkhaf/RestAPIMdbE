const express = require("express");
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("At home page");
});

app.listen("3000");
