let http = require('http')
let fs = require('fs')

http.createServer((req, res) => {

  var pathName = req.url
  if( pathName == '/favicon.ico') {
    pathName = 'index.html'
  }

  if(pathName != '/favicon.ico') {
    fs.readFile('static/' + pathName, (err, data) => {
      if(err) {
        console.log(err)
      } else {
        res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
        res.write(data)
        res.end(); 
      }
    })
  }
}).listen(8000, '127.0.0.1')