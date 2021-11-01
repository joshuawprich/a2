var express = require("express");
var router = express.Router();
var axios = require("axios");

var numRules = 0;

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
  var config = createConfig("get");
  axios(config)
    .then((response) => {
      numRules = response.data.meta.result_count;
      res.status(200).render("rules", { data: JSON.stringify(response.data) });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/get_rules", (req, res) => {
  var config = createConfig("get");
  axios(config)
    .then((response) => {
      res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create a new rule
router.post("/edit_rules", (req, res) => {
  var config = createConfig("post", req.body);

  if (Object.keys(req.body) == "add") {
    if (numRules > 0) {
      res.status(200).send({
        meta: { summary: { created: 0 } },
        errors: {
          0: {
            title:
              "Max number of Rules Reached, Please delete a rule before adding another.",
          },
        },
      });
    } else {
      axios(config)
        .then((response) => {
          res.status(200).send(JSON.stringify(response.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    axios(config)
      .then((response) => {
        res.status(200).send(JSON.stringify(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
