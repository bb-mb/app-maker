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
  const child = exec("cd ../expo && npx eas build -p android");

  child.stdout.on("data", function (data) {
    console.log("stdout: " + data);
    if (data?.includes("Build details:")) {
      child.kill();
      res.send(data);
    }
  });

  child.stderr.on("data", function (data) {
    console.log("stderr: " + data);
    child.kill();
    res.send(data);
  });

  child.on("close", function (code) {
    console.log("closing code: " + code);
    res.end();
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
