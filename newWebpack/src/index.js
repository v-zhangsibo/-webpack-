// import './a.css'; // 语法是webpack提供的
// import './b.less';
// // require('./a.css') 等价于import './a.css'

// // import $ from 'jquery'
// // console.log($)

// import a from './a'//省略了.js后缀
// console.log(a)

// import b from '_c/b'
// console.log(b)
// const p = new Promise((resolve) => {
//   resolve(1);
// });
// p.then(data => data);

// let logo = require('./logo.png')
// let img = new Image()//生成一个图片对象 这是通过js引入图片
// img.src = logo;//到这一步，图片存放于内存中，不在dom里
// document.body.appendChild(img)

// //配置环境变量
// let Baseurl;
// if(production=='production'){//生产环境则为  /
//     Baseurl = '/'
// }else{
//   Baseurl = 'www.baidu.com'  //开发环境走你的测试接口
// }
// console.log(Baseurl)

// //打包会优化↓  打包出来的js只会打包出console.log(cc)
// let aa = 1;
// let bb= 2;
// let cc = aa+bb;
// console.log(cc);


//webpack懒加载
// let btn = document.createElement('button')
// btn.innerHTML = '这是一个按钮'
// btn.addEventListener('click',async()=>{
//   let res = await import('./a')
//   console.log(res)
//     // 和上面的写法效果一样 import('./a').then(data=>{//这里返回的是一个promise  如果报错为import只能在顶部引，请看.babelrc里的操作放 "@babel/plugin-syntax-dynamic-import"
//   //   console.log(data)
//   // })
// })
// document.body.appendChild(btn)

//测试vue配置
// import Vue from 'vue'
// import App from './App.vue'
// new Vue ({
//   render: h => h(App)
// }).$mount('#app')


//测试react配置
// import React from 'react'
// import {render} from 'react-dom'
// render('hello,react',document.getElementById('app'))



//下面测试一下  区分生产环境和开发环境的配置
console.log(1)