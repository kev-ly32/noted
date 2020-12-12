import React from "react";
import { Container, Typography, Box, Grid } from "@material-ui/core";

function Landing(props) {
  return (
    <Container maxWidth="lg">
      <Typography component="div" style={{ height: "100vh" }}>
        <Grid container style={{ paddingTop: "5%" }}>
          <Box display="flex" alignItems="center">
            <Grid item xs={6} style={{ padding: "0 5%" }}>
              <h1>Keep track of your tasks. We'll have it Noted.</h1>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" justifyContent="center">
                <img
                  style={{ width: "30em" }}
                  src="https://res.cloudinary.com/de5gzocha/image/upload/v1607749681/Noted/LandingChecklist_sjkidn.svg"
                  alt="Landing Checklist"
                />
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Typography>
    </Container>
  );
}

export default Landing;
