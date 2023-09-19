"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var calories = fs.readFileSync("./public/puzzle.txt", 'utf-8');
console.log(calories);
