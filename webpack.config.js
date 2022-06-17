const { resolve } = require('path');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  entry: './src/app.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    filename: 'app.js',
    path: resolve(__dirname, 'dist'),
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  devtool: 'source-map',
};
