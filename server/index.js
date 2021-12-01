const fs = require("fs");
const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/:identifier", (req, res) => {
  createSettingJSON(req.params.identifier);
  buildScript(res);
});

function createSettingJSON(identifier) {
  fs.writeFileSync(
    "../sellereeapp/setting.json",
    JSON.stringify({ identifier })
  );
}

function buildScript(res) {
  const { exec } = require("child_process");
  const result = exec("sh app-build.sh", (error, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    res(stdout);
    if (error !== null) {
      console.log(`exec error: ${error}`);
      res.send(error);
    }
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
