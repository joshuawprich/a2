/**
 * This script is responsible to creating the table
 * that displays the rules on the rule page.
 */

function CreateTable() {
  rules = data.data;
  // Only build the table if there are rules
  if (rules) {
    rules.forEach((rule) => {
      var HTML =
        "<div id='rule'>" +
        "<p>ID: " +
        rule.id +
        "</p>" +
        "<p>Value: " +
        rule.value +
        "</p>" +
        "<p>Tag: " +
        rule.tag +
        "</p>";
      ("</div>");

      document.getElementById("rulesTable").innerHTML += HTML;
    });
  } else {
    document.getElementById("rulesTable").innerHTML =
      "Add a rule to get started!";
  }
}

CreateTable();
