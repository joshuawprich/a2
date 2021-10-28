var express = require("express");
var router = express.Router();
// Import the natural analizers
const Analyzer = require("natural").SentimentAnalyzer;
const stemmer = require("natural").PorterStemmer;

function analyseTweet(tweet) {
  // Create a new Analyser
  var analyzer = new Analyzer("English", stemmer, "afinn");
  // Grab text from JSON and split into and array
  var textArray = tweet.text.split(" ");
  var sentiment = analyzer.getSentiment(textArray);
  tweet.sentiment = sentiment;
  return tweet;
}

router.get("/", (req, res) => {
  try {
    var tweet = JSON.parse(req.query.tweet).data;
    tweet = analyseTweet(tweet);
    console.log(tweet);
    res.send({ data: tweet });
  } catch {
    //Do nothing
  }
});

module.exports = router;
