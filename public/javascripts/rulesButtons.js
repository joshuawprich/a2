/**
 * This scripts contains function for processing what the buttons
 * do on the rules page. These included pushing new rules and deletion
 * of rules to the server.
 */

// Go to the stream page from the rules page.
document.getElementById("goToStream").onclick = () => {
  location.href = "http://" + window.location.hostname + ":3000/";
};

// Url end point for editing rules.
var url = "http://" + window.location.hostname + ":3000/rules/edit_rules";

// Updates error messages.
function updateMessage(message) {
  document.getElementById("message").innerHTML = message;
}

// Creates a new rule
async function createRule() {
  // Get both the rule and tag from the inputs on the page
  // and create a data object from that.
  var rule = document.getElementById("rule").value;
  var tag = document.getElementById("tag").value;
  var data = {
    add: [{ value: rule, tag: tag }],
  };

  // Request to the back end.
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Retrieve the data from the response.
  var data = await response.json();
  // If the rule was created successfully reload the page.
  if (data.meta.summary.created) {
    window.location.reload();
  } else {
    // Else update the error message.
    var msg = data.errors[0].title;
    updateMessage(msg);
  }
}

// Delete a rule.
async function deleteRule() {
  // Grab the tag from the input and create a data object from it.
  var tag = document.getElementById("delTag").value;
  var data = {
    delete: { ids: [tag] },
  };

  // request for deleting a rule.
  var response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Retrieve the data from the response.
  var data = await response.json();
  // If the rule was successfully deleted.
  if (data.meta.summary.deleted) {
    window.location.reload();
  } else {
    // Else update the error message.
    var msg = data.errors[0].detail;
    updateMessage(msg);
  }
}

// Bind both the functions to the buttons.
document.getElementById("addRuleBtn").onclick = () => createRule();
document.getElementById("deleteRuleBtn").onclick = () => deleteRule();
