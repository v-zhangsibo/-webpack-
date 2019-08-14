//只是用来测试webpack的跨域功能写的服务端，跟项目没有关联
//让webpack在服务端运行的代码：弊端 仅限于node  middle
const webpack = require('webpack')
const middle = require('webpack-dev-middleware')//服务端运行webpack的插件
let config = require('./webpack.config.js');
let compiler = webpack(config);
//现在启动你的app.js 会走你的9002端口  这样的话你就可以直接访问/list
const express = require('express')
const app = express()
app.use(middle(compiler));

app.get('/list',function(req,res){
    res.json("hello world" )
})
app.listen(9002)