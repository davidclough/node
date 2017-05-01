import webpack from 'webpack';
import path from 'path';

// ****************** check that no linting error is preventing compilation

export default {
  debug: true,

  // NOTE: In his example debugger WORKS.

  //devtool: 'cheap-module-eval-source-map',
  // source-map DID work for me - the debugger statements broke at the line I put them on.
  //devtool: 'source-map',        // Worked.
  devtool: 'eval-source-map',     // Worked.
  //devtool: 'cheap-module-source-map',     // Didn't work.

  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    //path.resolve(__dirname, 'src/index')

    // Important that the app entry point is defined last.
    './src/index'
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    //contentBase: path.resolve(__dirname, 'src')
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      // Bootstrap file types for fonts.
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
