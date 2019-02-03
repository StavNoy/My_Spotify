const webpack = require("webpack");
const path = require("path");
var $ = require("jquery");

let config = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "./app"),
        filename: "app.js"
    }
}

module.exports = config;