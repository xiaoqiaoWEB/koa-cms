// url.parse() 解析 URL
// url.format(urlObject) //是上面 url.parse() 操作的逆向操作
// url.resolve(from, to) 添加或者替换地址

const http = require('http');
const url = require('url');

http.createServer((req, res) => {

  console.log(req.url)
  
  // 拿到get 传值
  var result=url.parse(req.url,true);  //第一个参数是地址    第二个参数是true的话表示把get传值转换成对象
  console.log(result)
  console.log(result.query)

  res.writeHead(200,{"Content-Type":"text/html;charset='utf-8'"});
  res.write('node.js readey')
  res.end('end')

}).listen(3333)