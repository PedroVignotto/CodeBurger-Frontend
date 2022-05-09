const { join } = require('path')
const { DefinePlugin } = require('webpack')
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
    },
    {
      test: /\.(png|jpe?g|svg)$/i,
      loader: 'file-loader',
      exclude: /node_modules/
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  devServer: {
    devMiddleware: { writeToDisk: true },
    static: { directory: './public' },
    historyApiFallback: true
  },
  externals: { react: 'React', 'react-dom': 'ReactDOM' },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({ 'process.env.API_URL': JSON.stringify('http://localhost:3333/api') })
  ]
}
