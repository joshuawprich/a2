var express = require('express');
var router = express.Router();
const axios = require('axios');
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;

const keys = {
    API_KEY: 'QmW1wnzCrOjNA51jCrSuS4KSR',
    API_SECRET_KEY: 'zf1FRVgegAVq4ZmlcQajaY98oIryeZZoQj7ZeyDfifTXeWudI8',
    BEARER_TOKEN:  'AAAAAAAAAAAAAAAAAAAAAH0xUwEAAAAAUfwjS4cTHSJ582JTRSgemuUN8wc%3DWRh5XT93aRmNNRcApsBOWLjGJLhx5hZJo72gXvC7fbeCs2zb14',
}

var options = {
    method: "GET",
    url: "https://api.twitter.com/2/tweets/search/recent?query=hey&max_results=10",
    headers : {
        Authorization: `Bearer ${keys.BEARER_TOKEN}` 
    }

}

function AnalyzeText(text) {
    var analyzer = new Analyzer("English", stemmer, "afinn");
    var spltText = text.split(" ");
    console.log(analyzer.getSentiment(spltText));    
}

// Touch the twitter end point
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  const query = (req.query.query);

  axios
    .request(options)
    .then(function (response) {
        // res.status(200).send(response.data);
        let data = response.data.data[0].text;
        console.log(data);
        AnalyzeText(data);
        res.render('index', {data: data});
    })
    .catch(function (err){
        res.status(400).send(err);
        console.log(err);
    })
});

module.exports = router;
