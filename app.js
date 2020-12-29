const express = require("express"),
  app = express();
port = process.env.PORT || 5000;

//Initialize express parser (body parser) to parse our requests to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "this is our test get route" });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
