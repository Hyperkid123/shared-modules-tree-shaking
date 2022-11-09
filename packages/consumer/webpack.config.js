const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const federatedPlugin = new webpack.container.ModuleFederationPlugin({
  name: 'consumer',
  shared: {
    // normal module library has to be shared in its entirity because of relative imports
    "@repo/normal-module-lib": { requiredVersion: "*" },
    // with absolute imports we can share only used modules even with relative import path
    // CJS and ESM builds are esolved automatically
    "@repo/mini-module-lib/moduleA": {requiredVersion: "*"},

    // PF as ashared module
    "@patternfly/react-core": {requiredVersion: "*"}
  }
})

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    filename: './dist/[name].js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
      {
        test: /\.(jpe?g|svg|png|gif|ico|eot|ttf|woff2?)(\?v=\d+\.\d+\.\d+)?$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin(),
    federatedPlugin,
    new BundleAnalyzerPlugin(),
  ]
}