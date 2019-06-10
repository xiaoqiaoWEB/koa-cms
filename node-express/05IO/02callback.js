const fs = require('fs')

function getMime(callback) {
  fs.readFile('mime.json', (err, data) => {
    callback(data)
  })
}

getMime((data) => {
  console.log(data.toString())
}) 