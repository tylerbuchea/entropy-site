const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  entry: {
    filname: './src/index.js',
  },
  output: {
    path: __dirname + '/build',
    filename: 'bundle-[hash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {},
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img/',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      },
    ],
  }
});
