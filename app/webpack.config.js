const webpack = require('webpack');

// Let's us put the CSS in a separate file
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Minifies the JavaScript
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

// Cleans the build directory before each build
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Helps us put the Git commit version at the top of the built files
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const BUILD_PATH = __dirname + '/dist';

// PLUGIN DEFINITIONS

// saves css into separate file
const extractSass = new ExtractTextPlugin({
  filename: "[name].css"
});

// let's other modules know jQuery exists
const providePlugin = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
});

// Compresses the JavaScript
const uglifyJsPlugin = new UglifyJsPlugin({
  beautify: false, //prod
  output: {
    comments: false
  },
  mangle: {
    screw_ie8: true
  },
  compress: {
    screw_ie8: true,
    warnings: false,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true,
    negate_iife: false // we need this for lazy v8
  },
  sourceMap: true
});

// Removes the build directory before each build
const cleanWebpackPlugin = new CleanWebpackPlugin([BUILD_PATH]);

// Adds the Git commit id/hash at the top of the built files
const revisionPlugin = new webpack.BannerPlugin({
    banner: new GitRevisionPlugin().version()
});

module.exports = {

  // only discover files that have those extensions
  resolve: {
    extensions: ['.js', '.css', '.scss']
  },

  // create source maps
  devtool: 'source-map',

  // where we get started
  entry: {
    app: './js/app.js'
  },
  // where the built file should go
  output: {
    path: BUILD_PATH,
    filename: '[name].js'
  },

  module: {
    rules: [
      // SASS options
      {
        test: /\.scss$/,
        loader: extractSass.extract({
          use: [
            // interprets @import and url() like import/require() and will resolve them
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            // let's us work with relative urls in css
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true
              }
            },
            // loads SASS files
            {
              loader: "sass-loader",
              options: {
                sourceMap: true // sourceMap needed for resolve-url-loader
              }
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      // Static files
      {
        test: /\.(jpg|png|gif|ico|svg|ttf|eot|woff|woff2|txt|xml)$/,
        loader: 'file-loader',
        options: {
          emitFile: false, // processes files without copying them into the dist folder
          name: '../[path][name].[ext]',
        }
      }
    ]
  },

  plugins: [
    cleanWebpackPlugin,
    providePlugin,
    extractSass,
    uglifyJsPlugin,
    revisionPlugin
  ]

};
