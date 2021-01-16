const express = require("express"),
  bcrypt = require("bcrypt"),
  saltRounds = 10,
  router = express.Router(),
  db = require("../db");

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body.user;
  try {
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    const data = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    );
    res
      .status(200)
      .json({ msg: "Your account has been Noted.", user: data.rows[0] });
  } catch (error) {
    res.status(400).json({ msg: "Email already exists.", error });
  }
});

module.exports = router;
