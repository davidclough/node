const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

// https://www.youtube.com/watch?v=UzCkSzmEq8E

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.listen(3000, () => {
  console.log("server sarted on port 3000");
})

// node server
