// webpack 基于node的 自带了express
const path = require('path'); // node的路径模块
const webpack = require('webpack')
// 引入html插件html的webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin') //配置vue
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// module.exports -> node的模块导出
module.exports = {
  mode: 'production', // 开发环境 development    生产环境 production
  devServer: {
    port: '9000', // port 服务的端口号 0 -65500
    contentBase: './dist',
    open: true, // 是否自动打开浏览器
    progress: true, // 显示进度条
    compress: true, // 是否开启gzip压缩
    // overlay: true, // 有eslint报错显示遮罩层
    // proxy:{//跨域  这种方法暂时跨域失败...
    //   '/':{
    //     target:'http://localhost:9002',//把9002(也就是你写的那个app.js测试)地址下面的'/' 代理到 我们自己的短裤 '/'
    //     pathRewrite:{//重写路径
    //       '^/':''
    //     }
    //   }
    // },
    before(app){//这个app就是express提供的
      app.get('/user',function(req,res){
        res.json('1234')
      })
    }
  },
  entry: './src/index.js', // 入口，可以是相对路径  vue 配置 src/main.js  入口不配置默认找src/index.js
  output: {
    // 出口 打包之后的文件放在哪
    path: path.join(__dirname, 'dist'), // 打包之后的路径，必须是绝对路径 默认打包dist
    filename:'js/main[hash:4].js', // 打包出来的js的文件名 默认叫做main.js
    // publicPath:'www.baidu.com',//打包出来的html引入文件时自动加上这个域名前缀
  },
  // 插件的集合
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 以谁为模板
      filename: 'index.html', // 打包后的文件名
    }),
    new MiniCssExtractPlugin({
      filename:'css/main.css', // 抽离出来的css的文件名称 默认是main.css
    }),
    // new webpack.ProvidePlugin({
    //   $:"jquery"
    //   }),
    // new CleanWebpackPlugin({}),//打包之前清除之前打包出来的dist
    new webpack.BannerPlugin('版权所有昂'),//打包出来的js文件最前面会有这段话
    // new CopyWebpackPlugin([
    //   {from:'images',to:'./images'}//从你本地的images拷贝到你打包出来的images下，打包出来的没有这个文件夹就会自己建
    // ])
    new webpack.DefinePlugin({//配置环境变量
      // 字符串必须要包两层
      'production':JSON.stringify('production'),
      }),
    new VueLoaderPlugin(),//配置vue
  ],
  module: {
    // noParse: /jquery/, // 不去解析 jquery 中的依赖库
    // 模块处理 loader 模块解析器
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   use: 'eslint-loader',//js语法校验
      // },
      // rule规则 一堆规则 每一条规则是一个对象
      {
        test: /\.(css|less)$/,
        use: {
          // 写成对对象的时候可以加一些自定义的配置
          loader: MiniCssExtractPlugin.loader, // 负责抽离css
          // loader: "style-loader" //插入到style
        },
      },
      {
        test: /\.(css|less)$/, // 正则匹配文件类型
        use: ['css-loader', 'postcss-loader'], // use 使用  使用什么样loadder
      },
      {
        test: /\.less$/,
        use: ['less-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src'), // 表示包含什么 src下面的文件需要使用babel-loader
        exclude: /node_modules/, // 不包含什么
      },
      // {
      //   test:require.resolve('jquery'),
      //   use:'expose-loader?$'
      // }
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use:{
          loader:'url-loader',
          options:{
             limit:1*1024, //意思是小于8kb的都会转成base64 
            outputPath:'/img/',//打包到img文件夹下  如果说图片转了base64 就打包不出来此张 打包别的
            // publicPath:'www.baidu.com'
          }
        }
      },
      {
        test: /\.html$/,
        use:'html-withimg-loader'
      },
      {//配置vue
        test: /\.vue$/,
        loader: 'vue-loader',
        options:{
            css:ExtractTextPlugin.extract({
                use: ['css-loader'],
                fallback:'vue-style-loader'
                
            })
        }
    },
    ]
  },
  optimization:{//配置优化项
    minimizer:[//
      new OptimizeCssAssetsWebpackPlugin(),//把css压缩为一行
      new TerserWebpackPlugin()
    ]
  },
  // externals:{//配置忽略打包项  
  //   jquery:"jQuery"  //不打包jq
  //   }
  resolve:{
    extensions:['.js','.vue','.json'],//配置省略的拓展名(以.js,.vue,.json结尾的都可以省略 a.js/a.json做例子) 
    //这个找后缀名的顺序是从左到右(同名不同后缀时有用)
    alias:{
      "@":path.resolve(__dirname,'src'),//现在就可以用@符表示src
      "_c":path.resolve(__dirname,'src/aliasCeshi'),//同理
      "vue$": 'vue/dist/vue.esm.js'
    }
  },
  // devtool:'source-map'//源码映射
};
