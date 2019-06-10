const express = require('express')
const bodyParser = require('body-parser')


const app = new express();

//配置 ejs
app.set('view engine', 'ejs')
app.set("views", __dirname + '/template')

// 配置 body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('body-parser');
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/doLogin', (req, res) => {
  console.log(req.body);   /*获取post提交的数据*/
  res.send('我已经拿到数据')
  next()
})


app.listen(8000)