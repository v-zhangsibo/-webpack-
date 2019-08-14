//dev 配置开发环境
let path = require('path')
let resolve = pathname=> path.resolve(__dirname,pathname)
module.exports ={
    mode:'development',
    devServer: {
        port: '9000',
        contentBase:resolve('../dist'),
        open: true,
        progress: true,
        compress: true
      },
      module:{
          rules:[
            {
                test:'/\.css$/',
                use:'style-loader'
            },
            {
                test:'/\.css$/',
                use:'css-loader'
            }
          ]
      },
      devtool:'source-map'//源码映射
}