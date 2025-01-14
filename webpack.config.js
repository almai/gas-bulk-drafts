const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'code.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new ESLintPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: 'src/**/*.html',
        //   to: '[name][ext]'
        // },
        {
          from: 'appsscript.json',
          to: '[name][ext]'
        },
        {
          from: 'node_modules/apps-script-oauth2/dist/OAuth2.gs',
          to: 'OAuth2.js'
        }
      ]
    }),
    new GasPlugin()
  ]
};
