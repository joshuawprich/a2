/**
 * This script is resposible for handling all the tweets that
 * the server grabs from the stream.
 */

const tweetStream = document.getElementById("tweetStream");

// Create a tweet HTML object using the data pulled from the API
function createTweet(tweet) {
  let tweetJson = JSON.parse(tweet);
  var HTML =
    "<div id=tweetBox>" +
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

/**
 * Function for connecting to the Twitter API Stream. Connects a Web Socket to
 * the stream server to allow tweets to be sent throug.
 */
async function getStream() {
  // Clear the current tweet stream
  tweetStream.innerHTML = "";

  // Url of the server, retrieve the env variables
  var url = "http://" + window.location.hostname + ":3000/env";
  const response = await fetch(url);
  const envData = await response.json();

  // Connection to the Socket of the Stream Server
  const streamSocket = new WebSocket(envData.STREAM_IP);

  // Listen for connection
  streamSocket.addEventListener("open", function (event) {
    console.log("connected to stream");
  });

  /**
   * Recieve data from the stream server and send it
   * back to the server to be analysed for sentiment.
   */
  streamSocket.addEventListener("message", function (event) {
    var data = JSON.parse(event.data).data;
    analyzeSocket.send(JSON.stringify(data));
  });

  // Listen for traffic from the server. These contain the
  // analysed tweets.
  analyzeSocket.addEventListener("message", (event) => {
    createTweet(event.data);
  });
}

document.getElementById("streamBtn").onclick = getStream;
// S
document.getElementById("goToRules").onclick = () => {
  location.href = "http://" + window.location.hostname + ":3000/rules";
};
