const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    "home": path.resolve(__dirname, 'src/entries/HomeEntrie.js')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    path: __dirname + '/dist',
    chunkFilename: 'js/[id].[chunkhash].js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        // test: que tipo de archivo quiero reconocer,
        // use: que loader se va a encargar del archivo
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            "plugins": [
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: 'css/',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
        ],
      },

      {test: /\.(jpe?g|png|gif|svg)$/i, loader: "url-loader?name=app/images/[name].[ext]"}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    new CleanWebpackPlugin()

  ],
  optimization: {
    minimizer: [
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
}
}