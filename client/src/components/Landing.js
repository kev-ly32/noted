import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";

const useStyles = makeStyles((theme) => ({
  container: {
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
}));

const LandingCarousel = () => {
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
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <Paper elevation={4}>
      <Box display="flex" alignItems="center" style={{ padding: "3%" }}>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
        >
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
          <Button color="primary" variant="contained" className="CheckButton">
            Get Started
          </Button>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <img
            style={{ width: "60%", height: "300px" }}
            src={props.item.image}
            alt="Landing Checklist"
          />
        </Box>
      </Box>
    </Paper>
  );
};

function Landing(props) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Typography component="div" style={{ height: "100%" }}>
        <LandingCarousel />
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
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
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Typography>
    </Container>
  );
}

export default Landing;
