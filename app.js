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
  try {
    const data = await db.query(
      "SELECT * FROM users INNER JOIN notes ON users.id = notes.user_id WHERE id = 3;"
    );
    const notes = data.rows;
    res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error. Failed to retrieve notes." });
  }
});

app.post("/notes", async (req, res) => {
  const { text, xPos, yPos, user_id } = req.body;
  try {
    const data = await db.query(
      "INSERT INTO notes (text, xpos, ypos, user_id) VALUES($1, $2, $3, $4) RETURNING *",
      [text, xPos, yPos, user_id]
    );
    res.status(200).json({ msg: "Added new note", data: data.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error. Note not added" });
  }
});

app.put("/notes/:noteid", async (req, res) => {
  const note_id = req.params.noteid;
  let data;
  try {
    if (req.body.text) {
      data = await db.query(
        "UPDATE notes SET text = $1 WHERE note_id = $2 RETURNING *",
        [req.body.text, note_id]
      );
      console.log(data.rows[0].text);
      res
        .status(200)
        .json({
          msg: "Updated note",
          data: { text: data.rows[0].text, id: data.rows[0].note_id },
        });
    } else {
      data = await db.query(
        "UPDATE notes SET xPos = $1, yPos = $2 WHERE note_id = $3",
        [req.body.xpos, req.body.ypos, note_id]
      );
      res.status(200).json({ msg: "Updated note" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error. Note not updated" });
  }
});

app.delete("/notes/:noteid", async (req, res) => {
  const note_id = req.params.noteid;

  try {
    await db.query("DELETE FROM notes WHERE note_id = $1", [note_id]);
    res.status(200).json({ msg: "Note was deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Error. Could not delete." });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}`));
