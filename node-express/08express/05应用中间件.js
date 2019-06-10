/**
    中间件：就是匹配路由之前和匹配路由之后做的一系列的操作


    //权限判断 ：没有登录 跳转到登录页面，登录以后就显示登录以后的页面


 */

 /*

中间件 表示匹配任何路由

应用级中间件

next()   路由继续向下匹配
* */


let express = require('express')

let app = new express();

app.use('/news', (req, res) => {
  console.log('news')
  next();
})

app.get('/', (req, res) => {
  res.send('123');
})

app.listen(3333)