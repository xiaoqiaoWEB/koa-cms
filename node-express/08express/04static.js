let express = require('express')

let app = new express();

app.set('view engine', 'ejs')

app.set("views", __dirname + '/template')

//express.static('public')给  public目录下面的文件提供静态web服务
//app.use(express.static('public'))
app.use('/static',express.static('public'));

app.get('/', (req, res) => {
  res.send('jjjjj')
})

app.get('/new', (req, res) => {
  res.render('news', {
    title: '123',
    list: [
      '!!!!!',
      '$$$$$$$$$$$$$$$'
    ]
  })
})

app.listen(8002)