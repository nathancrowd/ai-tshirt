const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
        "path": require.resolve("path-browserify"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "buffer": false,
        "fs": false
    }
  },
  plugins: [
    // new Dotenv()
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
  ]
};