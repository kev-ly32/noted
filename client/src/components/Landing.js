import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "120px",
    height: "100%",
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "40%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    margin: "0 auto",
    paddingBottom: "100px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red",
  },
}));

const LandingCarousel = ({ scroll }) => {
  const items = [
    {
      name: "Keep track of your tasks.",
      description: "Anything you want, we'll have it Noted.",
      image:
        "https://res.cloudinary.com/de5gzocha/image/upload/v1607811423/Noted/MindMap_jal332.svg",
    },
    {
      name: "Slick dashboard for ease of use.",
      description: "Spend less time planning, more time doing.",
      image:
        "https://res.cloudinary.com/de5gzocha/image/upload/v1607811423/Noted/RemoteWorking_on88yi.svg",
    },
  ];

  return (
    <Carousel interval={10000}>
      {items.map((item, i) => (
        <Item key={i} item={item} scroll={scroll} />
      ))}
    </Carousel>
  );
};

const Item = ({ item, scroll }) => {
  return (
    <Paper elevation={4}>
      <Box display="flex" alignItems="center" style={{ padding: "3%" }}>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <Button
            onClick={scroll}
            color="primary"
            variant="contained"
            className="CheckButton"
          >
            Get Started
          </Button>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <img
            style={{ width: "60%", height: "300px" }}
            src={item.image}
            alt="Landing Checklist"
          />
        </Box>
      </Box>
    </Paper>
  );
};

function Landing({ setLoggedIn, setUserInfo }) {
  const classes = useStyles();
  const registerRef = useRef(null);
  const [err, setErr] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const scrollToForm = () =>
    registerRef.current.scrollIntoView({ behavior: "smooth" });

  const handleFocus = (e) => {
    setErr("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, password2 } = user;
    const missingVals = Object.values(user).some((val) => val === "");
    if (missingVals) {
      return setErr("Please fill out all required information.");
    } else if (password !== password2) {
      return setErr("Passwords do not match.");
    } else if (!email.match(/\w+@\w+\.\w+/)) {
      return setErr('Email must be in the format "example@email.com"');
    } else {
      try {
        const response = await fetch("/user/register", {
          method: "POST",
          body: JSON.stringify({ user }),
          headers: { "Content-type": "application/json" },
        });
        const data = await response.json();
        if (data.error) {
          setErr(data.msg);
        } else {
          setUserInfo(data.user);
          setLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography component="div" style={{ height: "100%" }}>
        <LandingCarousel scroll={scrollToForm} />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Typography component="h6" variant="h6" className={classes.error}>
            {err}
          </Typography>

          <form
            ref={registerRef}
            className={classes.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  value={user.firstName}
                  variant="outlined"
                  error={err !== "" && user.firstName === "" ? true : false}
                  fullWidth
                  autoFocus
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  value={user.lastName}
                  variant="outlined"
                  error={err !== "" && user.lastName === "" ? true : false}
                  fullWidth
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="email"
                  id="email"
                  label="Email Address"
                  value={user.email}
                  variant="outlined"
                  error={err !== "" && user.email === "" ? true : false}
                  fullWidth
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="password"
                  id="password"
                  label="Password"
                  value={user.password}
                  type="password"
                  variant="outlined"
                  error={err !== "" && user.password === "" ? true : false}
                  fullWidth
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="password2"
                  id="password2"
                  label="Confirm Password"
                  value={user.password2}
                  type="password"
                  variant="outlined"
                  error={err !== "" && user.password2 === "" ? true : false}
                  fullWidth
                  onChange={handleChange}
                  onFocus={handleFocus}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Typography>
    </Container>
  );
}

export default Landing;
