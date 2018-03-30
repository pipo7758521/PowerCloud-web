const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const config = {
  // devtool: '#eval-source-map',
  // devtool: process.env.NODE_ENV === 'development' ? '#eval-source-map' : "#cheap-module-source-map",
  entry: './app/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    // publicPath: './assets/'
  },
  externals: {
	  "echarts": "echarts"
	},
  module: {
  	rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options:{
                  minimize: true, //css压缩
                  sourceMap:true
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,                   //scss
        use: ExtractTextPlugin.extract({
          publicPath: '../',
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options:{
                  minimize: true, //css压缩
                  sourceMap:true
              }
            },
            {
              loader: 'sass-loader',
              options:{
                  minimize: true, //css压缩
                  sourceMap:true
              }
            },
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: "assets/[name].[ext]"
          }
        }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      ['dist'],
      {
          root: __dirname,       　　　　　　　　　　//根目录
          verbose: true,        　　　　　　　　　　//开启在控制台输出信息
          dry: false        　　　　　　　　　　//启用删除文件
      }
    ),
    new CopyWebpackPlugin([ { from: path.join(__dirname, "app/mock"), to: 'mock' } ]),
    new OptimizeCSSPlugin(),
    new ExtractTextPlugin("css/style.css"),
    new HtmlWebpackPlugin({
      template : './index.html',
      filename : 'index.html',
      inject : true,
      minify: { removeAttributeQuotes: true, removeComments: true },
    }),

  ],
  optimization: {
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "common",
                chunks: "all"
            }
        }
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8000,
    historyApiFallback: false,
    noInfo: true,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000/mock/',
        changeOrigin: true,
        pathRewrite(path, option) {
            option.method = 'GET';
            return path.slice(4);
        }
      }
    },
    open: false,
    contentBase: path.join(__dirname, "dist"),
  },

};

module.exports = config;

