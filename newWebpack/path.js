//path 路径模块介绍

//webpack 基于node的 自带了express
let path = require("path"); //node的路径模块
// __dirname 绝对路径
let r = path.join(__dirname, "readme.md"); //path.resolve
//r 就会reademe的绝对路径 ../ 相对路径
console.log(r);
//readme 对应的绝对路径  /Users/ruanye/Desktop/webpack-lesson/readme.md
