"use strict";

const { createInterface } = require("readline");
const { createWriteStream } = require("fs");
const { join } = require("path");
const { stdin, stdout } = process;

const logStdoutToFile = (filePath) => {
  const writableStream = createWriteStream(filePath);

  writableStream.on("error", (error) => {
    stdout.write(`error: ${error.message}`);
  });

  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "enter your text here: ",
  });

  rl.prompt();

  rl.on("line", (line) => {
    if (line.trim() !== "exit") {
      writableStream.write(line + "\n");
      rl.prompt();
    } else rl.close();
  }).on("close", () => {
    writableStream.end();
    writableStream.on("finish", () => {
      stdout.write("your text is successfully written to file");
    });
  });
};

logStdoutToFile(join(__dirname, "text.txt"));
