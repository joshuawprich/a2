/**
 * Sets up a socket connection to the back end server.
 * This is used later to analyse the sentiment of tweets.
 */
var AnalyzeHREF = window.location.origin;
const analyzeSocket = new WebSocket(AnalyzeHREF);

// Listen for a connection
analyzeSocket.addEventListener("open", (event) => {
  console.log("Connected Sentiment Processor");
});
var data = {
  Text: "This is not a test",
  id: 1454968925798807656,
  sentiment: 0,
};
