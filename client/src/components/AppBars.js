import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  BottomNavigation,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: "#eeeeee",
    bottom: 0,
    position: "absolute",
    width: "100%",
    padding: "0 30px",
  },
  container: {
    width: "100%",
  },
  icon: {
    padding: "5px",
  },
  font: {
    fontSize: "10px",
  },
}));

export function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
        <Box display="flex" className={classes.container}>
          <Box flex={3} display="flex" alignItems="center">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Dashboard</Button>
          </Box>
          <Box display="flex" alignItems="center">
            <Button color="inherit">Sign In</Button>
            <Button color="inherit">Register</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export function Footer(props) {
  const classes = useStyles();

  return (
    <BottomNavigation color="secondary" className={classes.appBar}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={classes.container}
      >
        <Box flex={1} display="flex" alignItems="center">
          <Typography color="inherit">Noted.</Typography>
        </Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography className={classes.font}>
            Copyright © 2020 All rights reserved. Noted Inc.
          </Typography>
        </Box>
        <Box flex={1} display="flex" justifyContent="flex-end">
          <IconButton color="inherit" className={classes.icon}>
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" className={classes.icon}>
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" className={classes.icon}>
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" className={classes.icon}>
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
    </BottomNavigation>
  );
}
