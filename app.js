//load config
require("dotenv").config();

const express = require("express"),
  app = express(),
  passport = require("passport"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  session = require("express-session"),
  port = process.env.PORT || 5000;

const noteRoutes = require("./Routes/Notes");

//Initialize express parser (body parser) to parse our requests to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Configure express-session
app.use(
  session({
    secret: process.env.SECRET || "the egg came before the chicken",
    resave: false,
    saveUninitialized: false,
  })
);

//Configure passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/notes", noteRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
