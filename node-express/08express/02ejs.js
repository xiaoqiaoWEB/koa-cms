let express = require('express')

let app = new express();

/*配置ejs模板引擎*/
app.set('view engine', 'ejs')

//设置模板的位置
app.set("views", __dirname + '/template')

app.get('/', (req, res) => {
  res.send('ejs')
})

app.get('/new', (req, res) => {
  res.render('news', {
    title: 'ejs 标题',
    list:[
      'A','B','C'
    ]
  })
})

app.listen(8000)