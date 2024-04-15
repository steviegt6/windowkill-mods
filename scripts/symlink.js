const path = require("path");
const fs = require("fs");
const readline = require("readline");

let scriptDir = path.dirname(process.argv[1]);
let symlinkDirFilePath = path.join(scriptDir, "symlink-dir");

let thePath;
try {
  thePath = JSON.parse(fs.readFileSync(symlinkDirFilePath));
} catch {}
if (!thePath) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Symlink directory not specified, please enter: ", (x) => {
    thePath = {
      path: x,
    };
    fs.writeFileSync(symlinkDirFilePath, JSON.stringify(thePath));
    rl.close();
    cont();
  });
} else {
  cont();
}

function cont() {
  thePath = thePath.path;

  const pathToRoot = path.join(scriptDir, "..", "src");
  const modDirs = fs.readdirSync(pathToRoot);

  console.log("Creating symlinks for mod dirs: ", modDirs);

  modDirs.forEach((modDir) => {
    const modDirPath = path.join(pathToRoot, modDir);
    const symlinkPath = path.join(thePath, modDir);

    try {
      console.log("Creating symlink: ", modDir);
      fs.symlinkSync(modDirPath, symlinkPath, "junction");
    } catch (e) {
      if (e.code === "EEXIST") {
        console.log("    Symlink already exists, skipping: ", modDir);
      } else {
        console.error("    Error creating symlink: ", e);
      }
    }
  });
}
