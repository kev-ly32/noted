import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Grid,
  Button,
  IconButton,
  Typography,
  Popover,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBarBottom: {
    background: "#eeeeee",
    bottom: 0,
    position: "absolute",
    width: "100%",
    padding: "0 30px",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  root: {
    display: "flex",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  signIn: {
    padding: "20px",
    maxWidth: "300px",
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
}));

export function Navbar({ setLoggedIn, setUserInfo, loggedIn }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleLogOut = (e) => {
    setUserInfo({});
    setLoggedIn(false);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box display="flex" className={classes.container}>
            <Box flex={3} display="flex" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button>Dashboard</Button>
              </Link>
            </Box>
            <Box display="flex" alignItems="center">
              {loggedIn ? (
                <Button color="inherit" onClick={handleLogOut}>
                  Log out
                </Button>
              ) : (
                <>
                  <Button color="inherit" onClick={handleClick}>
                    Sign In
                  </Button>
                  <Popover
                    id={id}
                    open={openPopover}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    classes={{ paper: classes.signIn }}
                  >
                    <Typography gutterBottom component="h1" variant="h5">
                      Sign In
                    </Typography>
                    <form className={classes.form} noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign In
                      </Button>
                    </form>
                  </Popover>
                  <Button color="inherit">Register</Button>
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>

          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

export function Footer(props) {
  const classes = useStyles();

  return (
    <Toolbar color="secondary" className={classes.appBarBottom}>
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
    </Toolbar>
  );
}
