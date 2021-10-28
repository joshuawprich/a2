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

// async function analyseTweet(tweet) {
//   const url = "http://192.168.0.125:3000/natural?tweet=" + tweet;

//   const res = await fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return res.json();
// }

async function getStream() {
  // Clear the current tweet stream
  tweetStream.innerHTML = "";

  var streamHREF = "ws://13.239.21.182:8080/";

  const streamSocket = new WebSocket(streamHREF);

  streamSocket.addEventListener("open", function (event) {
    console.log("connected to stream");
  });

  streamSocket.addEventListener("message", function (event) {
    var data = JSON.parse(event.data).data;
    analyzeSocket.send(JSON.stringify(data));
  });

  analyzeSocket.addEventListener("message", (event) => {
    createTweet(event.data);
  });
}

document.getElementById("streamBtn").onclick = getStream;
