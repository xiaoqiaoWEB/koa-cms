var http = require('http');

// request,response
http.createServer((req, res) => {

  res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});

  res.write('你好 node.js')
  res.end('node.js end')

}).listen(3333);