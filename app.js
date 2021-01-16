//load config
require("dotenv").config();

const express = require("express"),
  app = express(),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  GoogleStrategy = require("passport-google-oauth20").Strategy,
  session = require("express-session"),
  bcrypt = require("bcrypt"),
  db = require("./db"),
  port = process.env.PORT || 5000;

const noteRoutes = require("./Routes/Notes"),
  authRoutes = require("./Routes/Auth");

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

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      paasswordField: "password",
    },
    async (email, password, done) => {
      try {
        const data = await db.query("SELECT * FROM users WHERE email = $1", [
          email,
        ]);

        let result = await bcrypt.compare(password, data.rows[0].password);
        done(null, result);
        //ADD IN CASE HANDLING
      } catch (error) {
        console.log(error);
      }
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    let data = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    done(null, data.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.use("/notes", noteRoutes);
app.use("/user", authRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
