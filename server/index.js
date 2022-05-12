const path = require("path");
const express = require("express");
const app = express();
const port = 3010;

const DIST = path.join(__dirname, "..", "dist");

app.use(express.static(DIST));

app.get("/", function (req, res) {
  res.sendFile(path.join(DIST, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
