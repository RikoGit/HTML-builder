"use strict";

const { createReadStream } = require("fs");
const { join } = require("path");
const { stdout } = process;

const logFileToStdout = (filePath) => {
  const readableStream = createReadStream(filePath);

  readableStream.on("error", (error) => {
    stdout.write(`error: ${error.message}`);
  });

  readableStream.on("data", (chunk) => {
    stdout.write(chunk.toString());
  });
};

logFileToStdout(join(__dirname, "text.txt"));
