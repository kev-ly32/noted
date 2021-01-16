import React, { useEffect, useState } from "react";
import Note from "./Note";
import NewNoteModal from "./NewNoteModal";
import clsx from "clsx";
import { Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    backgroundColor: "#f3f3f3",
  },
  containerBorders: {
    borderTop: "3px solid gray",
    borderBottom: "3px solid gray",
  },
  buckets: {
    width: "inherit",
    height: "100%",
  },
  borderLeft: {
    borderLeft: "3px solid gray",
  },
  button: {
    borderRadius: "50px",
  },
  important: {
    backgroundColor: "#ffd7db",
    borderBottom: "3px solid gray",
  },
  ongoing: {
    backgroundColor: "#ffe6c1",
  },
}));

function Dashboard({ userInfo }) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState([]);
  const [notePlaceholder, setNotePlaceholder] = useState({ text: "", id: "" });
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const getData = async () => {
    const response = await fetch("/notes");
    const notes = await response.json();
    setNotes(notes);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="dashboard">
      <Grid
        container
        id="dashContainer"
        className={clsx(classes.container, classes.containerBorders)}
      >
        <Grid item xs={9} className={classes.container}>
          <Box
            display="flex"
            flexDirection="row-reverse"
            alignItems="flex-start"
            maxHeight="100%"
            position="relative"
            flexWrap="wrap"
          >
            <Box>
              <Button
                onClick={handleClickOpen}
                color="secondary"
                className={classes.button}
              >
                <h1>+</h1>
              </Button>
            </Box>
            <Note
              handleClickOpen={handleClickOpen}
              setNotes={setNotes}
              notes={notes}
              setEditMode={setEditMode}
              setNotePlaceholder={setNotePlaceholder}
            />
            <NewNoteModal
              userInfo={userInfo}
              open={open}
              setOpen={setOpen}
              notes={notes}
              setNotes={setNotes}
              editMode={editMode}
              setEditMode={setEditMode}
              notePlaceholder={notePlaceholder}
            />
          </Box>
        </Grid>
        <Grid item xs={3} className={classes.borderLeft}>
          <Box
            display="flex"
            flexDirection="column"
            className={classes.buckets}
          >
            <Box flex={1} className={classes.important}>
              <h2>Important</h2>
            </Box>
            <Box flex={1} className={classes.ongoing}>
              <h2>Ongoing</h2>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
