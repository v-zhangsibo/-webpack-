//prod 配置生产环境   //生产环境就是打包上线了
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports ={
    mode:'production',
    optimization:{
        minimizer:[
          new OptimizeCssAssetsWebpackPlugin(),
          new TerserWebpackPlugin()
        ]
      },
    module:{
        rules:[
          {
              test:'/\.css$/',
              use:{
                loader: MiniCssExtractPlugin.loader,
              }
          },
          {
              test:'/\.css$/',
              use:'css-loader'
          }
        ]
    }
}