import React, { useState } from "react";
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
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
    width: "300px",
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
  },
  error: {
    color: "red",
  },
}));

export function Navbar({ setLoggedIn, setUserInfo, loggedIn, userInfo }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loginErr, setLoginErr] = useState("");
  const [sideBarErr, setSideBarErr] = useState("");

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleFocus = (e) => {
    setLoginErr("");
  };

  const handleSidebarClick = () => {
    if (!loggedIn) {
      setSideBarErr("Please log in.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    const { email, password } = credentials;
    e.preventDefault();
    if (email === "" || password === "") {
      return setLoginErr("Required information missing");
    }
    const response = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    if (data.error) {
      setLoginErr(data.msg);
    } else {
      setUserInfo(data);
      setLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(data));
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    let response = await fetch("/user/logout", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setUserInfo({});
    setLoggedIn(false);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setSideBarErr("");
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
              {loggedIn ? (
                <Typography>Welcome, {userInfo.first_name}</Typography>
              ) : null}
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
                    <Typography
                      gutterBottom
                      component="h4"
                      variant="h6"
                      className={classes.error}
                    >
                      {loginErr}
                    </Typography>
                    <form
                      className={classes.form}
                      onSubmit={handleLogin}
                      noValidate
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            required
                            id="navEmail"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={credentials.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            autoFocus
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
                            id="navPassword"
                            autoComplete="current-password"
                            value={credentials.password}
                            onChange={handleChange}
                            onFocus={handleFocus}
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
          <ListItem button onClick={handleSidebarClick}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          {["Dashboard", "Theme"].map((text, index) => (
            <ListItem button key={text} onClick={handleSidebarClick}>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <InvertColorsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Settings"].map((text, index) => (
            <ListItem button key={text} onClick={handleSidebarClick}>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        {!loggedIn && sideBarErr ? (
          <ListItem>
            <ListItemText primary={sideBarErr} className={classes.error} />
          </ListItem>
        ) : null}
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
