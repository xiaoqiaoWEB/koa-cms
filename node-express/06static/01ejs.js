let http = require('http')
let url = require('url')
let ejs = require('ejs')


http.createServer((req, res) => {
  res.writeHead(200, {"Content-Type":"text/html;charset='utf-8'"})

  var pathname=url.parse(req.url).pathname;
  //console.log(pathname)

  if(pathname == '/ejs') {
    let list = [
      'A',
      'B'
    ]

    ejs.renderFile('views/ejs.ejs', {
      list: list,
      msg: '123'
    }, (err, data) => {
      res.end(data)
    })
    
  }

  // res.end('123');
}).listen(8000)