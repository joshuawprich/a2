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

  const socket = new WebSocket("ws://192.168.0.125:3000/stream");

  await fetch("/stream")
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
