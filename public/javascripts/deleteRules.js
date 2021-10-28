document.getElementById("deleteAllBtn").onclick = () => {
  location.href =
    "http://" + window.location.hostname + ":3000/rules?action=delete";
};
