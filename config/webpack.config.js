const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// must match config.webpack.dev_server.port
const devServerPort = 8080;

// set NODE_ENV=production on the environment to add asset fingerprints
const production = process.env.NODE_ENV === 'production';

const config = {
  context: path.join(__dirname, '..', 'webpack'),

  entry: {
    application: './application.jsx',
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.es6$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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

  devtool: 'source-map',

  output: {
    // Build assets directly in to public/webpack/, let webpack know
    // that all webpacked assets start with webpack/

    // must match config.webpack.output_dir
    path: path.join(__dirname, '..', 'webpack', 'public'),
    publicPath: '/webpack/',

    filename: production ? '[name]-[chunkhash].js' : '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.join(__dirname, '..', 'webpack'), 'node_modules'],
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
    // must match config.webpack.manifest_filename
    new StatsPlugin('manifest.json', {
      // We only need assetsByChunkName
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true,
    }),
    new StyleLintPlugin()
  ],
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new webpack.optimize.DedupePlugin());
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: 'webpack/public/',
    historyApiFallback: {
      index: 'index.html'
    }
  };
  config.output.publicPath = `//localhost:${devServerPort}/webpack/`;
}

module.exports = config;
