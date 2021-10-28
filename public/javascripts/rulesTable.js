function CreateTable() {
  console.log(data.data);
  rules = data.data;
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
}

CreateTable();
