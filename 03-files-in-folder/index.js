"use strict";

const { extname, join } = require("node:path");
const { readdir, stat } = require("node:fs/promises");
const { stdout } = process;

const logDataAboutFilesInFolder = async (path) => {
  try {
    const filesAndDirs = await readdir(path, { withFileTypes: true });
    const files = filesAndDirs.filter((file) => file.isFile());

    files.forEach(async ({ name }) => {
      const { size } = await stat(join(path, name));
      const fileBasename = name.split(".")[0];
      const fileExtname = extname(name).split(".")[1];
      stdout.write(`${fileBasename} - ${fileExtname} - ${size}\n`);
    });
  } catch (error) {
    stdout.write(error.message);
  }
};

logDataAboutFilesInFolder(join(__dirname, "secret-folder"));
