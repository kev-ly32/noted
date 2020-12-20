import React from "react";
import { Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    minHeight: "150px",
    minWidth: "140px",
    maxWidth: "180px",
    padding: "0.5rem",
  },
  paperBox: {
    padding: "0.25rem",
  },
});

function Note({ notes }) {
  const classes = useStyles();
  return (
    <>
      {notes.map((note, noteI) => (
        <Box className={classes.paperBox} key={noteI} alignItems="start">
          <Paper className={classes.paper}>
            <Typography>{note}</Typography>
          </Paper>
        </Box>
      ))}
    </>
  );
}

export default Note;
