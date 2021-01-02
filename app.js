//load config
require("dotenv").config();

const express = require("express"),
  app = express(),
  db = require("./db"),
  port = process.env.PORT || 5000;

//Initialize express parser (body parser) to parse our requests to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", async (req, res) => {
  const data = await db.query("SELECT * FROM users");
  const [user] = data.rows;
  res.json(user);
});

app.post("/notes", async (req, res) => {
  const data = await db.query(
    "UPDATE notes SET notes = APPEND_ARRAY(notes, $1, [note])"
  );
  res.json(data.rows);
});

app.put("/notes/:noteid", async (req, res) => {
  const data = await db.query(
    "UPDATE notes SET xPos = $1 ,[x], yPos = $2, [y] WHERE"
  );
  res.json(data.rows);
});

app.delete("/notes/:noteid", async (req, res) => {
  const data = await db.query("SELECT * FROM users");
  res.json(data.rows);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
