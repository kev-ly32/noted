import React from "react";
import Draggable from "react-draggable";

import { Paper, Typography, Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  paper: {
    minHeight: "150px",
    minWidth: "160px",
    maxWidth: "160px",
    padding: "0.5rem",
    display: "grid",
  },
  paperBox: {
    padding: "0.25rem",
  },
  paperButtons: {},
  delete: {
    opacity: 0.12,
    "&:hover": {
      opacity: 1,
      color: "red",
    },
  },
  edit: {
    opacity: 0.12,
    "&:hover": {
      opacity: 1,
      color: "gold",
    },
  },
});

function Note({ notes, setNotes }) {
  let newNotes = [...notes];
  const classes = useStyles();

  const handleDelete = async (e) => {
    e.preventDefault();
    const note_id = e.currentTarget.id;
    try {
      await fetch(`/notes/${note_id}`, {
        method: "DELETE",
      });

      const remainingNotes = notes.filter(
        (note) => note.note_id !== Number(note_id)
      );
      setNotes(remainingNotes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {notes.map((note, noteI) => (
        <Draggable
          onStop={(e, data) => {
            newNotes[noteI] = { ...note, xpos: data.x, ypos: data.y };
            setNotes(newNotes);
          }}
          key={note.note_id}
          bounds="#dashContainer"
        >
          <Box className={classes.paperBox} alignItems="start">
            <Paper id={note.note_id} className={classes.paper}>
              <Typography>{note.text}</Typography>
              <Box
                alignItems="flex-end"
                justifyContent="space-between"
                display="flex"
                className={classes.paperButtons}
              >
                <IconButton
                  id={note.note_id}
                  color="secondary"
                  className={classes.delete}
                  size="small"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  id={note.note_id}
                  color="secondary"
                  className={classes.edit}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Draggable>
      ))}
    </>
  );
}

export default Note;
