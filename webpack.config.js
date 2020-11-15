const path = require("path");

module.exports = {
  entry: [
    "./js/message.js",
    "./js/backend.js",
    "./js/filter.js",
    "./js/util.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/move.js",
    "./js/form.js"
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
