## koa 框架
  > koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架，也是目前流行的基于Node.js的Web开发框架,号称下一代web框架。 更小、更快速、更灵活、极简、开放开源的 web 开发框架。
  > (http://koajs.com)
  > (http://www.itying.com/koa)

# async await
  - async 是让方法变成异步。
  - await 是等待异步方法执行完成。

## Koa 路由
  > 路由就是根据不同的 URL 地址，加载不同的页面实现不同的功能。
#koa-router 
  - install koa-router
  - get 传值
    > 在 koa2 中 GET 传值通过 request 接收，但是接收的方法有两种：query 和 querystring。
    - query：返回的是格式化好的参数对象。
    - querystring：返回的是请求字符串。
    - url: 获得地址

## 动态路由
  /newscontent/:aid
  ctx.params 获取动态路由的传值

##中间件
  > 中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件。
  - 应用级中间件
  - 路由级中间件
  - 错误处理中间件
  - 第三方中间件
  - 如果我的 get、post 回调函数中，没有 next 参数，那么就匹配上第一个路由，就不会往下匹配了。如果想往下匹配的话，那么需要写 next()

## ejs 模板
  - koa-views
  - ejs
    - Ejs 引入模板  <%- include header.ejs %>
    - Ejs 绑定数据 <%=h%>
    - Ejs 绑定 html 数据 <%-h%>
    - Ejs 模板判断语句 <% if(true){ <div><%} else{ %<div><%} %>
    - Ejs 模板中循环数据 <%for(var i=0;i<list.length;i++) { %><li><%=list[i] %></li><%}%>

## koa-bodyparser
  > ctx.request.body 获取 post 提交的数据

## koa-static 静态资源中间件
  - npm install --save koa-static
  - app.use(static(path.join( __dirname, 'public')))

## art-template 模板引擎
  > http://aui.github.io/art-template/zh-cn/docs/
  - npm install --save art-template
  - npm install --save koa-art-template

## node.js 操作 mogondodb 


  






