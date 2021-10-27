var express = require("express");
var router = express.Router();
var needle = require("needle");
var WebSocket = require("ws");

const streamUrl = "https://api.twitter.com/2/tweets/sample/stream";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Twitter" });
});

module.exports = router;
