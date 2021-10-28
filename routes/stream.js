var express = require("express");
var router = express.Router();
var needle = require("needle");

// Import the natural analizers
const Analyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;

function analizeText(data) {
  // Create a new Analyser
  var analyzer = new Analyzer("English", stemmer, "afinn");
  // Grab text from JSON and split into and array
  var textArray = data.text.split(" ");
  var sentiment = analyzer.getSentiment(textArray);
  data.sentiment = sentiment;
  return data;
}

function sendData(data, wss) {
  var clients = wss.clients;
  clients.forEach((client) => {
    console.log(data);
    client.send(JSON.stringify(data));
  });
}

// URL for connecting to the twitter stream.
const streamUrl = "https://api.twitter.com/2/tweets/search/stream";

/**
 * Function for connecting the the twitter stream.
 *
 * @param {The amount of time the stream has tried to reconnect} retryAttempt
 * @param {The websocket of the user connected} ws
 * @returns
 */
function streamConnect(retryAttempt, wss) {
  const stream = needle.get(streamUrl, {
    headers: {
      "User-Agent": "sampleStreamTest",
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
    timeout: 20000,
  });

  stream
    .on("data", (data) => {
      try {
        const json = JSON.parse(data);
        var tweet = analizeText(json.data);
        sendData(tweet, wss);
        //ws.send(JSON.stringify(tweet));
        retryAttempt = 0;
      } catch (err) {
        if (data.status === 401) {
          console.log(data);
          process.exit(1);
        } else if (
          data.detail ===
          "This steam is currently at the maximum allowed connection limit."
        ) {
          console.log(data.detail);
          process.exit(1);
        } else {
          //Do nothing
        }
      }
    })
    .on("err", (error) => {
      if (error.code !== "ECONNRESET") {
        console.log(error.code);
        process.exit(1);
      } else {
        setTimeout(() => {
          console.warn("A connection error occurred. Reconnecting...");
          streamConnect(++retryAttempt, ws);
        }, 2 ** retryAttempt);
      }
    });
  return stream;
}

// Touch the twitter end point
router.get("/", function (req, res) {
  req.app.wss.on("connection", function (ws) {
    console.log("New Connection");
    console.log("Number of connected clients is: " + req.app.wss.clients.size);
    streamConnect(0, req.app.wss);
  });
  res.status(200).send("Done");
});

module.exports = router;
