var AnalyzeHREF = "ws://192.168.0.125:3000/";
const analyzeSocket = new WebSocket(AnalyzeHREF);

analyzeSocket.addEventListener("open", (event) => {
  console.log("Connected Sentiment Processor");
});
