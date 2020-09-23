const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');

const config = (env) => {

  // create a nice object from the env variable
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {  
    performance: {
      maxEntrypointSize: 1328000,
      maxAssetSize: 1328000
    },

    devtool: '', // Removed dev-tools mapping
    entry: __dirname + '/js/index.jsx',
    output: {
      path: __dirname  + '/dist',
      filename: 'bundle.js',
      publicPath:__dirname  + '/dist'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css']
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              // "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-transform-runtime",
              '@babel/plugin-proposal-class-properties'
            ]
          }
        },
        {
          test: /\.(png|jp(e*)g|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 32000, // Convert images < 32kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
          }]
        },
        {
          test: /\.(scss|css)$/,
          use: [{
            loader: "style-loader" // creates style nodes from JS strings
          }, {
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }],
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new BundleAnalyzerPlugin(),
      new MomentLocalesPlugin({
        localesToKeep: ['fr'],
    }),
    new MomentTimezoneDataPlugin({
      startYear:2017,
      matchZones: /Europe\/(Belfast|London|Paris|Athens)/,
    }),
    
    ]
  };
};
module.exports = config;