export default 1234;
export const b = 3;
//export不能导出具体的值 可以导出的是对象或者函数  export导出的东西叫接口(定义的东西叫接口，但是不是那个后台接口)，可以导出多个
// export导出的值  引入时需要解构赋值{} import {xxx}  from './a.js' 下面是引入方式↓
// import * as obj from './a.js'  可以拿到a.js里面的obj里的所有的值
// import * as （一个原来没有的自定义的对象） from './a.js'  把导出的所有东西放到你定义的这个对象上 console.log(自定义对象.xx)



// export default（默认导出） 可以导出具体的值，不能导出多个
// 下面是引入方式 ↓
// import xxx from './a.js'