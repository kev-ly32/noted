import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Note({ notes }) {
  console.log(notes);
  return (
    <>
      {notes.map((note) => (
        <Paper>{note}</Paper>
      ))}
    </>
  );
}

export default Note;
