//引入我们需要的插件 postcss.config.js 
const autoprefixer  = require('autoprefixer')
const  postcssPresetEnv =require('postcss-preset-env') 
//进行插件的使用配置
module.exports={
	plugins:[
		autoprefixer({}),
		postcssPresetEnv
	]
}
 