import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "300px",
    width: "300px",
  },
  button: {
    borderRadius: "30px",
  },
}));

function NewNoteModal({
  userInfo,
  open,
  setOpen,
  notes,
  setNotes,
  editMode,
  setEditMode,
  notePlaceholder,
}) {
  const [text, setText] = useState("");
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setText("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const addEditNote = async (e) => {
    e.preventDefault();
    let route = "/notes";
    let method = "POST";
    let noteData = { text, xPos: 0, yPos: 0, user_id: userInfo.id };
    if (editMode) {
      route = `/notes/${notePlaceholder.id}`;
      method = "PUT";
      noteData = {
        text,
        xPos: notePlaceholder.xpos,
        yPos: notePlaceholder.ypos,
      };
    }

    try {
      const response = await fetch(route, {
        method,
        body: JSON.stringify(noteData),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (data.data.user_id) {
        setNotes([...notes, data.data]);
      } else {
        let index = notes.findIndex((note) => note.note_id === data.data.id);
        let newNotes = [...notes];
        newNotes[index] = { ...newNotes[index], text: data.data.text };
        setNotes(newNotes);
      }
    } catch (error) {
      console.log(error);
    }
    setText("");
    handleClose();
  };

  useEffect(() => {
    setText(notePlaceholder.text);
  }, [notePlaceholder]);

  const classes = useStyles();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="form-dialog-title">
          {editMode ? "Edit Note" : "New Item"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            value={text}
            onChange={handleChange}
            margin="dense"
            id="Note"
            label="Note"
            type="text"
            multiline={true}
            fullWidth={true}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={addEditNote}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            {editMode ? <h3>Update</h3> : <h1>+</h1>}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewNoteModal;
