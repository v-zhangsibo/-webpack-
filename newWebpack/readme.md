## gulp grunt webpack

## webpack 基础篇

## npm 卸载包

npm uninstall 包名 npm unistall webpack -g -global 全局表示哪都能用

## 初始化项目 npm init

```
  npm init -y   一键初始化
  生成package.json文件
```

## webpack 安装

- webpack4.0
- 安装本地的 webpack
- npm install webpack webpack-cli -D
- -D 表示 development 开发环境
- 开发环境->写代码 生产环境 ->上线

## webpack 可以进行 0 配置

- 目录结构
  - src
    - index.js
- 直接运行 npx webpack 等价于 npm run build
- 打包工具 -> 输出后的结果(js 模块)

## 手动配置 webpack(0 配置很弱)

- [x] 默认配置文件的名字(背)(webpack.config.js) webpack.config.js/webpackfile.js 通常使用 webpack.config.js
- 在根目录创建
- webpack 是基于 node 编写的
- 有 webpack.config.js 运行命令就会走我们自己写的配置
- --config 来指定 webpack 运行那个文件

```js
 "build": "webpack --config w.js",
```

##  配置打包环境（记住）

- mode  的值 2 个值 development 和
  production

1. [x] development 开发环境 代码没压缩 有注释
2. [x] production 生产环境 代码压缩 没有注释了

```
module.exports={
  mode:'development',
  ...
}
```

## \* 开发服务器配置

- npm install webpack-dev-server -D
- npm run dev 默认会打开 localhost:8080

```
devServer:{
  port:3000, #端口号
  contentBase:'./dist', #目录 如果没有dist文件夹 会在内存里面自动创建
  open:true, #是否自动打开浏览器
  progress:true, #显示进度条
  compress:true  #是否开启gzip压缩
  proxy:{
    //可以配置跨域
  }
 }
```

## \* 配置脚本命令 package.json

- "scripts": { } 这里面配置的命令叫做脚本
- "build":"webpack" | npm run build = npx webpack 会打包
- "dev": "webpack-dev-server" | npm run dev 会启动一个服务器

## \* 配置出口入口

- [x]entry 入口 可以是相对路径
- [x]output 出口 输出
- path 输出路径 必须是绝对路径 打包过后的文件夹名称
- filename:打包以后的文件名称

```
module.exports={
  entry:'./src/index.js',
	output:{
	  path:path.resolve(__dirname,'dist'),
	  filename:'bundle[hash:6].js',
	  publicPath:'http://www.baidu.com'
	 }
}
```

## 直接给文件加 hash 值(防止浏览器缓存)

```
filename:'bundle[hash].js'
可以用:后面跟数字设置hash值的长度
filename:'bundle[hash:8].js'
```

## 处理 html 自动引入 js

- plugin 插件 plugins 插件们 数组[插件 1,插件 2,插件 3]
- src
  - index.js
- public

  - index.html

- npm install html-webpack-plugin -D (记住)
- 当有插件的时候需要配置 plugins 插件集合类型是数组
- 每一个插件都是通过 new 来调用，例：new HtmlWebpackPlugin()
- 可以运行 npm run dev/npm run build 查看结果
- 装完插件后运行 webpack 会自动引入我们作为入口的 index.js

```
{
  * template:'./src/index.html',//使用哪里的html做模板
  * filename:'index.html', //编译后的文件名
  hash:true,//加hash值
  minify:{ //压缩配置
    removeAttributeQuotes:true, //去除双引号
    collapseWhitespace: true,  //折叠去除空格
  }
}
```

## 处理样式

> 目录结构

- src
- index.js
- a.css
- public
- index.html

- index.html 是模块 不建议在里面引入东西
- . index.js 通过 报错如下

```
You may need an appropriate loader to handle this file type
appropriate  合适的
你可能需要一个合适的loader
在 webpack 会把js,css,图片都看成模块，每一个模块都需要对应的模块解析器（loader）来解析
```

- . 配置 module,配置 rules 数组，表示很多规则，用正在匹配 js、css 等,rules 里面配置不容的 loader,每个 loader 的配置都是一个对象

- 下载 npm install css-loader style-loader -D
- css-loader 作用 解析 require 和 import 语法
- style-loader 把 css 插入到 style 标签中

- use 的用法

1. 字符串 只能写一个 loader
   use:'css-loader'
2. use 可以直接写 loader，也可以写成对象，写对象的时候可以进行配置
   options 可以做一些自定义的配置

```
 {
   loader:'style-loader',
    options:{
     insertAt:'top'  //css 放置位置可以决定css的优先级
  }
```

3. 数组 可以写多个 loader 数组里面可以放字符串和对象
   css-loader 解析 require/import 语法
   style-loader 把 css 插入到 header 标签中
   use:[{loader:'style-loader'},'css-loader']

> 目录结构

- src
- index.js
- a.css
- b.less
- public
- index.html

- 配置 less 编译(less->css)
  npm install less less-loader -D
- 编译 sass 编译(scss->css)
  npm install node-sass sass-loader -D
- 编译 stylus 编译(stylus->css)
  npm install stylus stylus-loader -D

```
  {
    test:/\.less$/,
    use:[
       'style-loader',
       'css-loader',
       'less-loader'
    ]
 }
```

## loader 的执行顺序
- 从下到上 从右到左

## 抽离 css
- [x] npm install mini-css-extract-plugin -D
- MiniCssExtractPlugin 插件自带一个 loader
- MiniCssExtractPlugin.loader 会自动把 css 抽离出来 作为引用的方式引入页面 

```
  new MiniCssExtractPlugin({
      filename: 'main.css' ##抽离出来的css的文件名
    })

```
- [x] 在 loader 里面的写法

```
  use: [MiniCssExtractPlugin.loader, "css-loader"]
```

## 使用 postcss-loader,autoprefixer 添加浏览器样式前缀

- [x] npm install postcss-loader autoprefixer -D
- autoprefixer 自动添加浏览器前缀的插件
- 安装 postcss 插件
  npm install postcss-preset-env -D 允许使用 css 未来特性的插件
- [x] 需要配置 postcss 默认文件 名字
      在根目录下创建 postcss.config.js/.postcssrc.js

```js
//postcss.config.js 的配置
//允许你使用未来的 CSS 特性。
const postcssPresetEnv = require("postcss-preset-env");
// 自动添加浏览器前缀
- 在根目录下面建立一个 .browserslistrc 文件
  配置需要兼容什么浏览器版本 也可以在 package.json 的 browerlist 字段配置

```js

const autoprefixer = require("autoprefixer");
module.exports = {
  plugins: [postcssPresetEnv, autoprefixer({})]
};
```


{
test:/\.less\$/,
use:[
MiniCssExtractPlugin.loader,
'css.loader',
'less-loader',
'postcss-loader'
]
}

```

## 处理 js es6 转化成 es5 (babel)

- npm install babel-loader @babel/core @babel/preset-env

@babel/core babel 核心模块
@babel-preset-env 标准语法转化成低级语法

- presets 预设插件 比如定案的 promise 是不会被转化的
- npm install @babel/polyfill 已经废弃
- 独立进行配置，文件名字 .babelrc
- 配置 loader
- 配置.babelrc 文件

```js
{
  presets: ["@babel/preset-env"];
}
```

- [x] npm install @babel/plugin-transform-runtime @babel/runtime
- @babel/plugin-transform-runtime 是依赖于 @babel/runtime 的
- @babel/runtime 是生产环境也需要的下载的时候不要加-D
- 作用 @babel/plugin-transform-runtime 去除重复代码
  @babel/plugin-transform-runtime 去注入 core-js
  需要下载 npm install @babel/runtime-corejs2(必须下)
  ```js
  {
  "presets": ["@babel/preset-env"],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2
      }
    ],
    "@babel/plugin-syntax-dynamic-import"
  ]
  }
  ```

## 配置需要解析和不需要解析 loader 的文件路径

- [x] include 包含 include:path.resolve(\_\_dirname,'src'),
- [x] exclude 不包含 exclude:/node_modules/ 不去匹配 node_moudle 下面的文件

```js
{
test:/\.js\$/,
use:'babel-loader',
include:path.resolve(\_\_dirname,'src'),
exclude:/node_modules/
}
```

## js 语法校验

- npm install eslint eslint-loader -D
- 初始化 eslint 配置文件
```
 npx eslint --init
```

- [x] 添加 enforce pre 强制先执行 previous 前置 loader

```js
{
 enforce:'pre',
 test:'/\.js\$/',
 loader:'eslint-loader',
}

```

desServer 下配置项 有报错的时候出现透明的遮罩层,一般不配置

```js
desServer{
 overlay: true,
}
```

## \* 配置优化项

- npm install optimize-css-assets-webpack-plugin
  terser-webpack-plugin -D
  optimize: 优化 assets:资源
  optimize-css-assets-webpack-plugin 压缩 css 的
  terser-webpack-plugin 压缩 js 的 uglify 不支持 esx6

```

optimization: { 优化
minimizer: [
  new OptimizeCssAssetsWebpackPlugin({}),
  new TerserWebpackPlugin({})
]
}

```

- mode 改成 production
- npm run build 打包之后 csss 是压缩过的



## 第三方模块的使用 
- loadash、jquery 等等 叫做第三方模块
- npm install jquery 
- npm install expose-loader -D
- expose-loader 负责把变量暴露给全局 loader

 写法1. 内联 loader 的方式配置 基本不使用 
```JS中
import $ from "expose-loader?$!jquery"
```
loader的分类：内联，普通(正常)、前置
 写法2. 正常 loader 配置

```
{
test:require.resolve('jquery'),
loader:"expose-loader?\$"
}
```

  写法3. 通过 webpack 提供的内置插件

- 在 plugins 配置,ProvidePlugin webpack 自带插件
- 自带插件都需要引入 webpcak 模块
- 在每个模块中注入$对象 不需要引入可以直接使用$这里 window.\$是 undefined;

```

let webpack = require('webpack')
...
new webpack.ProvidePlugin({
$:"jquery"
})

```

   ## 配置忽略打包项(主要是引入 cdn 资源的时候)

105 KiB 18.2 KiB
```
externals:{
jquery:"jQuery"
}

```
   ## 通过插件引入 cdn 资源(web 前端优化的一种手段)

yarn add add-asset-html-cdn-webpack-plugin

```

new AddAssetHtmlCdnWebpackPlugin(true, {
jquery: 'https://cdn.bootcss.com/jquery/3.4.1/jquery.js',
vue: '//cdn.bootcss.com/vue/2.5.16/vue.min.js',
vueRouter: '//cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
}),

```

## webpcak 常用插件

1. npm install clean-webpack-plugin -D
   清除缓存插件,可以写字符串 也可以写成数组
   new CleanWebpackPlugin();
   - 每次自动删除 dist 目录下的所有文件
2. npm install copy-webpack-plugin -D
   拷贝插件
   new CopyWebpackPlugin([ //
   {from:'img',to:'./'}  ./表示的是运行目录 也就是打包出来的dist
   ]),
3. 版权插件 webpack 自带插件
   let webpack = require('webpack')
   new webpack.BannerPlugin('make 2019 by ry')

## 在 webpack 中引入图片的几种方式

- src
  - index.js
  - style.css
  - b.less
  - index.html
  - logo.png

1. 在 js 中创建图片来引入
   import logo from './logo.png';
   let img = new Image() ;
   img.src = logo
   document.body.appengChild(img)
   会在内存里面创建一个新的图片

```

You may need an appropriate loader to handle this file type
你需要一个合适的 loader 去处理这个文件类型

```

2. 在 css 引入 background(url)

3. <img src=''/> 需要把图片放到 dist 文件夹

## 图片处理

npm install file-loader html-withimg-loader url-loader -D
file-loader

```

{
test:/\.(png|jpg|gif)\$/,
user:'file-loader'
}

```
- [x] 在 html 引入图片打包会找不到文件 需要使用 html-withimg-loader 解决打包之后路径不对的问题
```
{
test:/\.html\$/,
user:'html-withimg-loader'
}
```

- 小图片转化成 base64 =>前端优化
- [x] 在图片非常小的情况下不希望走 http 请求，一般情况下不会直接使用 file-loader 通常我们使用 url-loader
- 在图片小于多少 k 的时候可以做一个限制，用 base64 来转化这些符合条件的图片,base64 大小会比原来文件大 3 分之 1 
- 1024b = 1kb 1024kb = 1m 1g = 1024m
- 用limit 限制图片大小多大以内  转成 base64

  {
        test: /\.(jpg|png|gif|jpeg)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:8*1024 //意思是小于8kb的都会转成base64
          }
        }
      }


- url-loader 可以处理 mp4|webm|ogg|mp3|wav|flac|aac
- url-loder 可以处理各种字体格式 woff2?|eot|ttf|otf
- file-loader 字体话一般建议用 file-loader，字体转 64 可能存在无法识别 file-loader 就是简单的复制粘贴

```

{
test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?._)?\$/,
loader: 'url-loader',
options: {
limit: 0,
}
},
{
test: /\.(woff2?|eot|ttf|otf)(\?._)?\$/,
loader: 'url-loader',
options: {
limit: 0

        }
      }

```

## \* 打包文件分类

1. 图片 loader 的 options 里面添加
   options:{
   limit:1000
   outputPath:'/img/',
   }
2. css 添加在 css 插件里面
   new MiniCssExtractPlugin({
   filename:'css/main.css'
   })
3. js 添加到 filename 前面
   filename:'js/main[hash].js',
4. 添加域名 publicPath 的用法
   output: {
   filename: 'bundle.js',
   path: path.resolve(\_\_dirname, 'build'),
   publicPath:'http://www.baidu.cn'
   }

- 如果只需要图片添加域名
  options:{
  limit:1,
  outputPath:'/img/',
  publicPath:'http://www.baidu.cn'
  }

## webpack 配置篇
  ## 题外话：一个网页的访问过程：域名->dns服务器进行dns解析ip地址 ->tcp三次握手、四次挥手建立连接，->通过你的请求返回数据进行渲染

  ## webpack 处理 跨域问题   推荐的跨域方式  nginx  cors  webpack代理
    - webpack 自带 express

    1. \*代理的方式 重写的方式 把请求代理到 express 服务器上  (我们访问一个网站，默认是80端口号)
      

    - target 访问http://localhost:3000 等于访问 当前服务器下面 '/api'
    - pathRewrite 重写路径 /api/user 等于访问 localhost:3000/user

    ```

    devServer:{
    ...
    proxy:{ //
    '/api':{
    target:'http://localhost:3000',
    pathRewrite:{'/api':''}
    }// 配置了一个代理
    }
    }

    ```

    2.  直接使用 webpack 提供 mock 数据 webpack 自带 express

    - webpack 提供一个方法 before
    - 参数是 app app 就是 let app= express()

    ```

    before(app){
    app.get('/user',(req,res)=>{
    res.json({name:'leilei'})
    })
    }

    ```

    3. 可以直接在 node 的服务端启动(本项目是app.js) webpack 端口是服务端端口 不在需要 npm run dev 来启动 webpack

    - npm install webpack-dev-middleware -D
      server.js 修改如下
    ```
    let webpack = require('webpack');
    let middle = require('webpack-dev-middleware');
    let config = require('./webpack.config.js');
    let compiler = webpack(config)
    app.use(middle(compiler));
```

## resolve 用法

extensions 拓展名
alias:别名 bootstrap:'bootstrap/dist/css/bootstrap.css'
mainFields 可以配置先找哪个入口
mainFiles：入口文件的名字

```

resolve:{
modules:[path.resolve('node_modules')],
extensions:['.js','.css','.json','.vue'],
mainFields:['style','main']
mainFiles:[], // 入口文件的名字 index.js
alias:{//别名  在这里bootstrap就代表了后面的
bootstrap:'bootstrap/dist/css/bootstrap.css'
}
}

```

## 配置 soure-map 源码映射

文档地址 :https://webpack.docschina.org/configuration/devtool/

```

devtool:'source-map'
- mode改为开发环境 development

```

- source-map 会单独生成一个 sourcemap 文件 可以帮我们调试源代码 会显示当前报错的列和行

- eval-source-map 不会产生单独的文件 但是会显示报错的行和列

- cheap-module-source-map 不会产生列 但是是一个单独的文件
- cheap-module-eval-source-map 不会产生文件也不会产生列 会直接集成在文件里



##配置环境变量
node 提供的环境变量:process.env.NODE_ENV
根据 wepack 配置的 mode 值

```

new webpack.DefinePlugin({
// 字符串必须要包两层
'production':JSON.stringify('production'),
}),

```

## webpack 优化

1. 自带优化 tree-shaking（树的摇晃)，自动去除没有使用的代码,支持生产模式生效

package.json 配置副作用(只对 es6 语法有效果)

- sideEffects:false 副作用的文件不打包
- 要使用哪些副作用
  "sideEffects": [
  "*.css"
  ]
- 可以用 require ('./style.css')来解决副作用不生效的问题

optimization:{
usedExports:true // 在开发中可以看到哪个包/方法被使用了，其余的没用的会标示
},

2. 自带优化 scope-hosting 作用域提升

```

let a = 1;
let b= 2;
let c = a+b;
console.log(c);

```

> 把变量进行压缩，去提取模块中的导出的变量

3. noparse
   module: {
   noParse: /jquery/, // 不去解析 jquery 中的依赖库
   ...
   }
   ************************************************************
4. 懒加载 import() es6 草案中的语法
   npm install @babel/plugin-syntax-dynamic-import -D
   - src
     - index.js
     - a.js

- a.js 内容

```

export default 1234;
export const b = 3;

```

- index.js 内容

```

let btn = document.createElement('button');
btn.innerHTML = '点击实现异步加载';
btn.addEventListener('click', async function() {
//返回的是一个 promise jsonp 原理实现的
let res = await import('./a');
console.log(res);
});
document.body.appendChild(btn);

```

6. 热更新(浏览器强制刷新叫做硬更新),热更新就是代码修改之后浏览器不需要刷新 css-loader 本身支持热更新

- devServer 配置

```

devServer:{
hot:true
}

```

- plugins 里面配置热更新插件

```

new webpack.HotModuleReplacementPlugin()

```

- 代码里面的写法

```

 热更新文件夹里面

```

7. IgnorePlugin 忽略 webpack 内置插件 以 mement 库为例 直接使用会引入所有的语言包 配置忽略项之后我们只需要手动引入我们需要的语言包 打包的时候只打包需要的

- 配置忽略项之前打包大小 287kb 配置忽略项之后打包的大小 - 67.8k
- index.js 内容

```

import moment from 'moment';
设置语言

手动引入所需要的语言
import 'moment/locale/zh-cn'

moment.locale('zh-cn');
let r = moment().endOf('day').fromNow();
console.log(r);

```

- 插件写法

```

new webpack.IgnorePlugin(/\.\/locale/, /moment/)

```


## 打包多页应用

- 入口需要配置成对象

```

entry:{
home:'./src/index.js',
home1:'./src/index1.js'
}

- 出口需要多个出口，改变 filename 的写法
  filename:'[name.js]'
output:{
        filename:'[name].js'这个name相当于形参，上面写的名是啥打包出来就是啥
    }
```


- 保证 html 页面引入自己对应的 js
  使用 chunks 代码块 来完成
  chunks:['home']
  如果 home 也许使用 other
  chunks:['home','other']

```

let pages = [{
filename:'index.html',
chunk:'index'
},{
filename:'login.html',
chunk:'login'
}].map((item)=>{ // webpack splitChunks 可以配置公共文件的
return new HtmlWebpackPlugin({ // 配置输出的 html 格式
filename:item.filename,
title:'hello',
minify:{
removeAttributeQuotesd:true,
collapseWhitespace:true,
},
chunks:[item.chunk], // 设置引用的代码块
hash:true, // ? 后面的名字
template:'./public/index.html'
})
})

```



## 实时编译

watch:true

- 监控的选项

```

watchOptions:{
poll:1000 //每秒问我多少次
aggreatmentTimeout:500 //防抖 一直输入代码
ignored:/node_modules/
}

```

wepack 框架配置 vue 的使用

- 使用 vue 模板需要写 template
  npm install vue vue-loader vue-template-compiler
- vue-loader 解析 vue 文件
- vue-template-compiler 解析 vue 中的 template

1. 配置扩展名和别名

- https://cn.vuejs.org/v2/guide/installation.html#%E5%AF%B9%E4%B8%8D%E5%90%8C%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC%E7%9A%84%E8%A7%A3%E9%87%8A

  resolve:{
  extensions: ['.js','.vue','.json'],
  alias: { //开发环境使用 vue.esm.js
  'vue$': 'vue/dist/vue.esm.js', // 加入这句话
  }
  },

2. vue-loader 需要使用 vueLoaderPlugin 插件

```
const VueLoaderPlugin = require('vue-loader/lib/plugin')
plugins: [
new VueLoaderPlugin()
]
}

```

3. 配置 loader 解析 vue 文件

```

module.exports = {
module: {
rules: [
...
{
test: /\.vue$/,
loader: 'vue-loader'
}
]
},

```

VueLoaderPlugin 这个插件的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js\$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。

现在我们就可以按照 vue 模板的形式来编写代码了。 4.解决 vue 里面样式的问题 npm install vue-style-loader（配置vue样式的这部分功能暂时不能用，所以暂时忽略这段代码，虽然我的样式不配置也能出来..）
module.exports = {
// other options...
module: {
rules: [
{
test: /\.vue$/,
loader: 'vue-loader',
options: {
loaders: {
css: ExtractTextPlugin.extract({   -->  npm install extract-text-webpack-plugin 上面配置一下这个loader
use: 'css-loader',
fallback: 'vue-style-loader' // 这是 vue-loader 的依赖
})
}
}
}
]

```

<template>
    <div class="divWrap"></div>
</template>
<script>
export default {
    data(){
        return {}
    },
    created(){},
    methods:{}
}
</script>
<style scoped>
.divWrap{}
</style>
```

wepack 框架配置 react 的使用
1.下载react react-dom    npm i -S react react-dom
// babel转换react所需presets
2.下载转化react语法的包   npm install --save-dev @babel/preset-react  

.babelrc文件中进行配置：
  "presets": ["@babel/preset-env","@babel/preset-react"], //@babel/preset-react




## 区分环境

webpack.config.js 改成 webpack.base.js
新建文件 webpack.prod.js 和 webpack.dev.js

- 配置开发环境的写法
```
webpack.dev.js
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
mode: 'development',
devServer:{

},
devtool:'source-map'
})

```
- 配置生产环境的写法
```
let {smart} = require('webpack-merge');
let base = require('./webpack.base.js');

module.exports = smart(base,{
mode: 'production',
optimization:{
minimizer:[
     ]
},
plugins:[]
})
```


最新配置方案

```

package.json 配置

```

scripts": {
 "build": "webpack --env.production --config ./build/webpack.base.js",
    "dev": "webpack-dev-server --env.development --config ./build/webpack.base.js"
}
现在//运行run build 就是打印development true，运行run dev 就是打印production  true
```

let merge = require('webpack-merge');
module.exports = (env) => {
console.log(process.env.xxx); // 可以通过 cross-env 来设置环境变量
if(env.production){
// 生产环境
return merge(base,prod);
}else{
return merge(base,dev);
}
}

```

5. happypack 可以使用多线程来打包
   yarn add happypack

- id 告诉 happy 打包的时候用哪个 id 对应哪个 loader 进行多线程打包
- js 多线程打包 改变 babel-loader 的写法

```

{
test: /\.js\$/,
...
use: {
loader: 'happypack/loader?id=js'
}
}
new Happypack({
id:js,
use:'babel-loader',
})

```

- css 也可以实现多线程打包

```

    {
      test: /\.css$/,
      use: 'Happypack/loader?id=css'
    }

new Happypack({
id: 'css',
use: ['style-loader', 'css-loader']
})

```


6. 抽离公共代码(多入口)

```

optimization:{ // commonChunkPlugins
splitChunks:{ // 分割代码块
cacheGroups:{ // 缓存组
common:{ // 公共的模块
chunks:'initial',
minSize:0,
minChunks:2,
},
vendor:{ //第三方模块
priority:1, //权重
test:/node_modules/, // 把你抽离出来
chunks: 'initial',
minSize: 0,
minChunks: 2
}
}
}
}

```

