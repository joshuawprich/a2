/**
 * Sets up a socket connection to the back end server.
 * This is used later to analyse the sentiment of tweets.
 */
var AnalyzeHREF = `ws://${window.location.hostname}:3000/`;
const analyzeSocket = new WebSocket(AnalyzeHREF);

// Listen for a connection
analyzeSocket.addEventListener("open", (event) => {
  console.log("Connected Sentiment Processor");
});
