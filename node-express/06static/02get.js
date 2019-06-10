let http = require('http')
let ejs = require('ejs')
let url = require('url')

http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"text/html;charset='utf-8'"})

  let pathName = url.parse(req.url, true).pathname;
  var method=req.method.toLowerCase();
  
  if(pathName == '/get') {

    console.log('A')
    ejs.renderFile('views/get.ejs',{
      msg: 'no'
    },(err, data) => {
      res.end(data)
    })

  }


  if(pathName == '/getLing' && method == 'get') {
    ejs.renderFile('views/get.ejs',{
      msg: '再次登录'
    },(err, data) => {
      let name = pathName
      console.log('得到get传值', url.parse(req.url, true).query)
      res.end(data)
    })
  }

 
}).listen(8001)