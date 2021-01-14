const express = require("express"),
  bcrypt = require("bcrypt"),
  saltRounds = 10,
  router = express.Router(),
  db = require("../db");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body.user;
  try {
    await bcrypt.hash(password, saltRounds, (err, hash) => {
      const data = db.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
        [firstName, lastName, email, hash]
      );
      console.log(data);
      res.status(200).json({ msg: "Your account has been Noted.", data });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
