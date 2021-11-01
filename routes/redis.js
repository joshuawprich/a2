var express = require("express");
var router = express.Router();
const axios = require("axios");
const redis = require("redis");

function createConfig(method, url, data) {
  var config = {
    method: method,
    url: url,
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return config;
}

async function storeData(redisClient, data) {
  var config = createConfig(
    "get",
    "https://api.twitter.com/2/tweets/search/stream/rules"
  );

  // Get the current query
  var query = await axios(config)
    .then((response) => {
      return response.data.data[0].value;
    })
    .catch((err) => {
      console.log(err);
    });

  var tweet = data;

  redisClient.get(query, (err, reply) => {
    if (reply) {
      // If the query hit
      reply = JSON.parse(reply); // Parse the query
      if (reply.length) {
        // If the query is currently an array
        reply.push(tweet);
        reply = JSON.stringify(reply);
        redisClient.set(query, reply);
      } else {
        // Not currently an array
        var array = [];
        array.push(reply);
        array.push(tweet);
        array = JSON.stringify(array);
        redisClient.set(query, array);
      } // If the query did not hit
    } else {
      tweet = JSON.stringify(tweet);
      redisClient.set(query, tweet);
    }
  });

  console.log("REDIS STORED");
}

router.post("/store", (req, res) => {
  var redisClient = req.app.redisClient;
  storeData(redisClient, req.body);
});

router.get("/get_data", (req, res) => {
  const key = req.query.key;
  var redisClient = req.app.redisClient;

  redisClient.get(key, (err, value) => {
    res.status(200).send(value);
  });
});

module.exports = router;
