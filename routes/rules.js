var express = require("express");
var router = express.Router();
var needle = require("needle");
var axios = require("axios");

// Url for the twitter rules API.
var rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";

// Function for creating config for the axios requests.
function createConfig(method, data) {
  var config = {
    method: method,
    url: "https://api.twitter.com/2/tweets/search/stream/rules",
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return config;
}

router.get("/", (req, res) => {
  const query = req.query;

  needle
    .get("localhost:3000/rules/getRules")
    .on("data", (data) => {
      console.log(data);
      var jsonString = JSON.stringify(data);
      res.status(200).render("rules", { data: jsonString });
    })
    .on("err", (err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.get("/getrules", (req, res) => {
  needle
    .get(rulesURL, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      timeout: 20000,
    })
    .on("data", (data) => {
      res.status(200).send(data);
    })
    .on("err", (err) => {
      console.log(err);
    });
});

// Create a new rule
router.post("/edit_rules", (req, res) => {
  var config = createConfig("post", req.body);

  axios(config)
    .then((response) => {
      res.status(200).send(JSON.stringify(response.data));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
