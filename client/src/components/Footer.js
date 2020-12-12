import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  icon: {
    padding: theme.spacing(0, 0.25),
  },
  font: {
    fontSize: "10px",
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
      <Toolbar>
        <Grid justify="space-between" container>
          <Box display="flex" alignItems="center">
            <Grid item>
              <Typography color="inherit">Noted.</Typography>
            </Grid>
          </Box>
          <Box display="flex" alignItems="flex-end">
            <Typography className={classes.font}>
              Copyright © 2020 All rights reserved. Noted Inc.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Grid item>
              <IconButton color="inherit">
                <FacebookIcon className={classes.icon} />
                <TwitterIcon className={classes.icon} />
                <InstagramIcon className={classes.icon} />
                <LinkedInIcon className={classes.icon} />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
