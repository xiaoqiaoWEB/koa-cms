const express = require('express')

let app = new express();

app.get('/', (req, res) => {
  res.send('router error');
})

// 匹配所有路由
app.use((req, res) => {
  res.status(404).send('这是404 表示路由没有匹配到')
})

app.listen(8000)