var express = require("express");
var router = express.Router();
var needle = require("needle");

var rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";

router.get("/", (req, res) => {
  const query = req.query;

  if (query.action == "delete") {
    // Get the rules that need to be deleted
    needle.get("localhost:3000/rules/getRules").on("data", (data) => {
      var ids = [];
      data.data.forEach((rule) => {
        ids.push(rule.id);
      });
      console.log(ids);
      // Post the id's of the rules that need to be deleted
      needle.post("localhost:3000/rules/deleterules", {
        body: "hi",
      });
    });
  }

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

router.post("/postrules", (req, res) => {
  //Do nothing yet
});

router.get("/hey", (req, res) => {
  res.send("hey");
});

router.post("/deleterules", (req, res) => {
  console.log(req.body);
  needle
    .post(rulesURL, req.body)
    .on("data", (data) => {
      console.log(data);
    })
    .on("err", (err) => {
      console.log(err);
    });
});

module.exports = router;
