import React from "react";
import Draggable from "react-draggable";

import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    minHeight: "150px",
    minWidth: "160px",
    maxWidth: "160px",
    padding: "0.5rem",
  },
  paperBox: {
    padding: "0.25rem",
  },
});

function Note({ notes, setNotes }) {
  let newNotes = [...notes];

  const classes = useStyles();

  return (
    <>
      {notes.map((note, noteI) => (
        <Draggable
          onStop={(e, data) => {
            newNotes[noteI] = { ...note, xPos: data.x, yPos: data.y };
            setNotes(newNotes);
          }}
          key={noteI}
          bounds="#dashContainer"
        >
          <Box className={classes.paperBox} alignItems="start">
            <Paper id={noteI} className={classes.paper}>
              <Typography>{note.text}</Typography>
            </Paper>
          </Box>
        </Draggable>
      ))}
    </>
  );
}

export default Note;
