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

app.post("/subscribe", (req, res) => {
  if (!req.body.captcha) {
    return res.json({ "success": false, "msg": "Please select captcha" });
  }

  const secretKey = "6LdaCDIUAAAAAOVAK2nEtmER5YWd1CV5y8sYQcMQ";
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);

    // NOTE: This gets logged to the console window where the node is being run from. Only client-side code in index.html will display in browser console.
    console.log(body);

    if (body.success !== undefined && !body.success) {
      return res.json({ "success": false, "msg": "Failed captcha verification" });
    }
    return res.json({ "success": true, "msg": "Captcha passed" });
  });
});

app.listen(3000, () => {
  console.log("server sarted on port 3000");
})

// node server              because this file is called server.js
// nodemon
