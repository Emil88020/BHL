const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/chat", (req, res) => {
  const { message } = req.body;

  let response = "I don't understand that.";
  if (message.toLowerCase().includes("hello")) {
    response = "Hi there! How can I help you?";
  } else if (message.toLowerCase().includes("bye")) {
    response = "Goodbye! Have a nice day!";
  }

  res.json({ response });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});