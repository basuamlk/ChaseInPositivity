const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/react-modal-login.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'react-modal-login.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
            { test: /\.json$/, loader: "json-loader" }
        ],
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [
              "transform-object-rest-spread",
              "transform-react-jsx"
            ]
          }
        }
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  },
  plugins: [
    /*new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: {
        except: [
          'ReactModalLogin'
        ],
        props: false,
      }
    }),*/
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  externals: {
    'react': 'commonjs react'
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
};