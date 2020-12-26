import React, { useRef, useState } from "react";
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
  open,
  setOpen,
  notes,
  setNotes,
  noteCoords,
  setNoteCoords,
}) {
  const [text, setText] = useState("");
  const noteRef = useRef(null);
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const addNote = (e) => {
    e.preventDefault();
    setNotes([...notes, { text, x: "", y: "" }]);
    setText("");
    handleClose();
  };
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogTitle id="form-dialog-title">New Item</DialogTitle>
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
            onClick={addNote}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            <h1>+</h1>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewNoteModal;
