const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const { identifier } = req.body;
  createSettingJSON(identifier);
  buildScript(res);
});

function createSettingJSON(identifier) {
  fs.writeFileSync("../expo/setting.json", JSON.stringify({ identifier }));
}

function buildScript(res) {
  const { exec } = require("child_process");
  const result = exec("sh app-build.sh", (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    res.send(stdout);
    if (error !== null) {
      console.log(`exec error: ${error}`);
      res.send(error);
    }
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
