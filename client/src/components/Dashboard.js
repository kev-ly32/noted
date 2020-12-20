import React, { useState } from "react";
import Note from "./Note";
import NewNoteModal from "./NewNoteModal";
import { Grid, Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
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

function Dashboard(props) {
  const [open, setOpen] = React.useState(false);
  const [notes, setNotes] = useState([]);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div className="dashboard">
      <Grid container className={classes.container}>
        <Grid item xs={12} md={9}>
          <Box display="flex" justifyContent="flex-end">
            <Box>
              <Button
                onClick={handleClickOpen}
                color="secondary"
                className={classes.button}
              >
                <h1>+</h1>
              </Button>
              <NewNoteModal
                open={open}
                setOpen={setOpen}
                notes={notes}
                setNotes={setNotes}
              />
              <Note notes={notes} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} className={classes.borderLeft}>
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
