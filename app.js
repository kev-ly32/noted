//load config
require("dotenv").config();

const express = require("express"),
  app = express(),
  db = require("./db"),
  port = process.env.PORT || 5000;

//Initialize express parser (body parser) to parse our requests to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/data", async (req, res) => {
  const data = await db.query("SELECT * FROM users");
  res.json(data.rows);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
