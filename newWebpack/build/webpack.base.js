let merge = require('webpack-merge')//merge是合并webpack配置用的
let config = require('./webpack.config')
let prod = require('./webpack.prod')
let dev = require('./webpack.dev')
module.exports =(env,url)=>{
  console.log(env,url)  //运行run build 就是打印development true，运行run dev 就是打印production  true
  if(env.production){
    return merge(config,prod) //如果是生产环境，就合并公用配置和生产环境配置
  }else{
    return merge(config,dev) //否则合并公共配置和开发环境配置
  }
}