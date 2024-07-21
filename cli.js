#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const generateMediaQueries = require("./index");

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "output.css";

if (!inputPath) {
  console.error("Please provide an input file path.");
  process.exit(1);
}

const inputCss = fs.readFileSync(path.resolve(inputPath), "utf-8");

const outputCss = generateMediaQueries(inputCss);

fs.writeFileSync(path.resolve(outputPath), outputCss);
console.log(`Media queries generated and saved to ${outputPath}`);
