
let fs = require('fs')

exports.getMime = function (extname) {
  var data = fs.readFileSync('./mime.json')
  var Mime = JSON.parse(data.toString());
  return Mime[extname] || 'text/html'
}
