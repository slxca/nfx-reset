const path = require('path');

module.exports = [
  {
    mode: 'production',
    entry: './src/background.ts',
    output: {
      filename: 'background.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool: false,
  },
  {
    mode: 'production',
    entry: './src/content.ts',
    output: {
      filename: 'content.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool: false,
  },
];

