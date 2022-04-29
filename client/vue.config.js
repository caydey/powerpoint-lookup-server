const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const isProd = process.env.NODE_ENV === "production"

module.exports = {
  configureWebpack: {
    plugins: isProd ? [
      new UglifyJsWebpackPlugin({
        uglifyOptions: {
          // compress: {
          //   drop_console: true,
          //   drop_debugger: true
          // },
          wanrings: false,
          mangle: true,
          parallel: true,
        }
      }),
      new CssMinimizerPlugin()
    ] : []
  }
}
