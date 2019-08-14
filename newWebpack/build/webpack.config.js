//放开发环境和生产环境公用的webpack配置
let path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
let resolve = pathname=> path.resolve(__dirname,pathname)

module.exports ={
    entry:resolve('../src/index.js'),
    output:{
        path:resolve('../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: resolve('../public/index.html'),
          filename: 'index.html', 
        })
      ]
}