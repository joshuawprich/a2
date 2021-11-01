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
var data = {
  Text: "POOOOOOOOOOOp",
  id: 1454968925798807656,
  sentiment: 0,
};

// fetch("http://192.168.0.125:3000/s3/get_data?key=cat has: images", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// fetch("http://192.168.0.125:3000/s3/store", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// });

// fetch("http://192.168.0.125:3000/s3/all_tweets", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
