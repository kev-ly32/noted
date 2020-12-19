import React from "react";
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
  const classes = useStyles();
  return (
    <div className="dashboard">
      <Grid container className={classes.container}>
        <Grid item md={9}>
          <Box container display="flex" justifyContent="flex-end">
            <Box item>
              <Button color="secondary" className={classes.button}>
                <h1>+</h1>
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid container md={3} className={classes.borderLeft}>
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
