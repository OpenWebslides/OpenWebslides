const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const devServerPort = 8080;
const APP_DIR = path.resolve(__dirname, "src");

// set NODE_ENV=production on the environment to add asset fingerprints
const production = process.env.NODE_ENV === 'production';

const config = {
  context: path.join(__dirname, '..', 'webpack'),

  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    './application.jsx',
  ],

  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /locales/,
        use: ['i18next-resource-store-loader']
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.join(__dirname, '..'), 'node_modules'],
    alias: {
      presentationals: path.join(__dirname, '..', 'webpack', 'app', 'presentationals'),
      pages: path.join(__dirname, '..', 'webpack', 'app', 'pages'),
      reducers: path.join(__dirname, '..', 'webpack', 'app', 'reducers'),
      actions: path.join(__dirname, '..', 'webpack', 'app', 'actions'),
      containers: path.join(__dirname, '..', 'webpack', 'app', 'containers'),
      helpers: path.join(__dirname, '..', 'webpack', 'app', 'helpers'),
      sagas: path.join(__dirname, '..', 'webpack', 'app', 'sagas'),
      errors: path.join(__dirname, '..', 'webpack', 'app', 'errors'),
      api: path.join(__dirname, '..', 'webpack', 'app', 'api'),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new StatsPlugin('manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true,
    }),
    //new StyleLintPlugin()
  ],

  devServer: {
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  }
};

module.exports = config;
