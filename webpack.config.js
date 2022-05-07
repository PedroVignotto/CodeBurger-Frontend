const { join } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: join(__dirname, 'public/js'),
    publicPath: '/public/js',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: { '@': join(__dirname, 'src') }
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  devServer: {
    devMiddleware: { writeToDisk: true },
    static: { directory: './public' },
    historyApiFallback: true
  },
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
  plugins: [new CleanWebpackPlugin()]
}
