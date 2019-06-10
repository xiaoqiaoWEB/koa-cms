let express = require('express')
let ejs = require('ejs')

let app = new express();

// 注册 html 模板引擎代码如下
app.engine('html',ejs.__express);

/*配置ejs模板引擎*/
app.set('view engine', 'html');

//设置模板的位置
app.set("views", __dirname + '/template')

app.get('/index', (req, res) => {
  res.render('index')
})

app.listen(8001)
