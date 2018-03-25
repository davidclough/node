import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Added when added prod build configuration.
const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
  debug: true,
  devtool: 'source-map',     // Recommended for Production.

  noInfo: false,
  entry: './src/index',      // DC: This is referring index.js and not the html file.
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    // Added when added prod build configurations.
    new webpack.optimize.OccurrenceOrderPlugin(),     // Optimizes order of files in bundle for optimal minification.
    new webpack.DefinePlugin(GLOBALS),                // Makes variables available to the libraries that webpack is bundling, e.g. react will omit propTypes for prod.
    new ExtractTextPlugin('styles.css'),              // Extract CSS into file separate main bundle.
    new webpack.optimize.DedupePlugin(),              // Eliminate duplicate packages.
    new webpack.optimize.UglifyJsPlugin()             // Minifies JS.
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      // {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /(\.css)$/, loader: ExtractTextPlugin.extract('css?sourceMap')},   // I think CSS in <style> tags will now go into the file.

      // Bootstrap file types for fonts.
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },


  // DC: https://moduscreate.com/blog/es6-es2015-import-no-relative-path-webpack/
  resolve: {
    // modules: [     // We are using WebPack 1 in this project, NOT 2.
    root: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  }
};
