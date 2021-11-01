var express = require("express");
var router = express.Router();
const axios = require("axios");
const AWS = require("aws-sdk");

const bucketName = "n10164138-aws-bucket"; // Name of the bucket

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

// Store data in S3
async function storeData(data) {
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

  var url = "http://localhost:3000/s3/get_data?key=" + query;

  var config = createConfig("get", url);

  // Array containing all id's associated with the query
  var tweetArray = await axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });

  if (tweetArray.message == "Not Found") {
    tweetArray = [];
  }

  tweetArray.push(JSON.stringify(data)); // Push the new tweet to the tweet json object

  // Push the data to S3
  var body = JSON.stringify(tweetArray);
  const params = { Bucket: bucketName, Key: query, Body: body };
  try {
    const uploadPromise = new AWS.S3({ apiVersion: "2006-03-01" })
      .putObject(params)
      .promise();
    uploadPromise
      .then((data) => {
        console.log(
          "Successfully uploaded data to " + bucketName + "/" + query
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
}

router.post("/store", (req, res) => {
  storeData(req.body);
});

router.get("/get_data", (req, res) => {
  const s3Key = req.query.key;
  const params = { Bucket: bucketName, Key: s3Key };
  new AWS.S3({ apiVersion: "2006-03-01" }).getObject(params, (err, result) => {
    if (result) {
      var resultJSON = JSON.parse(result.Body);
      res.status(200).send(resultJSON);
    } else {
      res.status(200).send({ message: "Not Found" });
    }
  });
});

router.get("/all_tweets", (req, res) => {
  getAllTweets();
});

module.exports = router;
