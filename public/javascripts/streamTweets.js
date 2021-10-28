const tweetStream = document.getElementById("tweetStream");

function createTweet(tweet) {
  let tweetJson = JSON.parse(tweet);
  var HTML =
    "<div>" +
    "<p>Text: " +
    tweetJson.text +
    "</p>" +
    "<p>id: " +
    tweetJson.id +
    "</p>" +
    "<p>Sentiment: " +
    tweetJson.sentiment +
    "</p>" +
    "</div>";
  tweetStream.innerHTML += HTML;
}

async function getStream() {
  // Clear the current tweet stream
  tweetStream.innerHTML = "";

  var href = "ws://192.168.0.125:8080/";

  const socket = new WebSocket(href);

  await fetch("http://192.168.0.125:8080/", {
    headers: { "Access-Control-Allow-Origin": "*" },
  })
    .then((res) => {
      if (res.status == 200) {
        console.log(res.status);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  socket.addEventListener("open", function (event) {
    console.log("connected to stream");
  });

  socket.addEventListener("message", function (event) {
    createTweet(event.data);
  });
}

document.getElementById("streamBtn").onclick = getStream;