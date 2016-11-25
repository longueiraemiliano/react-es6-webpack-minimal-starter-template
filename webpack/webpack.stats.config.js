// REMEMBER UPLOAD YOUR stats.json to http://webpack.github.io/analyse/
// IMPORTANT. If you use console.log in this file, the stats.json will not work...
// TODO. Include fileDateTime in stats.json as well.

const path = require('path');
const webpack = require('webpack');

//WebPack visualizer: https://github.com/chrisbateman/webpack-visualizer
var Visualizer = require('webpack-visualizer-plugin');

////////////////////////////////////////////////
// File name for Visualizer
////////////////////////////////////////////////
var currentDateTime = new Date();
var currentDate = currentDateTime.toLocaleDateString('en-GB').replace(/\//g,"-");
var currentTime = currentDateTime.toLocaleTimeString('en-GB', {hour12: false}).replace(/:/g,"-");
var fileDateTime = currentDate + "-" + currentTime;
var statisticsFileName = '../webpack/stats/statistics-' + fileDateTime + '.html'; 

////////////////////////////////////////////////
// Define WebPack Config
////////////////////////////////////////////////
module.exports  = {
  // To enhance the debugging process. More info: https://webpack.js.org/configuration/devtool/
  devtool: 'source-map', 
  entry: [
        './app/src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // If you minify or compress your code using the approach recommended in the Webpack documentation, which is to use the UglifyJS plugin, 
    //  be aware that this tool will report the sizes of modules before they are minified. This is because the statistics generated by 
    //  webpack --json do not take account of plugins that operate on the bundle as a whole.
    // If instead you minify modules in your bundle individually using a loader (eg. the UglifyJS loader), the stats output by webpack --json 
    //  will show minified sizes.
    new Visualizer({
      filename: statisticsFileName
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '../app/src')
      }
    ]
  }
};