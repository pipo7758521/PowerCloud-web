const path = require('path');

module.exports = {
	devtool: process.env.NODE_ENV === 'development' ? '#eval-source-map' : "#cheap-module-source-map",
  entry: './app/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  externals: {
	  "BMapLib": "BMapLib"
	},
  module: {
  	rules: [
      {
        test: /\.css$/,
        use: [
          {
          	loader: 'style-loader' ,
					},
          {
          	loader: 'css-loader',
          	options: {
					    sourceMap: true
					  }
        	},
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/[name].[ext]'
          }
        }]
      }
    ]
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
    contentBase: path.join(__dirname, "public"),
  },

};
