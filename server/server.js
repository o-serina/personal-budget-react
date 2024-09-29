const express = require("express");
const app = express();
const port = 8080;
const fs = require('fs');
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));


app.use("/", express.static("public"));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budget", (req, res) => {
  fs.readFile("budget-data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
