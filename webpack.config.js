const path = require('path');

module.exports = {
  entry: './src/main',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {test: /\.tsx?$/, use: 'ts-loader'},
    ],
  },
}
